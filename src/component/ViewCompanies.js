import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class ViewCompanies extends React.Component{
constructor(props){
super(props);
    this.state={
        students:[],
        companies:[],
        all:[]
        // companiesKeys:[]
    }
}
// view(index){
//     let companyForView =  companies[index];
//     return(
//         <table>

//         </table>   
//     )
// }
componentDidMount(){
    firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
    firebase.database().ref("user").on("value",snap=>{
        let obj = snap.val();
        console.log(obj);
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
        // let companiesKeys = [];
        for(let a in companiesObj)
        {
            // companiesKeys.push(a)
            companies.push(companiesObj[a])
        }
        for(let a in studentsObj)
        {
            students.push(studentsObj[a])
        }
        this.setState({
            students,
            companies
            // companiesKeys
        })
    })
    }})
}

render(){
    return(
        <div className="div3">
        <h1>All Companies</h1> 

                    
                {
                    this.state.companies && this.state.companies.length ?
                    this.state.companies.map((data,index) => {
                        return <div className="eachList">
                    {<span>Name: </span>}   {data.name} <br />
                    {<span>Email: </span>}     {data.email}<br />
                     {<span>Type: </span>}    {data.type}
                         </div>
                         
                    })
                    : false
                }
            </div>
    )
}
}
export default ViewCompanies;