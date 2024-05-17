import React from 'react'
// import  EditDetailsModal  from "../components/EditDetailsModal.jsx";
import AddDetailsModal from "../components/Addplot.jsx"
import {openDialog} from "../utils/modalUtils.js"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../components/Logout.jsx"
const Home = () => {
  const dialogRef=React.useRef(null)
  const dialogRef2=React.useRef(null)


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
<>
   


  <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#" className="header">
            Admin Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                
              <Link to="/plot-details" className="nav-link">
                Plot Details
              </Link> 


                <button onClick={()=>openDialog(dialogRef2)}>Add ONE</button>
      <AddDetailsModal dialogRef={dialogRef2} />
            
      {/*           <button onClick={()=>openDialog(dialogRef)}>edit Details</button> */}
      {/* <EditDetailsModal dialogRef={dialogRef} /> */}
             
            </Nav>
            <Nav>
              <Logout />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is the dashboard for managing clients and websites.</p>
      </Container>





    </>
  )
}

export default Home
