import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import {openDialog} from "../utils/modalUtils.js"
import { useNavigate } from "react-router";
import useAppContext from "../contextApi/useAppConext.jsx";
import EditDetailsModal from "../components/EditDetailsModal.jsx"
import CopyDetailsModal from "../components/CopyDetailsModal.jsx"
import ViewDetailsModal from "../components/ViewDetailsModal.jsx"
function Plotdetails() {
  const [plotDetails, setplotDetails] = useState({
    _id:"",
    image:[],
    plotid:{

    }
  })
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();
  const copyDialogRef=React.useRef(null)
  const viewDialogRef=React.useRef(null)
  const editDetailsRef = useRef(null)
  const { clientdata, setClientdata } = useAppContext();

  const token = window.sessionStorage.getItem("token");
  const storage = window.sessionStorage.getItem("clientdata");
  console.log("donnn",token)
  const getDetailsByid=(ref,data)=>{
    openDialog(ref)
    setplotDetails(data)
  }


  useEffect(() => {
    const clientdata1 = window.sessionStorage.getItem("clientdata");

    console.log("bosss", clientdata1);
    console.log("bosss", token);

    // if (clientdata1) {
    //   const parseData = JSON.parse(clientdata1);
    //   setClientdata(parseData);
    // } else
    {
      axios
        .get("http://localhost:4000/plot-details", {
          withCredentials: true, // Corrected option name
          headers: { Authorization: token} }, // Authorization header
        )
        .then((res) => {
          setplotDetails(res.data.imagedata[1])

          console.log("jgghgf",res.data.imagedata[1])
          // console.log("mamuuuuu", res.data.data);
          // setClientdata(res.data.data);
          setClientdata(res.data.imagedata)// Assuming the data is inside a 'data' property
          const stringifyData = JSON.stringify(res.data.imagedata);
          console.log("kamil",stringifyData);
          window.sessionStorage.setItem("clientdata", stringifyData);
          window.sessionStorage.setItem("location", location.pathname);
        })
        .catch((error) => {
          console.error("Error fetching client details:", error);
        });
    }
  }, [token, location.pathname]); // Include token and location.pathname as dependencies

  // Your component JSX here




  const handleDelete = (id,l) => {
    if (token){
      console.log("li",token)
      axios
        .delete(`http://localhost:4000/plot-delete/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          // console.log("User deleted successfully:", res.data);
          // After successful deletion, update the state to remove the deleted user
          const updatedClientData = clientdata.filter((user) => user._id !== l);
          setClientdata(updatedClientData);
          // Update sessionStorage
          window.sessionStorage.setItem(
            "clientdata",
            JSON.stringify(updatedClientData)
          );
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });

    }


  };

const [first, setfirst] = React.useState("")


React.useEffect(() => {
    const urlHistory = window.location.pathname;
    setfirst(urlHistory)
console.log(urlHistory)
 const his = window.sessionStorage.getItem("history")
    const holdHistory = his ? JSON.parse(his) : []
 if(holdHistory){
 if(holdHistory[holdHistory.length-1]!==urlHistory){
      holdHistory.push(urlHistory)
 }

 }
    const noon=JSON.stringify(holdHistory)
    window.sessionStorage.setItem("history",noon)

  }, [first])

React.useEffect(() => {
  const handleBeforeUnload = () => {
 const his = window.sessionStorage.getItem("history")
    // const holdHistory = his? JSON.parse(his)

  };

  window.addEventListener("popstate", handleBeforeUnload);

  return () => {
    window.removeEventListener("popstate", handleBeforeUnload);
  };
}, []);


  return (


    <div>


      <div>

        <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <select
        value={categoryFilter}
        onChange={e => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Category A">Category A</option>
        <option value="Category B">Category B</option>
        {/* Add more options for categories */}
      </select>


      </div>
      <EditDetailsModal dialogRef={editDetailsRef} data={plotDetails} setClientdata={setClientdata} />
      <CopyDetailsModal dialogRef={copyDialogRef} data={plotDetails} setClientdata={setClientdata} />
      {/* {plotDetails.plotid?<ViewDetailsModal dialogRef={viewDialogRef} data={plotDetails} />:<p>loading</p>} */}

          <ViewDetailsModal dialogRef={viewDialogRef} data={plotDetails} />


      <h1>Plot Details</h1>
      <ul>
        {clientdata?.map(
          (user) =>
            user && (




              <li key={user._id}>
                  <div style={{width:"100vw",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
{/* <img src={user.image[0]} alt="" style={{width:"100px",height:"100px",border:"1px solid red"}}/>  */}
                <p>Plotnumber:<br/> {user.plotid?.plotnumber}</p>
                <p>StreetNumber:<br/> {user.plotid?.streetumber}</p>
                <p>Street:<br/> {user.plotid?.street}</p>
                <p>City:<br/> {user.plotid?.city}</p>
                <p>State:<br/> {user.plotid?.state}</p>
                <p>Country:<br/> {user.plotid?.country}</p>
                <p>PinCode:<br/> {user.plotid?.postalCode}</p>
                <p>Selling Status:<br/>{ user.plotid?.sellingstatus}</p>
                  <button onClick={() => handleDelete(user.plotid._id,user._id)}>Delete</button>

                  <button onClick={() => getDetailsByid(editDetailsRef,user)}>Update</button>
                  <button onClick={() =>getDetailsByid(copyDialogRef,user)}>Copy</button>
                    <button onClick={() =>getDetailsByid(viewDialogRef,user)}>view details</button>
</div>



                {/* Conditionally render subclient details */}
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default Plotdetails;
