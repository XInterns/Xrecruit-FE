import React, { Component } from 'react';
import './Instructions.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';
  
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
            temp=1;
            this.setState({
                nextpage: true
            })
       
           let obj=sessionStorage.getItem('response');
           obj = JSON.parse(obj);
           console.dir(obj.data);
           console.log("status1 "+this.state.nextpage)
    }
    render()
   { let obj = JSON.parse(sessionStorage.getItem('response'));
       
    return( 
          <div className="Instructions-outer">
           { this.state.nextpage && <Redirect to='/details'/>}

   <div className="Instructions-header"><span>INSTRUCTIONS</span></div> 
        <div className="Instructions-inner">
         <div className="Inner">
            <p className="statement-one">This is a sample test</p>
            <span className="statement-two">Duration: <span>{parseInt(obj.data[1][0].duration/3600)} hrs and {parseInt((obj.data[1][0].duration%3600)/60)} mins</span> (Your time will start only after you see the list of questions)</span>

            <p className="statement-three"> The test comprises of {Object.keys(obj.data[1]).length} questions</p>
            <p className="statement-four">This test will have the following type of questions</p>
            <span>Multiple choice</span><br/>
            <span>Single choice</span><br/>
            <span>Subjective</span>

         </div>
  </div>
   <div className="next-button">
      <button className="button" onClick={this.nextpage}>NextPage-></button>
  </div>
  </div>);
 }

}
