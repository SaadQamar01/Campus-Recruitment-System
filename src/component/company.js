import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../App.css';
import jobs from './jobs.js'
import ViewStudents from './ViewStudents.js'
import ViewCv from './ViewCv.js'
import image from '../cover.jpg'
import imageDp from '../dp.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Company extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: null,
        email: null,
        type:null,
        uid: null
      }
    }
  }
  componentDidMount() {
            firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
    var Rootref=firebase.database().ref().child("user/"+firebase.auth().currentUser.uid);
     Rootref.on("value",snap=>{
       let currentUserObj=snap.val()
               this.setState({
                  user: currentUserObj
          });
      }) 
            }
          })
  }
  render() {
    return (
      <div>
        <div className="userName">Company</div>
        <div className="Links">
          <Router>
            <div>
              <Link to="/ViewStudents" className="link">View Students</Link>
              <Link to="/ViewCv" className="link">View CV</Link>
              <Link to="/jobs" className="link">Post Job</Link>

              <Route path="/ViewStudents" component={ViewStudents} />
              <Route path="/ViewCv" component={ViewCv} />
              <Route path="/jobs" component={jobs} />
            </div>
          </Router>
        </div>
        <img src={image} className="cover" title="Cover" height="400px" width="1440px" />
        <img src={imageDp} className="dp" title="Cover" height="200px" width="200px" />
      <div className="userInfo">
        <h1>User Information</h1>
        <h3>  Name : {this.state.user.name} </h3>
        <h3>  Email : {this.state.user.email} </h3>
        <h3>  Type : {this.state.user.type} </h3>
      </div>
      // </div>


    )
  }
}
export default Company;