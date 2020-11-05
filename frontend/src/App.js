import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Book from "./components/Book";
import UserList from "./components/UserList";
import Logout from "./components/Logout";
import Protected from "./components/Protected";
import Profile from "./components/Profile";
import Forget from "./components/Forget";
import AdminProtected from "./components/AdminProtected";
import Edit from "./components/Edit";
import Issue from "./components/Issue";
//import Activity from "../../../models/Activity";

import Activity from "./components/Activity";
import Reset from "./components/Reset.jsx";
import AddBook from "./components/AddBook";
import IssuedBook from "./components/IssuedBook";

import Mybook from "./components/Mybook";
import Dashboard from "./components/Dashboard";
import Message from "./components/Message";
import AllowedMessage from "./components/AllowedMessage";
import RejectedMessage from "./components/RejectedMessage";

//import { Toast } from "react-toastify/dist/components";

function App() {
  return (
    <Router>
      <Protected exact path="/" component={Home}></Protected>
      <Protected exact path="/books" component={Book}></Protected>
      <Protected exact path="/profile" component={Profile}></Protected>
      <Route exact path="/logout" component={Logout}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/forget-password" component={Forget}></Route>
      <AdminProtected exact path="/users" component={UserList}></AdminProtected>
      <AdminProtected exact path="/edit/:id" component={Edit}></AdminProtected>
      <Protected exact path="/issue/:id" component={Issue}></Protected>
      <AdminProtected
        exact
        path="/activitys"
        component={Activity}
      ></AdminProtected>
      <Route exact path="/reset-password/:slug" component={Reset}></Route>
      <AdminProtected
        exact
        path="/addbooks"
        component={AddBook}
      ></AdminProtected>
      <AdminProtected
        exact
        path="/issuedbooks"
        component={IssuedBook}
      ></AdminProtected>
      <Route exact path="/dashboard" component={Dashboard}></Route>
      <AdminProtected
        exact
        path="/messages"
        component={Message}
      ></AdminProtected>
      <AdminProtected
        exact
        path="/allowedmessages"
        component={AllowedMessage}
      ></AdminProtected>
      <AdminProtected
        exact
        path="/rejectedmessages"
        component={RejectedMessage}
      ></AdminProtected>
      <Route exact path="/mybooks" component={Mybook}></Route>
    </Router>
    /*<Route exact path="/users" component={UserList}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/logout" component={Logout}></Route>

      <Route exact path="/books" component={Book}></Route>
      */
  );
}

export default App;
