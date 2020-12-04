import React, { useContext } from 'react';
import Navbar from "../Navbar/Navbar";
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";
import { BlogContext } from "../../Context/blogContext";
import { UserContext } from '../../Context/UserContext';
import "./userblogs.css";

export default function UserBlogs() {
    const [blogs, setBlogs] = useContext(BlogContext);
    const [userData,serUserData] = useContext(UserContext);
    const UserBlogs = blogs.filter(blog=> blog.createdBy.id === userData.id) || null
    console.log(UserBlogs);
    return (
        <div className="userBlogs-main">
            <Navbar />
            <Container fixed>
            <h1>Your Blogs</h1>
                {UserBlogs.map((blog, index) => {
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
