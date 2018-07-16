import React, { Component } from 'react';
import './Instructions.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';
  var obj={};
  obj=sessionStorage.getItem('response');  //getting the response from session storage which was stored on login
  obj = JSON.parse(obj);

  var temp=0;
  export default class Instructions extends Component{ 
    constructor(props) {
        super(props);
        this.state = {
            nextpage: false
        }
        this.nextpage=this.nextpage.bind(this);
        this.checkstatus=this.checkstatus.bind(this);
    }
    componentWillMount()
    {
        this.checkstatus();
    }
    checkstatus()
    {
        if (temp == 1) { 
            this.setState({
                nextpage: true
            })
        }
        console.log("status2 "+this.state.nextpage)

    }
    nextpage()
    {
      //  const statechange =() => new Promise((resolve,reject)=>{
            temp=1;
            this.setState({
                nextpage: true
            })
       // })
        //.then(this.checkstatus);
       // temp=1;
      // var obj={};
      obj=sessionStorage.getItem('response');
     //console.log(JSON.stringify(obj));
      obj = JSON.parse(obj);
     console.dir(obj.data);
       console.log("status1 "+this.state.nextpage)
    }
    render()
   { return( 

  <div>
    { this.state.nextpage && <Redirect to='/details'/>}
  <div >
    <h2>Xebia Testing</h2>
    <span>Duration: <span>{obj.data[0].duration}</span> mins(Your time will start only after you see the list of questions)</span>
  </div>
  <div >
    <h3>Description</h3>
     <h4>This is a sample test</h4>
  </div>
  <div >
      <h1> The test comprises of {Object.keys(obj.data).length-1} questions</h1>
    <h3>This test will have the following type of questions</h3>
    {/* <span>Objective questions</span> */}
    <span>Multiple choice</span><br/>
    <span>Single choice</span><br/>
    <span>Subjective</span>

  </div>
  <div>
      <br/>
      <button onClick={this.nextpage}>NextPage-></button>
  </div>
  </div>);
 }

}
