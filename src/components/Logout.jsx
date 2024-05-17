import React from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
 window.sessionStorage.removeItem("clientdata");
   
  
        navigate("/login");
      }
    
    
  

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
