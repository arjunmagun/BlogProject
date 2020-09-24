import React, { useContext, useEffect } from 'react';
import {Nav, Navbar, Container} from "react-bootstrap";
import { UserContext } from '../../Context/UserContext';
import './navbar.css';
import axios from "axios";


//-------------------------------------------------------
//Navbar function starts here
//-------------------------------------------------------
const NavBoot = () => {
  const [userData, setUserData] = useContext(UserContext);

  function getUser(e){
    e.preventDefault();
    axios.get("http://localhost:5000/users/logout")
        .then(res => (
          console.log(res)
    ));
  }    

  return (
    <Navbar id='navbar' bg="transparent" expand="lg">
    <Container>
      <Navbar.Brand id='brandName' href="/">STORY</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav id='navLinks' className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/create">Create Blog</Nav.Link>
          <Nav.Link href="/users/login">Login</Nav.Link>
          <Nav.Link href="/users/register">SignUp</Nav.Link>
          <Nav.Link onClick={getUser} href="/users/logout">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBoot;