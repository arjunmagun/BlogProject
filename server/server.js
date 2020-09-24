require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieParser = require('cookie-parser');
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const Blog = require("./models/blogs");
const User = require("./models/user");

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: "thisisthekeyofexresssession",
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser("thisisthekeyofexresssession"));

mongoose.connect(process.env.DATABASEURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("Database is connected"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

require('./Config/passportConfig')(passport);

app.use("/", indexRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT || 5000, ()=> {
    console.log("server has started on port 5000");
});