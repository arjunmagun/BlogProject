const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

const isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    } else{
        console.log("You must be logged in or registered");
    }
}

router.get("/", (req, res)=>{
    Blog.find({}, (err, results)=>{
        if(err){
            console.log(err);
        } else{
            res.json(results)
        }
    });
});

router.post("/create",isLoggedIn, (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const date = req.body.date;
    const newBlog = new Blog({
        title,
        description,
        date,
        imageUrl
    });
    newBlog.save()
        .then(()=> res.json("Added new blog to the database"))
        .catch((err)=> console.log("Found an error" + err));
});

router.get("/:id", (req, res)=>{
    Blog.findById(req.params.id, (err, result)=>{
        if(err){
            res.json(err)
        } else{
            res.json(result)
            console.log(result);
        }
    })
});

router.post("/:id/update", (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const date = Date.parse(req.body.date);
    const editDetails = {title, description, date, imageUrl};
    Blog.findOneAndUpdate(req.params.id, editDetails, (err, result)=>{
        if(err){
            res.json(err.message)
            console.log(err);
        }else{
            res.json(result)
        }
    });
});

router.delete("/:id/update", (req, res)=>{
    Blog.findOneAndDelete(req.params.id, (err, result)=>{
        if(err){
            res.json(err.message)
            console.log(err);
        }else{
            res.send("deleted one blog")
        }
    });
});

module.exports = router;