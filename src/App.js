import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Signup from './component/signup.js'
import Signin from './component/signin.js'
import Admin from './component/admin.js'
import Company from './component/company.js'
import Student from './component/student.js'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
    user:{
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        uid: null
      }
    }
  }

componentWillMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    console.log(user);
    if (user) {
      this.setState({
        user:{
        name : user.displayName,
        email : user.email,
        photoUrl : user.photoURL,
        emailVerified : user.emailVerified,
        uid : user.uid
        }})
        // console.log(this.state.user);
    }
    else{
   this.setState({
  user:{
        name : null,
        email : null,
        photoUrl : null,
        emailVerified : null,
        uid : null 
             }})
    }
    
  })
}


render() {
  return (
    <div className="background">
    <div className="nav">
    <h1 className="heading1">Campus Recuirtment System</h1>
      <Router>
      <div className="container">
          {!this.state.user.email?
            <div className="container-fluid">
            <Link to="/" className="button btn btn-primary">Sign In</Link>
            <Link to="/signup" className="button btn btn-primary">Sign Up</Link>
          </div>
          :
          <div className="container-fluid">
            <Link to="/" onClick={
              ()=>{
                firebase.auth().signOut()
                }
              }
             className="button btn btn-primary">Sign Out</Link>
          </div>}

          <Route exact path="/" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin}/>
          <Route path="/student" component={Student}/>
          <Route path="/company" component={Company}/>
      </div>
      </Router>
      </div>
      </div>
  );
}
}
export default App;
