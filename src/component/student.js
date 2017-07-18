import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../App.css';
import EditProfile from './EditProfile.js'
import ViewCompanies from './ViewCompanies.js'
import ViewJobs from './ViewJobs.js'
import image from '../cover.jpg'
import imageDp from '../dp.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Student extends React.Component {
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
  // componentDidMount(){
  //             var rootRef=firebase.database().ref();
  //            const speedRef=rootRef.child("user"+"/"+firebase.auth().currentUser.uid).set({
  //               email: userEmail,
  //               password: userPass,
  //               name: this.refs.name.value,
  //               type:this.state.userType
  //            })
// }
render(){
  return (
    <div>
      <div className="userName">Student</div>
      <div className="Links">
        <Router>
          <div>
            <Link to="/EditProfile" className="link">Edit Profile</Link>
            <Link to="/ViewCompanies" className="link">View Companies</Link>
            <Link to="/ViewJobs" className="link">View Jobs</Link>

            <Route path="/EditProfile" component={EditProfile} />
            <Route path="/ViewCompanies" component={ViewCompanies} />
            <Route exact path="/ViewJobs" component={ViewJobs} />
          </div>
        </Router>
      </div>
      <img src={image} className="cover" title="Cover" height="400px" width="1440px" />
      <img src={imageDp} className="dp" title="Cover" height="200px" width="200px" />
  //  <div className="background"></div> 
      <div className="userInfo">
        <h1>User Information</h1>
        <h3> Name : {this.state.user.name} </h3>
        <h3>  Email : {this.state.user.email} </h3>
        <h3>  Type : {this.state.user.type} </h3>
      </div>
     </div>
    )
}}
export default Student;