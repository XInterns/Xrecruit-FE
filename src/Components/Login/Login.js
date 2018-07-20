import React, { Component } from 'react';
import axios from 'axios';

import './Login.css';
import {
    BrowserRouter as Router, 
    Link,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

var temp = 0; var s=0;
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {    
            login: 0      //to inform if its the first time login or not
        }
        this.myRef = React.createRef();
        this.myRefnew = React.createRef();
        this.authenticate = this.authenticate.bind(this);
       this.checkstatus = this.checkstatus.bind(this);

    }
    
    componentDidMount()
    {
      
        this.checkstatus();
    }
    checkstatus() {
        if (temp == 1) { 
            this.setState({
                check: 1
            })
        }
    
       }
    authenticate() {
        var details = {};
        const node1 = this.myRef.current;
        const node2 = this.myRefnew.current;
        details.username = node1.value;
        details.password = node2.value;
        console.log(details);
        axios({
            method: 'post',
            url: 'http://192.168.2.191:7000/userlogin',
            data: {
                username: details.username,
                password: details.password
            }

        }).then((response) => {
           
           console.log(response);
           if(response.data[0].message==1)  //valid credentials
           {
            console.log("REsponse is "+JSON.stringify(response));
            sessionStorage.setItem('response',JSON.stringify(response));
            sessionStorage.setItem('email',response.data[1][0].email);
            sessionStorage.setItem('duration',response.data[1][0].duration);

            console.log("after setting the session storage \n"+sessionStorage.getItem('response'));//response);

            let n=0;
            console.log("Response status is"+response.data[1].status);
            if(response.data[1].status==-1)
            {
                s=1;
            }
            n=Object.keys(response.data).length;
            temp = 1;
            console.log("response message is "+response.data[0].message);
            console.log("hello...redirecting to instructions");
            var url = "/instructions";
           
           
        }
            else {
                console.log("Invalid Credentials...bye");
                alert("Invalid Credentials!");
            }
        
        }).then(
            this.checkstatus
        )
            



    }
    render() {
        return (
            
           
            <section class="outer" id="outer">
                     { this.state.check &&<Redirect to='/instructions'/>  }
                     { this.state.check && s && <Redirect to='/Test'/> }
                <div className = "user_login">
                <div className = "login-header">XRECRUITS</div>
            
              
                <div className="username">
                <input type="email" ref={this.myRef} className="user" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
               <div className="password"> 
                <input type="password" ref={this.myRefnew} className="pass" id="exampleInputPassword1" placeholder="Password"/>
              </div>
            
            
              <div className = "login" ><input className="btn btn-primary btn-xl bg-danger text-uppercase js-scroll-trigger" type="button" value="Login" className="btn btn-primary" onClick={this.authenticate}/> </div>
            
            </div>
            </section> 
        );
    }
}
