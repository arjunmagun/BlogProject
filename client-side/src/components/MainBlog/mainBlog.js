import React, {useState, useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Container } from "react-bootstrap";
import './mainblog.css';


function MainBlog(props) {
    const [mainblog, setBlog] = useState([]);
    let id = props.match.params.id
    useEffect(()=>{
        axios.get(`http://localhost:5000/${id}`)
            .then(res=>setBlog([res.data]))
        }, []);

        console.log(mainblog);

        function deleteBlog(id){
            axios.delete(`http://localhost:5000/${id}/update`)
            .then(res=>(console.log(res.data)))

            setBlog(
                mainblog.filter(el=>(el._id!== id))
            )
            window.location = '/'
        }
    return(
        <div className='main_blog'>
        <Navbar />
        <Container>
        {mainblog.map((blog, index)=>
        <div className='mainblog_body'>
            <h1 className='title' key={index}>{blog.title}</h1>
            <p className='dateMain' key={index}>{blog.date}</p>
            <img className='image' alt='random' src={blog.imageUrl} />
            <p className='description' key={index}>{blog.description}</p>
            <Button id="btn1" variant="outlined" href={`/${id}/update`}>Edit blog</Button>
            <Button id="btn2" variant="outlined" onClick={deleteBlog}>Delete blog</Button>
            
        </div>
        )}
        </Container>
        </div>
    )
}

export default MainBlog;