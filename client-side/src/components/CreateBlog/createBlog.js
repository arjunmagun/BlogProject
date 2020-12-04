import React, { useState, useContext } from 'react';
import "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import swal from "sweetalert";
import { Button, FormControl } from "@material-ui/core";
import {Container} from "react-bootstrap";
import './createblog.css';
import { UserContext } from '../../Context/UserContext';

function CreateBlog(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [date, setDate] = useState(new Date());
    const [userData, setUserData] = useContext(UserContext)
        
    function handletitle(event){
        setTitle(event.target.value);
    }
    
    function handledescription(event){
        setDescription(event.target.value);
    }
    function handleimage(event){
        setImageUrl(event.target.value);
        console.log(imageUrl);
    }
    function handledate(date){
        setDate(date);
    }
    function handleChange(event){
        event.preventDefault();
        const newBlog = {
            title: title,
            description: description,
            imageUrl: imageUrl,
            date: date,
            createdBy: userData
        }
        axios.post("http://localhost:5000/create", newBlog) 
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err.res));
        window.location = "/"
        swal({
            title: "SUCCESSFULLY CREATED A BLOG",
            icon: "success"
        });
        console.log(newBlog);
    }
    
    return (
        <div className='main_create'>
        <Navbar/>
        <Container>
        <h1 className='title_create'>Write your Stories or Thoughts</h1>
            <FormControl id='form'>
                <input
                    className='titleInput'
                    placeholder="Title" 
                    value={title} 
                    name="title" 
                    onChange={handletitle}
                    required='true' />
                <textarea
                    className='descInput'
                    placeholder="Description"
                    aria-label='minimum height'
                    rowsMin={5} 
                    value={description} 
                    name="description"
                    onChange={handledescription}
                    required />
                <input 
                    className='imageInput'
                    placeholder="Image URL" 
                    value={imageUrl}
                    name="imageurl"
                    onChange={handleimage}
                    required />
                <DatePicker 
                    id='dateSelector'
                    selected = {date}
                    onChange={handledate}
                    closeOnScroll={true}
                    dateFormat="dd/MM/yyyy"
                />
                <Button id='btn_create' type="submit" onClick={handleChange}>Publish</Button>
            </FormControl>
        </Container>
        
    </div>
    )
}


export default CreateBlog;