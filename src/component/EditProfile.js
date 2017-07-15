import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class EditProfile extends React.Component{
constructor(){
super();
}

render(){
    return(
        <div className="div1">
        <h1>Edit Profile</h1>
        <input type="text" placeholder="Enter Your name"/>
        <input type="text" placeholder="Enter Your Education" />
        <input type="number" placeholder="GPA" />
        <input type="text" placeholder="Enter Your College" /><br />
        <button>Edit Profile</button>
        </div>
    )
}
}
export default EditProfile;
