import React, { useState, createContext, useEffect } from 'react'
import axios from "axios";

export const BlogContext = createContext();

export function BlogProvider({children}) {
    const [blogs, setBlogs] = useState([]);

    useEffect(async () => {
        await axios.get("http://localhost:5000/")
            .then(res => (
                setBlogs(res.data)
            ));
    }, []);
    
    return (
        <BlogContext.Provider value={[blogs, setBlogs]}>
            {children}
        </BlogContext.Provider>    
        )
    }
