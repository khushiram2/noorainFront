import React, { useRef,useEffect } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { openDialog,closeDialog } from "../utils/modalUtils.js";
const CopyDetailsModal = ({dialogRef,data ,setClientdata}) => {
  const [copyDetails, setCopyDetails] = React.useState({})
  const token=window.sessionStorage.getItem("token")
  const navigate = useNavigate();
  const handlechange=(e)=>{
     const {name, value} = e.target;
    setCopyDetails({
      ...copyDetails,
      [name]: value
    });
  }
const handleSubmit=(e)=>{
    e.preventDefault()

 axios.post(`http://localhost:4000/copyaddress/${data._id}`, copyDetails, { headers: { Authorization: token }})
      .then(result => {
        if(result.data.success)
      {
          const copy=result.data.data;
          const data=copy.reduce((a,e)=>{
const newobj={

              _id:'',
              image:[],
              plotid:e,
            }
            a.push(newobj);

return a;
          },[])
          setClientdata(p=>[...p,...data])
   }

          closeDialog(dialogRef)
        
             })
      .catch(err => console.log(err));
    console.log(copyDetails)
  }
useEffect(()=>{

 window.sessionStorage.setItem("location", location.pathname);

  },[])
  return (
    <div>
      <dialog ref={dialogRef}>
        <p>Number of Copies</p>
        <div>
          <label>Plot No.</label>
          <input name="numberofcopy"  value={copyDetails.numberofcopy} onChange={handlechange}  />
        </div>
       
        <button onClick={handleSubmit}>submit</button>
               <button onClick={()=>closeDialog(dialogRef)}>Close</button>
      </dialog>
    </div>
  );
};

export default CopyDetailsModal;



