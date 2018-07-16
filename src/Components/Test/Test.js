import React, { Component } from 'react';
import './Test.css';
import axios from 'axios';
import Timer from './Timer.js';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';
var ans = {
    "answer": "",
    "qid": "",
    "email": ""
};
var mainResponse = [];
var obj = {};
obj = sessionStorage.getItem('response');
obj = JSON.parse(obj);

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            time:{
                m:0,
                s:0
            }
        }
        this.data = this.data.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
    }

    submitAnswer(e) {
        //var ans = {};

        if (e.currentTarget.type === 'radio') {

            ans.answer = e.currentTarget.id;
            ans.answer = ans.answer.split("-");
            ans.answer = ans.answer[0];
            ans.qid = e.currentTarget.value;
            ans.email = obj.data[0].email;
            console.log(ans);

        }
        else if (e.currentTarget.type === 'checkbox') {
            if (ans.answer == '') {
                ans.answer = e.currentTarget.id;
            }
            else {
                ans.answer += '~';
                ans.answer = ans.answer + e.currentTarget.id;
            }
            // ans.answer = e.currentTarget.id;
            // ans.answer=
            ans.answer = ans.answer.split("-");
            ans.answer = ans.answer[0];
            ans.qid = e.currentTarget.value;
            ans.email = obj.data[0].email;
            console.log(ans);
        }
        else {
            ans.qid = e.currentTarget.id;
            ans.answer = e.currentTarget.value;
            ans.email = obj.data[0].email;

        }

    }

    finalSubmit() {
        console.log(ans.answer);
        var alem = document.getElementById("abc");
        // alem.value;
        //  console.log("alem is "+alem.getAttribute('value'));
        axios({
            method: 'post',
            url: 'http://192.168.2.188:7000/answers',
            data: {
                email: ans.email,
                qid: ans.qid,
                answer: ans.answer
            }
        });
        ans.answer = '';

    }

    data() {

        var obj = {};
        obj = sessionStorage.getItem('obj');
        //console.log(JSON.stringify(obj));
        obj = JSON.parse(obj);
        // console.log(obj.data);
        //  for(let i=0;i<obj.length;i++)
        //  console.log(sessionStorage.getItem('obj')[i]);

    }
    render() {
        console.log("the object in test is /n"+obj);

        let len = Object.keys(obj.data).length - 1;
        console.log(obj.data[len - 1].status);
        if (obj.data[len - 1].status == 0) {
            for (let i = 0; i < len; i++) {
                if (obj.data[i].qtype === 'MC') {
                    var temp = obj.data[i].options.split("~");

                    mainResponse.push(<div className="container">
                        <h4>{i + 1}) {obj.data[i].question} </h4><br />
                        <form>
                            <input type="checkbox" name="option1" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[0]}<br />
                            <input type="checkbox" name="option2" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[1]}<br />
                            <input type="checkbox" name="option3" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[2]}<br />
                            <input type="checkbox" name="option4" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[3]}<br />
                            <input type="button" value="Submit answer" onClick={this.finalSubmit} />
                        </form>
                        <br />
                    </div>);

                }
                else if (obj.data[i].qtype === 'SC') {
                    var temp = obj.data[i].options.split("~");
                    mainResponse.push(
                        <div className="container">
                            <h4>{i + 1}) {obj.data[i].question} </h4>
                            <form>
                                <input type="radio" name="option" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[0]}<br />
                                <input type="radio" name="option" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[1]}<br />
                                <input type="radio" name="option" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[2]}<br />
                                <input type="radio" name="option" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[3]}<br />
                                <input type="button" value="Submit answer" onClick={this.finalSubmit} />

                            </form>
                        </div>
                    );
                }
                else if (obj.data[i].qtype === 'Text') {
                    mainResponse.push(
                        <div className="container">
                            <h4>{i + 1}) {obj.data[i].question} </h4>
                            <textarea id={obj.data[i].qid} rows="5" cols="50">

                            </textarea><br />
                            <button onClick={this.submitAnswer}>Submit</button>
                            <br />
                        </div>
                    );
                }
            }
        }
        else {
            console.log("this is else !!!!!!!!!!!!!!");
            for (let i = 0; i < len; i++) {
                if (obj.data[i].qtype === 'MC') {
                    var temp = obj.data[i].options.split("~");

                    mainResponse.push(<div className="container">
                        <h4>{i + 1}) {obj.data[i].question} </h4><br />
                        <form>
                            <input type="checkbox" name="option1" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[0]}<br />
                            <input type="checkbox" name="option2" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[1]}<br />
                            <input type="checkbox" name="option3" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[2]}<br />
                            <input type="checkbox" name="option4" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} />{temp[3]}<br />
                            <input type="button" value="Submit answer" onClick={this.finalSubmit} />

                        </form>
                        <br />
                    </div>);
                    if (obj.data[i].user_answers != null) {
                        // console.log("hi");
                        // console.log(obj.data[i].user_answers + ' '+obj.data[i].qid+'\n');
                        //console.log( typeof(obj.data[i].user_answers));
                        var t1 = obj.data[i].user_answers + obj.data[i].qid;
                        //var node = document.getElementById(t1);
                        //console.log(node);
                        //node=true;


                    }


                }
                else if (obj.data[i].qtype === 'SC') {
                    var temp = obj.data[i].options.split("~");
                    if (obj.data[i].user_answers != null) {
                        if (obj.data[i].user_answers + obj.data[i].qid == temp[0] + obj.data[i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={true} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Submit answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else if (obj.data[i].user_answers + obj.data[i].qid == temp[1] + obj.data[i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={true} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Submit answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else if (obj.data[i].user_answers + obj.data[i].qid == temp[2] + obj.data[i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={true} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Submit answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else if (obj.data[i].user_answers + obj.data[i].qid == temp[3] + obj.data[i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={true} />{temp[3]}<br />
                                        <input type="button" value="Submit answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else {

                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[0] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[1] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[2] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[i].qid} id={temp[3] + "-" + obj.data[i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Submit answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                    }
                    /*if (obj.data[i].user_answers != null) {
                       
                       // console.log(obj.data[i].user_answers+ ' '+obj.data[i].qid+'\n');
                        var temp=obj.data[i].user_answers+obj.data[i].qid;
                       console.log(temp);
                        var node=document.getElementById(temp);
                        console.log(node);
                         //node.checked=true;
                            }*/
                }
                else if (obj.data[i].qtype === 'Text') {
                    mainResponse.push(
                        <div className="container">
                           
                           <div className="questions">   
                            <h4>{i + 1}) {obj.data[i].question} </h4>
                            <textarea rows="5" cols="50">

                            </textarea><br />
                            <button>Submit</button>
                            <br />
                            </div>
                        </div>
                    );
                }
            }

        }

        return (
            <div onClick={this.data} className="container" style={{ backgroundColor: 'white' }}>
               <div className="header">
                 <div className="timer">
                   <Timer/>    {/* m: {this.state.time.m} s: {this.state.time.s} */}
                 </div>
                            
                 <div><button id="abc" value="hello">hello</button></div>
                 </div>
                {mainResponse}
                {/* <h1>test :) </h1> */}
            </div>
        );
    }
}
export default Test;