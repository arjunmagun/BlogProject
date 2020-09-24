import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Button, FormControl } from "@material-ui/core";
import {Container} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import { UserContext } from '../../Context/UserContext';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userdata, setUserdata] = useContext(UserContext)

    function handleUsername(event){
        setUsername(event.target.value);
    }

    function handleEmail(event){
        setEmail(event.target.value)
    }

    function handlePassword(event){
        setPassword(event.target.value)
    }

    function handleChange(event){
        event.preventDefault();

        axios({
            method: "POST",
            data:{
                username,
                email,
                password
            },
            withCredentials: true,
            url: "http://localhost:5000/users/register"
        }).then((res)=> console.log(res))
    }
    

    return (
        <div>
            <Navbar />
           <Container>
           
           <h1>{userdata.username}</h1>
            <h1 className='title_create'>Register</h1>
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
                    placeholder="password"
                    type="password"
                    value={password}
                    name="password"
                    onChange={handlePassword}
                 />

                <Button type="submit" onClick={handleChange}>Register</Button>
            </FormControl>
        </Container>
        </div>
    )
}

export default Register;