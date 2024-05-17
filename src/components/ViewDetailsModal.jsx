
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { closeDialog } from '../utils/modalUtils.js';

const ViewDetailsModal = ({ dialogRef, data }) => {
  const [first, setfirst] = useState(false)


  useEffect(()=>{

    console.log("khushiii",data)
    

  },[data._id])


   return (
    <div>
      <dialog ref={dialogRef}>
        <h1>Plot Details</h1>
       {/* {!data.hasOnProperty("plotid")?<p>loading</p>:( */}



                          <div
                    style={{
                      width: '100vw',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}
                  >
                    <p>
                      Plotnumber:<br /> {data?.plotid.plotnumber || "plotnumber"} 
                    </p>
                    <p>
                      StreetNumber:<br /> {data?.plotid.streetnumber || "streetnumber"}
                    </p>
                    <p>
                      Street:<br /> {data?.plotid.street || "street"}
                    </p>
                    <p>
                      City:<br /> {data?.plotid.city || "city"}
                    </p>
                    <p>
                      State:<br /> {data?.plotid.state || "state"}
                    </p>
                    <p>
                      Country:<br /> {data?.plotid.country||"country"}
                    </p>
                    <p>
                      PinCode:<br /> {data?.plotid.postalCode||"postalCode"}
                    </p>
                    <p>
                      Selling Status:<br /> {data?.plotid.sellingstatus || "sellingstatus"}
                    </p>
          <img src={`data:image/*;base64,${data.image[0]}`} />
                  </div>
                   {/* )} */}
    
        <button onClick={() => closeDialog(dialogRef)}>Close</button>
      </dialog>
    </div>
  );
};

export default ViewDetailsModal;

