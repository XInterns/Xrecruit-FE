
import React, { Component } from 'react';
import './Details.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import axios from 'axios';
var obj={};
  obj=sessionStorage.getItem('response');
  obj = JSON.parse(obj);

export default class Details extends Component{
    

    constructor(props) {
        super(props);
        this.state = {
            nextpage: false,
            value1:'' ,
            value2:obj.data[0].email ,
            value3:'' ,
            value4:'' ,
            value5:'',
            value6:''
        }
        this.nextpage=this.nextpage.bind(this);
        //this.checkstatus=this.checkstatus.bind(this);
        this.handleChange1=this.handleChange1.bind(this);
        this.handleChange2=this.handleChange2.bind(this);

        this.handleChange3=this.handleChange3.bind(this);
        this.handleChange4=this.handleChange4.bind(this);
        this.handleChange5=this.handleChange5.bind(this);
        this.handleChange6=this.handleChange6.bind(this);


    }
    handleChange1(event) {
        this.setState({value1: event.target.value});
      }
      handleChange2(event) {
        this.setState({value2: event.target.value});
      }  
      handleChange3(event) {
        this.setState({value3: event.target.value});
      }
      handleChange4(event) {
        this.setState({value4: event.target.value});
      } 
      handleChange5(event) {
        this.setState({value5: event.target.value});
      } 
      handleChange6(event) {
        this.setState({value6: event.target.value});
      } 
    nextpage()
    {   
        var obj={};
        obj.name=this.state.value1;
        obj.email=this.state.value2;
        obj.contact=this.state.value3;
        obj.address=this.state.value4;
        obj.college=this.state.value5;
        obj.percentage=this.state.value6;
        axios({
            method: 'post',
            url: 'http://192.168.2.188:7000/details',
            data: {
                name: obj.name,
                email: obj.email,
                contact: obj.contact,
                address:obj.address,
                college:obj.college,
                percentage: obj.percentage
            }
        }).then(()=>{
            this.setState({
                nextpage:true
            })
        })
    }

        render()
        {
            return (<div>
                 {this.state.nextpage && <Redirect to='/test'/>}
                <div>
                    <h2>Please enter your details before starting the test</h2>
                </div>
                <div>
                    <form>
                        <pre>
                            Name                    <input type="text" value={this.state.value1} name="firstname" onChange={this.handleChange1}  /> <br />
                            Email                   <input type="text" value={this.state.value2} name="email" onChange={this.handleChange2}  /> <br />
                            Contact                 <input type="text"  value={this.state.value3} name="contact" onChange={this.handleChange3} /> <br />
                            Current address        <input type="text" value={this.state.value4} name="current address" onChange={this.handleChange4} /> <br />
                            College/University      <input type="text"value={this.state.value5}  name="college" onChange={this.handleChange5} /> <br />
                            Percentage/CGPA         <input type="text"value={this.state.value6}  name="percentage" onChange={this.handleChange6} /> <br /> 
                            <input type="button" name="submit" value="Submit and Proceed" onClick={this.nextpage}
                            />
                        </pre>
                    </form>

                </div>

            </div>);
        
    }
}