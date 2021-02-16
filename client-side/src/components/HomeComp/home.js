import React, { useContext } from "react";
import './home.css';
import Navbar from "../Navbar/Navbar";
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";
import { BlogContext } from "../../Context/blogContext";
import { UserContext } from "../../Context/UserContext";

function Home() {
    const [blogs, setBlogs] = useContext(BlogContext);
    const [userData, setUserData] = useContext(UserContext);
    // window.onload = function () {
    //     if (!window.location.hash) {
    //         window.location = window.location + '#';
    //         window.location.reload();
    //     }
    // }
    return (
        <div className='main_home'>
            <Navbar />
            <Container fixed>
                {blogs.map((blog, index) => {
                    return (
                        <div className='mycard' key={index}>
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
                                <Button
                                    id='mycard_btn'
                                    variant="outlined"
                                    href={userData ? `/${blog._id}` : '/users/login'}
                                >
                                    Read More...
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </Container>
        </div>
    )
}

export default Home;