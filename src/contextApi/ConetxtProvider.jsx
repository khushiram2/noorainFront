import CreateAppContext from "./CreateAppContext.jsx";
import {useState,useEffect} from 'react'
import React from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
const ConetxtProvider= ({children}) => {
  const navigate = useNavigate();

 const token = window.sessionStorage.getItem("token");

  const [login, setLogin] = React.useState(null);
  const [clientdata, setClientdata] = React.useState(null)
  const [Privateroutetoken, setPrivateroutetoken] = useState(null)
  useEffect(()=>{
if(token){

      axios
        .post("http://localhost:4000/verify-token", {
          // Use params to send data in a GET request
          withCredentials: true,
          headers: { Authorization: token }
        })
        .then((res) => {
          console.log("race",res)
          if (!res.data.success) {
            console.log(" token not verified", res.data.data);
            navigate("/login");
          } else {

            setPrivateroutetoken(true);

          }
        }) 
        .catch((error) => {
          console.error("Error  hai:", error);
        });


}
    

  },[])

  const values={
    login,
    setLogin,
    clientdata,
    setClientdata,
    setPrivateroutetoken,
    Privateroutetoken
  }
  
  return (
    <CreateAppContext.Provider value={values}>
    {children}
    </CreateAppContext.Provider>
  )
}

export default ConetxtProvider



