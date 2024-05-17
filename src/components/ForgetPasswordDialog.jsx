import React, { useRef } from 'react';
import axios from "axios";
import {openDialog,closeDialog } from "../utils/modalUtils.js";
const ForgetPasswordDialog = ({dialogRef}) => {
  const [email,setEmail]=React.useState("")
  const [otp,setOtp]=React.useState("")
  const [newpassword,setNewpassword]=React.useState("")
  const [state,setState]=React.useState("email")


  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  }
  const handleOtpSubmission=(e)=>{
    setOtp(e.target.value)
  }
  const handleCreateNewPassword=(e)=>{

    setNewpassword(e.target.value)

  }
  const handleSubmitEmail=(e)=>{

    e.preventDefault();


    axios
      .post("http://localhost:4000/forget", {email},  { withCredentials: true })
      .then((res) => {
        if(!res.data.success ){
          closeDialog(dialogRef)
        }

        else if (res.data.success === true){
          // const id=res.data.userid;
          window.sessionStorage.setItem("forgetpassworduserid", res.data.userid);

          setState("otp");

        }

      })
      .catch((err) => console.log(err));

  }

  const handleSubmitOtp=(e)=>{

    e.preventDefault();

    const id =window.sessionStorage.getItem("forgetpassworduserid")
    axios
      .post('http://localhost:4000/verify-otp', {otp,id},  { withCredentials: true })
      .then((res) => {
        if(!res.data.success ){
          closeDialog(dialogRef)
        }

        else if (res.data.success === true){
          setState("");


        }

      })
      .catch((err) => console.log(err));

  }

  const handleSubmitNewpassword=(e)=>{

    e.preventDefault();
  const id =window.sessionStorage.getItem("forgetpassworduserid")
console.log("passwd",newpassword)

    axios
      .post('http://localhost:4000/newpassword', { newpassword,id},  { withCredentials: true })
      .then((res) => {
        if(!res.data.success ){
          closeDialog(dialogRef)
        }

        else if (res.data.success === true){

window.sessionStorage.setItem("token",res.data.token)
          closeDialog(dialogRef);
          navigate("/home")
        }

      })
      .catch((err) => console.log(err));

  }










  return (
    <div>
      <dialog ref={dialogRef}>
        {state==="email"?(
          <>
            <p>please enter your email</p>
            <input type="email" onChange={handleEmailChange} />
            <button onClick={handleSubmitEmail} > submit </button>
            <button onClick={()=>closeDialog(dialogRef)}>Close</button>
          </>
        ):state==="otp"?(
            <>
              <p>Please enter the otp sent to your number</p>
          <input type="otp" onChange={handleOtpSubmission} />

             
              <button onClick={handleSubmitOtp} > submit </button>
              <button onClick={()=>closeDialog(dialogRef)}>Close</button>
            </>
          )
            :(
              <>

                <p>please enter new password</p>
                <input type="newpassword" onChange={handleCreateNewPassword} />


                         <button onClick={handleSubmitNewpassword} > submit </button>
                <button onClick={()=>closeDialog(dialogRef)}>Close</button>

              </>
            )}
      </dialog>
    </div>
  );
};

export default ForgetPasswordDialog;





