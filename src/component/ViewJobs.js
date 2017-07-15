import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Student from './student.js'
import '../App.css';
class ViewJobs extends Component {
    constructor() {
        super();
        this.state = {
            jobs: []
        }
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

    // componentDidMount() {
        // console.log("hello")
        // const rootRef = firebase.database().ref();
        // const speedRef = rootRef.child('jobs');
        // speedRef.on('value', snap => {
        //     var userObj = snap.val()
        //     this.setState({ AllJobs: userObj })
            //  this.setState((prev)=>(
            //      {AllJobs: prev.AllJobs.concat(userObj)} 
            //  ))
            // console.log(userObj)

            // this.setState({AllJobs: this.state.push(userObj)});
        // })
        // console.log(this.state.AllJobs)
    // }
    // componentDidMount(){
    //      this.props.history.push('/student');
    // }
    render() {

        return (



    <div className="">    
    <ul className="jobsList">
        {this.state.jobs.map((job,index)=>(
            <li className="EachJob" key={index}> 
         {<span>Job Title: </span>}   {job.jobTitle} <br />
          {<span>Salary: </span>}  {job.salary}   <br />
           {<span>Job Description: </span>} {job.jobDescription} <br />
            </li>
        ))}
    </ul>
    </div>




            // <div className="div2">
            //     <h1 className="Heading">All Jobs</h1>
            //     {
            //         this.state.AllJobs && this.state.AllJobs.length ?
            //         this.state.AllJobs.map((data) => {
            //             return <div className="EachJob">
            //           {<span>Job Title:</span>}  {data.jobTitle} {<br />}
            //           {<span>Job Description:</span>}  {data.jobDescription}  {<br />}
            //           {<span>Salary:</span>}  {data.salary}
            //              </div>
            //         })
            //         : false
            //     }
            // </div>
        );
    }
}
export default ViewJobs;