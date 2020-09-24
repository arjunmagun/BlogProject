import React, {useState, useEffect} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Navbar from "../Navbar/Navbar";
import {Container} from 'react-bootstrap';
import { Button, FormControl, Input } from "@material-ui/core";

function UpdateBlog(props) {
    console.log(props);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [imageUrl, setImageUrl] = useState("");
    const [oneblog, setBlogs] = useState([]);
    let id = props.match.params.id

    useEffect(()=>{
    axios.get(`http://localhost:5000/${id}`)
        .then(res=>setBlogs([res.data]))
    }, []);
    console.log(oneblog);
    
    function handletitle(event){
        setTitle(event.target.value);
    };
    
    function handledescription(event){
        setDescription(event.target.value);
    };
    function handledate(date){
        setDate(date);
    };

    function handleimage(event){
        setImageUrl(event.target.value);
    };
    
    function handleChange(event, props){
        event.preventDefault();
        const editedBlog = {
            title: title,
            description: description,
            date: date,
            imageUrl: imageUrl
        };
        axios.post(`http://localhost:5000/${id}/update`, editedBlog) 
        .then(res=>console.log(res.data));
        window.location = `/${id}`
        // console.log(editedBlog);
    }
    
    return (
        <div>
        <Navbar/>
        <Container>
        {oneblog.map((blog)=>
        <div>
            <h1>{blog.title}</h1>
            <img alt='blogImage' src={blog.imageUrl} />
            <p>{blog.description}</p>
            <h3>{blog.date}</h3>
        </div>
        )}
        </Container>

        
        <Container>
        <h1>Update blogs here!</h1>
        <FormControl justify="center" alignItems="center">    
                <Input
                id="title"
                placeholder="Title" 
                value={title} 
                name="title" 
                onChange={handletitle} />
                
                <Input 
                id="description"
                placeholder="Description" 
                value={description} 
                name="description"
                onChange={handledescription} />

                <Input 
                    placeholder="Image URL" 
                    value={imageUrl}
                    name="imageurl"
                    onChange={handleimage} /> 
                <DatePicker 
                selected = {date} 
                onChange={handledate}
                />
                
                <Button color="primary" variant="contained" onClick={handleChange}>Edit Blog!</Button>
            </FormControl>
        </Container>
        </div>
    )
}


export default UpdateBlog;