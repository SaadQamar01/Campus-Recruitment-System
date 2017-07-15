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
  jobDescription:this.refs.jobDescription.value
 }

                var allJobs=firebase.database().ref();
                const allJobs1=allJobs.child("jobs").push(
                 job
           )
    
}
componentDidMount(){
    firebase.database().ref("jobs").on("value", snap=>{
        // alert("runs")
        let obj = snap.val();
        let jobs = [];
        for(let key in obj)
        {
            // alert('s')
            jobs.push(
                obj[key]
            )
        }
        this.setState({jobs})
        // console.log(this.state)
    })
}
getData(){
    
}
render(){
    return(
    <div>    
<div className="div2">       
    Job Title <input type="text" ref="jobTitle"/> <br /><br />
    Salary <input type="number" ref="salary"/> <br /><br />
    Job Description <input type="text" ref="jobDescription"/><br /><br />
    <button onClick={this.job.bind(this)}>POST</button>
</div>
    <ul className="list">
        {this.state.jobs.map((job,index)=>(
            <li className="EachJob" key={index}> 
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