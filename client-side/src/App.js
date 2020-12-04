import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import home from "./components/HomeComp/home";
import createBlog from "./components/CreateBlog/createBlog";
import mainBlog from "./components/MainBlog/mainBlog";
import updateBlog from "./components/UpdateBlog/updateBlog";
import register from "./components/Register/Register";
import login from './components/Login/Login';
import UserBlogs from "./components/UserBlogs/UserBlogs";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./Context/UserContext";
import { BlogProvider } from "./Context/blogContext";

export default function App(props) {
  console.log(props);
  return (
    <Router>
    <Switch>
      <div>
        <BlogProvider>
        <UserProvider>
          <Route exact path= "/"  component={home} />
          <Route exact path= "/blog/create" component={createBlog} />
          <Route exact path= "/:id" component={mainBlog} />
          <Route exact path= "/:id/update" component={updateBlog} />
          <Route exact path= "/users/register" component={register} />
          <Route exact path= "/users/login" component={login} />
          <Route exact path= "/user/blogs" component={UserBlogs} />
        </UserProvider>
        </BlogProvider>
      </div>
      </Switch>
    </Router>
  );
}
