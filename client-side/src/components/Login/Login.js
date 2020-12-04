import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Button, FormControl } from "@material-ui/core";
import {Container} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import { UserContext } from '../../Context/UserContext';
import { useHistory } from "react-router";

import './Login.css';


function Login() {
    const [logusername, setlogUsername] = useState("");
    const [logemail, setlogEmail] = useState("");
    const [logpassword, setlogPassword] = useState("");
    const [userData, setUserData] = useContext(UserContext);
    const history = useHistory();

    function handleUsername(event){
        setlogUsername(event.target.value);
    }

    function handleEmail(event){
        setlogEmail(event.target.value)
    }

    function handlePassword(event){
        setlogPassword(event.target.value)
    }

    async function handleChange(event){
        event.preventDefault();

        await axios({
            method: "POST",
            data:{
                username: logusername,
                email: logemail,
                password: logpassword
            },
            withCredentials: true,
            url: "http://localhost:5000/users/login"
        }).then(res=> setUserData(res.data));

        history.push("/")
    }

    return (
        <div className='main_login'>
            <Navbar />
            <Container>
            <h1 className='title_login'>Login</h1>
            <FormControl id='form'>
                <input
                    className='username'
                    placeholder="Username" 
                    value={logusername} 
                    name="username" 
                    onChange={handleUsername}
                    required='true'
                 />
                <input 
                    className='emailInput'
                    placeholder="Email Address" 
                    value={logemail}
                    name="email"
                    onChange={handleEmail}
                    required
                 />
                <input 
                    className="password"
                    placeholder="password"
                    type="password"
                    value={logpassword}
                    name="password"
                    onChange={handlePassword}
                 />
                <Button id='loginBtn' type="submit" onClick={handleChange}>Login</Button>
            </FormControl>
        </Container>
        </div>
    )
}

export default Login;