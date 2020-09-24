import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import home from "./components/HomeComp/home";
import createBlog from "./components/CreateBlog/createBlog";
import mainBlog from "./components/MainBlog/mainBlog";
import updateBlog from "./components/UpdateBlog/updateBlog";
import register from "./components/Register/Register";
import login from './components/Login/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./Context/UserContext";

export default function App() {
  return (
    <Router>
      <div>
        <UserProvider>
          <Route exact path= "/"  component={home} />
          <Route exact path= "/create" component={createBlog} />
          <Route exact path= "/:id" component={mainBlog} />
          <Route exact path= "/:id/update" component={updateBlog} />
          <Route exact path= "/users/register" component={register} />
          <Route exact path= "/users/login" component={login} />
        </UserProvider>
      </div>
    </Router>
  );
}
