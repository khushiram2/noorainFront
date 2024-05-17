
import React, { useRef,useEffect } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { openDialog,closeDialog } from "../utils/modalUtils.js";

const EditDetailsModal = ({dialogRef,data,setClientdata}) => {
  const navigate = useNavigate();
  const plots = JSON.parse(window.sessionStorage.getItem("clientdata")); // Parse sessionStorage string to array

  const [editedDetails, seteditedDetails] = React.useState({
    plotNumber: data.plotNumber || "",
    street: data.street || "",
    streetNumber: data.streetNumber || "",
    city: data.city || "",
    pincode: data.pincode || "",
    state: data.state || "",
    country: data.country || "",
    soldStatus: data.soldStatus || ""
  });

  const token = window.sessionStorage.getItem("token");

  const handlechange = (e) => {
    const {name, value} = e.target;
    seteditedDetails({
      ...editedDetails,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:4000/updateaddress/${data._id}`, editedDetails, { headers: { Authorization: token }})
      .then(result => {
        if (result.data.success === true) {
          console.log("plotttt", plots);
          const newPlots = plots.map((plot) => {
            if (plot.plotid._id === result.data.data._id) {
              plot.plotid= result.data.data;
            }
            return plot;
          });
          console.log(newPlots)
          setClientdata(newPlots); // Corrected setCliientdata to setClientdata
          window.sessionStorage.setItem("clientdata", JSON.stringify(newPlots));

    closeDialog(dialogRef)
        }
        console.log("clientdata", result.data.data);
        navigate("/plot-details");
      })
      .catch(err => console.log(err));

    console.log(editedDetails);
  }
useEffect(()=>{

 window.sessionStorage.setItem("location", location.pathname);

  },[])

  return (
    <div>
      <dialog ref={dialogRef}>
        <p>EDIT DETAILS</p>
        <div>
          <label>Plot No.</label>
          <input name="plotNumber" value={editedDetails.plotNumber} onChange={handlechange} />
        </div>
        <div>
          <label>street</label>
          <input name="street" value={editedDetails.street} onChange={handlechange} />
        </div>
        <div>
          <label>street No:</label>
          <input name="streetNumber" value={editedDetails.streetNumber} onChange={handlechange} />
        </div>
        <div>
          <label>city</label>
          <input name="city" value={editedDetails.city} onChange={handlechange} />
        </div>
        <div>
          <label>Postal code</label>
          <input name="pincode" value={editedDetails.pincode} onChange={handlechange} />
        </div>
        <div>
          <label>state</label>
          <input name="state" value={editedDetails.state} onChange={handlechange} />
        </div>
        <div>
          <label>country</label>
          <input name="country" value={editedDetails.country} onChange={handlechange}  />
        </div>
        <div>
          <label>Status</label> 
          <span>sold</span>
          <input type="radio" name="soldStatus" value="sold" checked={editedDetails.soldStatus === "sold"} onChange={handlechange} />
          <span>unsold</span>
          <input type="radio" name="soldStatus" value="unsold" checked={editedDetails.soldStatus === "unsold"} onChange={handlechange} />
        </div>
        <button onClick={handleSubmit}>submit</button>
        <button onClick={() => closeDialog(dialogRef)}>Close</button>
      </dialog>
    </div>
  );
};

export default EditDetailsModal;


















