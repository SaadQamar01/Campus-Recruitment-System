import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Student from './student.js'
import '../App.css';
class ViewCv extends Component {
    constructor() {
        super();
        this.state = {
            cv: [],
            cvKeys:[]
                }
    }
componentDidMount(){
        firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
             var currentEmail= firebase.auth().currentUser.email;
   if(currentEmail=="admin@gmail.com"){
       this.setState({
           checkAdmin:true
       })
   }
    firebase.database().ref("cv").on("value", snap=>{
        let obj = snap.val();
        // console.log(obj);
        let cv = [];
        let cvKeys=[]
        for(let key in obj)
        {
            cvKeys.push(key)
            cv.push(
                obj[key]
            )
        }
        // console.log(jobKeys);
        this.setState({
        cv:cv,
        cvKeys:cvKeys})
        console.log(this.state.cv);
    })
        }
    })
}
deletejob(index){
   var key= this.state.cvKeys[index];
//    alert();
//    console.log(keys);
    firebase.database().ref('cv/'+key).remove();

}
    render() {

        return (
    <div className="">    
    <ul className="allList">
    <h1>All CV's</h1>
        {this.state.cv.map((data,index)=>(
    <li className="eachList" key={index}> 
         {<span>Name: </span>}   {data.name} <br />
          {<span>Education: </span>}  {data.education}   <br />
           {<span>Skills: </span>} {data.skils} <br />
           {<span>Gpa: </span>} {data.gpa} <br />
           {<span>Overview: </span>} {data.overview} <br />
               {this.state.checkAdmin?
            
           <button onClick={this.deletejob.bind(this,index)}>Delete</button>
            : '' }
            </li>
        ))}
    </ul>
    </div>

        );
    }
}
export default ViewCv;