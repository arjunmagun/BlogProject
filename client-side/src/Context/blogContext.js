import React, { useState, createContext, useEffect, useCallback } from 'react'
import axios from "axios";

export const BlogContext = createContext();

export function BlogProvider({ children }) {
    const [blogs, setBlogs] = useState([]);

    const fetchData = useCallback(async () => {
        await axios.get("https://projectblogwebapp.herokuapp.com")
            .then(res => setBlogs(res.data));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <BlogContext.Provider value={[blogs, setBlogs]}>
            {children}
        </BlogContext.Provider>
    )
}
