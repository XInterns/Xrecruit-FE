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
        this.componentWillMount = this.componentWillMount.bind(this);
       this.checkstatus = this.checkstatus.bind(this);

    }
    
    componentWillMount()
    {
       /* if (temp == 1) {
            
            this.setState({
                check: 1
            })
        }*/
        this.checkstatus();
    }
    checkstatus() {
        if (temp == 1) { 
            this.setState({
                check: 1
            })
        }
        //this.componentWillMount();
       }
    authenticate() {
        //console.log("hiiiii");
        var details = {};
        // alert("hey there");
        const node1 = this.myRef.current;
        const node2 = this.myRefnew.current;
        details.username = node1.value;
        details.password = node2.value;
        console.log(details);
        axios({
            method: 'post',
            url: 'http://192.168.2.188:7000/userlogin',
            data: {
                username: details.username,
                password: details.password
            }

        }).then((response) => {
           // obj=response;
            sessionStorage.setItem('response',JSON.stringify(response));
            console.log(response);

            let n=0;
            console.log("Response status is"+response.data[0].status);
            if(response.data[0].status==-1)
            {
                s=1;
            }
            n=Object.keys(response.data).length;
            var Check = response.data[n-1].message; //as the login status is the last element in the response
            temp = Check;
           // console.log(response.data);
           // console.log(Check)
            if (Check == 1) {
                console.log("hello...redirecting to instructions");
              //  console.log("temp =" + temp);
                var url = "/instructions";
                //this.setState({'isLoggedIn':true})
                // window.location.assign(url);
                // return <Redirect to='/instructions' /> //surajpkumar08@gmail.com dzscfx4h
                //xyz 1cuq3sis
                //yo@gmail.com z5vodspu
            }
            else {
                console.log("Invalid...bye");
            }

        }).then(this.checkstatus)
            .catch(function (error) {
                console.log(error);
            });



    }
    render() {
        return (
            // <div className="container">
            // <div className="inner">
            //     { this.state.check &&<Redirect to='/instructions'/>  }
            //     { this.state.check && s && <Redirect to='/Test'/> }
            //     <form>
            //        <span className='input'> User Name</span> : <input type="text" ref={this.myRef} placeholder="Enter your id" id="id" /> <br />
            //        <span className='input'> Password</span> : <input type="password" ref={this.myRefnew} placeholder="Enter your Password" id="password" /><br />
                    
            //             <div>
            //                 {/* <Link to="/instructions"> */}
            //                     <input type="button" value="Submit" onClick={this.authenticate} />
            //                 {/* </Link> */}
            //                 {/* <Link to="/abc"><h1>Thanks for taking the test!</h1></Link> */}
            //             </div>
            
            //     </form>
            //     </div> yo@gmail.com   z5vodspu
            // </div> wn00dd0u  3phsg2ro
            <div>
                     { this.state.check &&<Redirect to='/instructions'/>  }
                { this.state.check && s && <Redirect to='/Test'/> }
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" ref={this.myRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" ref={this.myRefnew} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
            
              <input type="button" value="Submit" className="btn btn-primary" onClick={this.authenticate}/>Submit
            </form>
            </div> 
        );
    }
}
