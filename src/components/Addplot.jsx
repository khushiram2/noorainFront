import React, { useRef,useEffect,useState } from 'react';
import axios from "axios"
import { openDialog,closeDialog } from "../utils/modalUtils.js";
import { useNavigate,useLocation } from "react-router-dom";

const formData=new FormData();
const AddDetailsModal = ({dialogRef,data}) => {
  const navigate = useNavigate();
  const [selectedImages,setSelectedImages]=useState([]);

  const [addDetails, setAddDetails] = React.useState({

  })
  console.log(formData) // nothing in form data
  const token=window.sessionStorage.getItem("token")
  const onSelectFile=(event)=>{
    const selectedFiles=event.target.files;
    const selectedFilesArray=Array.from(selectedFiles);
    selectedFilesArray.forEach((element ,index)=> {
      formData.append('image_file'+index,element);
    });
    const imagesArray=selectedFilesArray.map(file=>{
      console.log(formData) //got value here
      return URL.createObjectURL(file);
    });
    setSelectedImages([...selectedImages,...imagesArray])


  };
  const handlechange=(e)=>{ 
    const {name,value}=e.target
    setAddDetails({
      ...addDetails,
      [name]:value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    formData.append("plotNumber",addDetails.plotNumber) 
    formData.append("street",addDetails.street) 

    formData.append("streetNumber",addDetails.streetNumber) 
    formData.append("city",addDetails.city)
    formData.append("pinCode",addDetails.pinCode)


    formData.append("state",addDetails.state) 
    formData.append("country",addDetails.country) 
    console.log(formData)
    axios.post('http://localhost:4000/registeraddress',formData , { headers: { Authorization: token ,'Content-Type':'multipart/form-data'}})

      .then(result => {

        if(result.data.success){





          closeDialog(dialogRef)
          navigate("/home");
        }
      })
      .catch(err => console.log(err));
    console.log(addDetails)
  }

  useEffect(()=>{

    window.sessionStorage.setItem("location", location.pathname);

  },[])







  return (
    <div>
      <dialog ref={dialogRef}>
        <p>ADD DETAILS</p> 
        <div>
          <label>Plot No.</label>
         <input name="plotNumber" value={addDetails.plotNumber} onChange={handlechange} />        </div>
        <div>
          <label>street</label>
          <input name="street" value={addDetails.street} onChange={handlechange} />
        </div>
        <div>
            <div>
          <label>street No:</label>
          <input name="streetNumber" value={addDetails.streetNumber} onChange={handlechange} />
        </div>
          <label>city</label>
          <input name="city" value={addDetails.city} onChange={handlechange} />
        </div>
        <div>
          <label>Postal code</label>
          <input name="pinCode" value={addDetails.pinCode} onChange={handlechange}/ >
        </div>
        <div>
          <label>state</label>
          <input name="state" value={addDetails.state} onChange={handlechange}/ >
        </div>
        <div>
          <label>country</label>
          <input name="country" value={addDetails.country} onChange={handlechange}  />
        </div>
          <div>
          <label>image</label>
          <input name="image" type="file" onChange={onSelectFile} multiple   />
        </div>

        <br/>
        {selectedImages.length>0 && (selectedImages.length>4 ?(

<p>

you can't upload more than 4 images! <br/>
<div>
please delete <b>{selectedImages.length -4}</b> of them {" "}


</div>

</p>
):(


<button onClick={()=>{

console.log("UPLOAD IMAGES");

}}

>
UPLOAD {selectedImages.length} IMAGE
{selectedImages.length ===1 ? "" :"S"}

</button>)


        )}
        <div>
        {
        selectedImages && selectedImages.map((image,index)=>{

return (





        <div key={image}>

          <img src={image} height="30" alt="upload"/>
          <button style={{color:"red"}} onClick={()=>setSelectedImages(selectedImages.filter((e)=>e !== image))

          }>

            Delete
          </button>
          <p>{index + 1}</p>

        </div>
        )

        })
        }
        </div>
             <div>

     <div>
      <label>Status</label> 
      <span>sold</span>
       <input type="radio" name="soldStatus" value="sold" checked={addDetails.soldStatus === "sold"} onChange={handlechange} />
      <span>unsold</span>
       <input type="radio" name="soldStatus" value="unsold" checked={addDetails.soldStatus === "unsold"} onChange={handlechange} />
         </div>

                 <button onClick={handleSubmit}>submit</button>
               <button onClick={()=>closeDialog(dialogRef)}>Close</button>

</div>
     </dialog>
    </div>
  );
};

export default AddDetailsModal;








