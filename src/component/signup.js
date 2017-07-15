import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { BrowserRouter as  Router,Route,Link } from "react-router-dom";
class Signup extends React.Component{
    constructor(){
        super();
        this.state={
            userType: null
        }
    }
    setUser(event) {
        this.setState({
            userType: event.target.value
        })
    console.log(event.target.value);
  }
    signUp(){
    var userEmail = this.refs.email.value;
    var userPass = this.refs.pass.value;
    // var studentObj = {email:studentEmail.value,
    //            password : studentPass.value };
    //            this.state.students.push(studentObj);
    //            console.log(this.state);
    //           this.setState(prev=>( { students:[...this.state.students,studentObj] } ) );
    //           console.log(this.state.students);
        const auth=firebase.auth();
       auth.createUserWithEmailAndPassword(userEmail,userPass).catch(function(error){alert(error)})
       .then(data=>{
           firebase.auth().currentUser.updateProfile({
               displayName:this.refs.name.value,
           })
          var rootRef=firebase.database().ref();
           const speedRef=rootRef.child("user"+"/"+firebase.auth().currentUser.uid).set({
              email: userEmail,
              password: userPass,
              name: this.refs.name.value,
              type:this.state.userType
           })
           this.refs.name.value="";
           this.refs.email.value="";
            this.refs.pass.value="";
    //  var refRoot = firebase.database().ref('/todo/')
    //  refRoot.push({ todo: this.refs.todo.value }) 
       })
        // var errorCode=error.code;
        // var errorMessage=error.Message;

        //  const speedRef=rootRef.child('students').set(this.state.students);
    }
    render(){
        return(
  <div className="form">
    <form onSubmit={ev=>ev.preventDefault()}>
    Name:<br/><input className="form-control" type="text" ref="name"/><br/>
    Email:<br/><input className="form-control" type="email" ref="email"/> <br />
     Password:<br/><input className="form-control" type="password" ref="pass"/><br/>
      <div className="radioButton" onChange={this.setUser.bind(this)}>
        <input type="radio" value="student" name="user"/> Student <br/>
        <input type="radio" value="company" name="user"/> Company
      </div>
    <button  onClick={this.signUp.bind(this)}>Sign Up</button>
    </form> 
    </div>
        // <h1>SignUp</h1>
        )
    }
}
export default Signup;