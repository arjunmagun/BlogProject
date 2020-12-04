import React, {useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Container } from "react-bootstrap";
import './mainblog.css';
import { UserContext } from "../../Context/UserContext";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


function MainBlog(props) {
    const [mainblog, setBlog] = useState([]);
    const [userData, setUserData] = useContext(UserContext);
    let id = props.match.params.id;

    useEffect(async ()=>{
        await axios.get(`http://localhost:5000/${id}`)
            .then(res=>setBlog([res.data]))
        }, []);

        function deleteBlog(id){
            axios.delete(`http://localhost:5000/${id}/update`)
            .then(res=>(console.log(res.data)))

            setBlog(
                mainblog.filter(el=>(el._id!== id))
            )
            window.location = '/'
        }
    const ownerId = mainblog.map(main=> main.createdBy.id);
    const stringId = JSON.stringify(ownerId);
    const blogOwnership =  stringId === '["' + userData.id + '"]';
        
    return(
        <div className='main_blog'>
        <Navbar />
        <Container>
        {mainblog.map((blog, index)=>
        <div key={index} className='mainblog_body'>
            <h1 className='title' >{blog.title}</h1>
            <p className='dateMain' >{blog.date}</p>
            <p className='dateMain' >Created By: {blog.createdBy.username}</p>
            <img className='image' alt='random' src={blog.imageUrl} />
            <p className='description' >{blog.description}</p>
            {blogOwnership ? 
            <>
            <div className='btns'>
                <Button id="btn1" variant="outlined" href={`/${id}/update`}>Edit blog</Button>
                <Button id="btn2" variant="outlined" onClick={deleteBlog}>Delete blog</Button>
            </div>
            <div className='icons'>
                <a href={`/${id}/update`}>
                    <EditOutlinedIcon id="icon1" />
                </a>
                <DeleteOutlineOutlinedIcon id='icon2' onClick={deleteBlog} />
            </div>
            </>:
                null
            }
        </div>
        )}
        </Container>
        </div>
    )
}

export default MainBlog;