import React, { Component } from 'react';
import * as firebase from 'firebase';
class Jobs extends React.Component{
constructor(){
    super();
    this.state={
        jobs:[]
    }
}
job(ev){
    ev.preventDefault();
 var job={
//   uid:firebase.auth().currentUser.uid,   
  jobTitle:this.refs.jobTitle.value,
  salary:this.refs.salary.value,
  jobDescription:this.refs.jobDescription.value,
  uid: firebase.auth().currentUser.uid
 }
                var allJobs=firebase.database().ref();
                const allJobs1=allJobs.child("jobs").push(
                 job
           )
        this.setState({
            jobs: [...this.state.jobs,job]
        })   
           alert("Job Posted");
    
}

componentDidMount(){
            firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
  firebase.database().ref('jobs').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value').then((snap) => {
        var obj = snap.val();
        console.log(obj);
        let jobs = [];
        for(let key in obj)
        {
            jobs.push(
                obj[key]
            )
        }
        console.log(jobs);
        this.setState({jobs})
        console.log(this.state.jobs);
    })
            }})
}
render(){
    return(
    <div>    
<div className="div2">   
    <h1>Job Post</h1>    
     <input type="text" ref="jobTitle" placeholder="Job Title"/> <br />
     <input type="number" ref="salary" placeholder="Salary"/> <br />
     <input type="text" ref="jobDescription" placeholder="Job Description"/><br />
    <button className="button2" onClick={this.job.bind(this)}>POST</button>
</div>
    
    <ul className="list">
    <h1>Your Posted Jobs</h1>
        {this.state.jobs.map((job,index)=>(
            <li className="eachList" key={index}> 
         {<span>Job Title: </span>}   {job.jobTitle} <br />
          {<span>Salary: </span>}  {job.salary}   <br />
           {<span>Job Description: </span>} {job.jobDescription} <br />
            </li>
        ))}
    </ul>
    </div>
    )
}
}
export default Jobs;