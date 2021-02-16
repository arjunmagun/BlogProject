import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {Container} from 'react-bootstrap';
import { Button, FormControl } from "@material-ui/core";
import "./updateBlog.css";

function UpdateBlog(props) {
    const [oneblog, setBlog] = useState([]);
    let id = props.match.params.id

    useEffect(()=>{
        async function fetchData(){
            await axios.get(`https://projectblogwebapp.herokuapp.com/${id}`)
                .then(res=>setBlog(res.data))
        }
        fetchData();
    }, []);
    
    async function handleChange(event){
        event.preventDefault();
        await axios({
            method: "POST",
            data: oneblog,
            url: `https://projectblogwebapp.herokuapp.com/${id}/update`
        }).then(res=>console.log(res.data));
        window.location = `/${id}`
    }
    
    return (
        <div className="update-main">
        <Navbar/>
        <Container>
            <h1>Update blogs here!</h1>
            <FormControl id='update-form' justify="center" alignItems="center">    
                <input
                    className="update-title"
                    placeholder="Title" 
                    value={oneblog.title} 
                    name="title" 
                    onChange={e=> setBlog({...oneblog, title: e.target.value})} 
                />

                <input 
                    className='imageUrl_update'
                    placeholder="Image URL" 
                    value={oneblog.imageUrl}
                    name="imageurl"
                    onChange={e=> setBlog({...oneblog, imageUrl: e.target.value})} 
                /> 
                
                <textarea 
                    className="description_update"
                    placeholder="Description" 
                    value={oneblog.description} 
                    rows="20"
                    name="description"
                    onChange={e=> setBlog({...oneblog, description: e.target.value})} 
                />
                <Button id="btn-update" color="primary" variant="contained" onClick={handleChange}>Edit Blog!</Button>
            </FormControl>
        </Container>
        </div>
    )
}


export default UpdateBlog;