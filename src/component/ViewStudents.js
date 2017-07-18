import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class ViewStudents extends React.Component{
constructor(props){
super(props);
    this.state={
        students:[],
        companies:[],
        all:[]
    }
}
componentDidMount(){
        firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
    firebase.database().ref("user").once("value").then(snap=>{
        let obj = snap.val();
        let companiesObj = {};
        let studentsObj = {};
        for(let key in obj){
            if(obj[key].type.toLowerCase() === "student")
            {
                studentsObj[key] = obj[key]; 
            }
            else if(obj[key].type.toLowerCase() === "company")
            {
                companiesObj[key] = obj[key]; 
            }
        }
        let students = [];
        let companies = [];
        for(let a in companiesObj)
        {
            companies.push(companiesObj[a])
        }
        for(let a in studentsObj)
        {
            students.push(studentsObj[a])
        }
        this.setState({
            students,
            companies
        })
    })
        }})
// console.log(this.state.companies);
}

render(){
    return(
        <div className="div3">
        <h1>All Students</h1>          
                {
                    this.state.students && this.state.students.length ?
                    this.state.students.map((data) => {
                        return <div className="eachList">
                  {<span>Name: </span>}       {data.name}<br />
                   {<span>Email: </span>}      {data.email}<br />
                    {<span>Type: </span>}     {data.type}<br/>
                         </div>
                    })
                    : false
                }
            </div>
    )
}
}
export default ViewStudents;
