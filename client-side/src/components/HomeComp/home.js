import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css';
import Navbar from "../Navbar/Navbar";
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";


function Home(props) {
    const [blogs, setBlogs] = useState([]);

    console.log(blogs)

    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then(res => (
                setBlogs(res.data)
            ));
    }, []);



    return (
        <div className='main_home'>
            <Navbar />
            <Container fixed>
                {blogs.map((blog, index) => {
                    return (
                        <div className='mycard'>
                        <img className='mycard_img' alt="random" src={blog.imageUrl} />
                            <div className='mycard_body'>
                                <h1 className='mycard_title'>{blog.title}</h1>
                                <p className='mycard_text'>
                                    {blog.description.substring(0, 100)} ...
                                </p>
                                <div className='dateHome'>
                                <p className='inner-date'>
                                    {blog.date.substring(0, 10)}
                                </p>
                                </div>
                                <Button id='mycard_btn' variant="outlined" href={`/${blog._id}`}>Read More...</Button>
                            </div>
                        </div>
                    )
                })}
            </Container>
        </div>
    )
}

export default Home;