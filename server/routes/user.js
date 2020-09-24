const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require('bcryptjs');


router.get("/register", (req, res)=>{
    if(!req.user){
        console.log("no user logged in");
    } else{
        console.log("user logged in");
    }
})

router.post("/register", (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({username: username, email: email}, async (err, user)=>{
        if (err) throw err;
        if (user) res.send("User already Exist");
        else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newuser = new User({
                username: username,
                email: email,
                password: hashedPassword
            })
            newuser.save();
            res.send("User Registered")
        }
    })
});

router.post('/login', (req, res, next)=>{
    passport.authenticate("local", (err, user, result)=>{
        if(err) throw err;
        if(!user) res.send("No user exists!")
        else{
            req.logIn(user, (err)=>{
                if(err) throw err;
                res.send(req.user);
            })
        }
    })(req, res, next);
})


router.get('/logout', (req, res)=>{
    req.logout();
    res.send("user logged out "+ req.user)
})

module.exports = router;