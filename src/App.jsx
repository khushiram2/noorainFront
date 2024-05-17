import React from "react"
import './App.css'
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import Plotdetails from "../src/pages/Plotdetails.jsx"
import EditDetailsModal  from "../src/components/EditDetailsModal.jsx"
import { Routes,Route,Navigate } from "react-router-dom";
import CopyDetailsModal from "../src/components/CopyDetailsModal.jsx";
import PrivateRoutes from "../src/PrivateRoute/PrivateRoute.jsx" 


function App() {
  return (
    <>
<Routes>
<Route path="/" element={<Navigate replace to="/login"/>}/>
<Route path="/login" element={<LoginPage/>} />

<Route element={<PrivateRoutes/>}>

          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/plot-details" element={<Plotdetails/>} />
          <Route path="/update-details" element={<EditDetailsModal/>} />
          <Route path="/copy-details/:id" element={<CopyDetailsModal/>} />

</Route>





      </Routes>
    </>
  )
}

export default App
