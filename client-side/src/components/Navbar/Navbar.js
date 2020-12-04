import React, { useContext, useEffect } from 'react';
import {Nav, Navbar, Container, NavDropdown} from "react-bootstrap";
import { UserContext } from '../../Context/UserContext';
import './navbar.css';
import axios from "axios";
import { useHistory } from "react-router-dom";


//-------------------------------------------------------
//Navbar function starts here
//-------------------------------------------------------
const NavBoot = () => {
  const [userData, setUserData] = useContext(UserContext);
  const history = useHistory();
  function logOutUser(e){
    e.preventDefault();
    axios.get("http://localhost:5000/users/logout")
    localStorage.removeItem("userData");
    window.location = "/";
  }    

  return (
    <Navbar id='navbar' bg="transparent" expand="lg">
    <Container>
      <Navbar.Brand id='brandName' href="/">STORY</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav id='navLinks' className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {userData ? <>
            <Nav.Link href="/blog/create">Create Blog</Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item>{userData.username}</NavDropdown.Item>
              <NavDropdown.Item href="/user/blogs">Your Blogs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOutUser} href="/users/logout">Log Out</NavDropdown.Item>
            </NavDropdown>
          </>: 
          <>
            <Nav.Link href="/users/login">Login</Nav.Link>
            <Nav.Link href="/users/register">SignUp</Nav.Link>
          </>
          }
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBoot;