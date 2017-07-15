import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../App.css';
import ViewStudents from './ViewStudents.js'
import ViewCompanies from './ViewCompanies.js'
import EditProfile from './EditProfile.js'
import ViewJobs from './ViewJobs.js'
import image from '../cover.jpg'
import imageDp from '../dp.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Admin extends React.Component{
constructor(){
super();
}

render(){
    return(
      // <h1>Admin Pannel</h1>
      <div>
      <div className="userName">Admin</div>
      <div className="Links">
      <Router>
      <div>
            <Link to="/ViewStudents" className="link">All Students</Link>
            <Link to="/ViewCompanies" className="link">All Companies</Link>
            <Link to="/ViewJobs" className="link">All Jobs</Link>

          <Route path="/ViewStudents" component={ViewStudents}/>
          <Route path="/ViewCompanies" component={ViewCompanies} />
          <Route exact path="/ViewJobs" component={ViewJobs} />
      </div>
      </Router>
      </div>   
      <img src={image} className="cover" title="Cover" height="400px" width="1440px"/>   
      <img src={imageDp} className="dp" title="Cover" height="200px" width="200px"/> 
      <div className="userInfo">
        <h1>User Information</h1>
      </div>
      </div>  
        
    
    )
}
}
export default Admin;
