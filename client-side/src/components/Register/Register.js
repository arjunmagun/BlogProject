import React, { useState } from 'react'
import axios from 'axios';
import { Button, FormControl } from "@material-ui/core";
import {Container} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";

import './Register.css';


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function handleUsername(event){
        setUsername(event.target.value);
    }

    function handleEmail(event){
        setEmail(event.target.value)
    }

    function handlePassword(event){
        setPassword(event.target.value)
    }

    async function handleChange(event){
        event.preventDefault();

        await axios({
            method: "POST",
            data:{
                username,
                email,
                password
            },
            withCredentials: true,
            url: "https://projectblogwebapp.herokuapp.com/users/register"
        }).then((res)=> console.log(res));

        history.push("/users/login")
        // window.location = "/users/login"
    }
    

    return (
        <div className='main_register'>
            <Navbar />
           <Container>
            <h1 className='title_register'>Register</h1>
            <FormControl id='form'>
                <input
                    className='username'
                    placeholder="Username" 
                    value={username} 
                    name="username" 
                    onChange={handleUsername}
                    required='true'
                 />
                <input 
                    className='emailInput'
                    placeholder="Email Address" 
                    value={email}
                    name="email"
                    onChange={handleEmail}
                    required
                 />
                <input 
                    className="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={handlePassword}
                 />

                <Button id='registerBtn' type="submit" onClick={handleChange}>Register</Button>
            </FormControl>
        </Container>
        </div>
    )
}

export default Register;