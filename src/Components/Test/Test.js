import React, { Component } from 'react';
import './Test.css';
import axios from 'axios';
import Timer from './Timer.js';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
var ans = {
    "answer": "",
    "qid": "",
    "email": ""
};
var mainResponse = [];
var answering=[];

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextpage: false,
            id: "",
        
            time:""
        }
        
        this.submitAnswer = this.submitAnswer.bind(this);
        this.finalSubmit = this.finalSubmit.bind(this);
        this.textSubmit = this.textSubmit.bind(this);
        this.nextpage=this.nextpage.bind(this); //to sbumit the whole test
       
    }

    submitAnswer(e) {
        if (e.currentTarget.type === 'radio')
         {

            console.log("Radio answer id is "+e.currentTarget.id);
          
            ans.answer = e.currentTarget.id;
            ans.answer = ans.answer.split("-");
            ans.answer = ans.answer[0];
            ans.qid = e.currentTarget.value;
            answering[ans.qid]=ans.answer;
            console.log("Chosen answer is "+ans.answer);

        }
        else if (e.currentTarget.type === 'checkbox') 
        {
            
        if(answering[(((e.currentTarget.id).split('-'))[1])]!=null)
        {
            ans.answer=answering[(((e.currentTarget.id).split('-'))[1])]
        }
            let b=document.getElementById(e.currentTarget.id).checked;
        if(b)
        {
            var re=(((e.currentTarget.id).split('-'))[0])
            if (ans.answer == '') //if its blank
            {
               ans.answer = re;

           }
           else 
           {
            ans.answer += '~';
            ans.answer = ans.answer + re;
        }
        
        }
        else
        {  
           var as=ans.answer.split("~")
           var re=(((e.currentTarget.id).split('-'))[0])
         
           var index = as.indexOf(re);
            if (index > -1) {
            as.splice(index, 1);
           }
           
           ans.answer=""
           var tl="~"
           for(var i=0;i<as.length;i++)
           {
            if(i==as.length-1){
                var tl=""
            }
                ans.answer+= as[i]+tl
           }
           
          
        }
            ans.qid=(((e.currentTarget.id).split('-'))[1]);
            answering[(((e.currentTarget.id).split('-'))[1])]=ans.answer
            console.log(ans);
            console.log(answering)
        }
    }

    setTime(as)
    {
        this.setState
        {
            time:`${as}`
        }
        return as;
    }
    textSubmit(v)
    {
        console.log("Submitted text id is"+v);
        var val = document.getElementById(v);
        console.log("the value is:"+val.value)
        
        axios({
            method: 'post',
            url: 'http://192.168.2.191:7000/answers',
            data: {
                email: sessionStorage.getItem('email'),
                qid: v,
                answer: val.value
            }
        });
        ans.answer = '';

    }

    finalSubmit() {
        
        console.log("Email id is"+sessionStorage.getItem('email'));
        axios({
            method: 'post',
            url: 'http://192.168.2.191:7000/answers',
            data: {
                email: sessionStorage.getItem('email'),
                qid: ans.qid,
                answer: answering[ans.qid]
            }
        });
        ans.answer = '';

    }
    nextpage()
    {   
        sessionStorage.setItem('duration',0);

        axios({    //first update the test status to 1 i.e complete at the backend
            method: 'post',
            url: 'http://192.168.2.191:7000/updatetime',
            data: {
                status:1,
                email:sessionStorage.getItem('email'),
                duration:0
            }
        }).then(()=>{
            console.log("SUBMITTED!!!");
            this.setState({
                nextpage:true
            })
        })
    }

   
    render() {
        let obj = JSON.parse(sessionStorage.getItem('response'));
        console.log("Inside Render object data in test is -- "+JSON.stringify(obj));

        let len = Object.keys(obj.data[1]).length ;
        console.log("The object length is "+len);
        console.log("The object status is "+obj.data[1][0].status);

        if (obj.data[1][0].status == 0 || obj.data[1][0].status == 1)  //First Time LOGIN
         {
             console.log("FIRST TIME LOGIN");

            for (let i = 0; i < len; i++) {
                if (obj.data[1][i].qtype === 'MC')
                 {
                    var temp = obj.data[1][i].options.split("~");

                    mainResponse.push(<div className="container">
                        <h4>{i + 1}) {obj.data[1][i].question} </h4><br />
                        <form>
                            <input type="checkbox" name="option1" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} kchecked={false} />{temp[0]}<br />
                            <input type="checkbox" name="option2" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} kchecked={false} />{temp[1]}<br />
                            <input type="checkbox" name="option3" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} kchecked={false} />{temp[2]}<br />
                            <input type="checkbox" name="option4" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} kchecked={false} />{temp[3]}<br />
                            <input type="button" value="Save answer" onClick={this.finalSubmit} />
                            
                        </form>
                        <br />
                    </div>);

                }
                else if (obj.data[1][i].qtype === 'SC') {
                    var temp = obj.data[1][i].options.split("~");
                    mainResponse.push(
                        <div className="container">
                            <h4>{i + 1}) {obj.data[1][i].question} </h4>
                            <form>
                                <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[0]}<br />
                                <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[1]}<br />
                                <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[2]}<br />
                                <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[3]}<br />
                                <input type="button" value="Save answer" onClick={this.finalSubmit} />

                            </form>
                        </div>
                    );
                }
                else if (obj.data[1][i].qtype === 'Text') {
                    mainResponse.push(
                        <div className="container">
                            <h4>{i + 1}) {obj.data[1][i].question} </h4>
                            <textarea className="textarea" id={obj.data[1][i].qid} rows="5" cols="50">

                            </textarea><br />
                           {/*  <button className="sub" onClick={this.submitAnswer()}>Save answer</button> */}
                           <button className="sub" onClick={() => this.textSubmit(obj.data[1][i].qid)}>Save answer</button>
                            <br />
                        </div>
                    );
                }
            }
        }
        else
         {  //IN case of second login
            console.log("this is else !!!!!!!!!!!!!!");
            for (let i = 0; i < len; i++) {
                if (obj.data[1][i].qtype === 'MC')
                 {
                    var temp = obj.data[1][i].options.split("~");

                    mainResponse.push(<div className="container">
                        <h4>{i + 1}) {obj.data[1][i].question} </h4><br />
                        <form>
                            <input type="checkbox" name="option1" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[0]}<br />
                            <input type="checkbox" name="option2" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[1]}<br />
                            <input type="checkbox" name="option3" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[2]}<br />
                            <input type="checkbox" name="option4" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} />{temp[3]}<br />
                            <input type="button" value="Save answer" onClick={this.finalSubmit} />

                        </form>
                        <br />
                    </div>);
                    if (obj.data[1][i].user_answers != null) {
                        var t1 = obj.data[1][i].user_answers + obj.data[1][i].qid;
                        
                    }


                }
                else if (obj.data[1][i].qtype === 'SC') 
                {
                    console.log("SC Question found!!");
                    var temp = obj.data[1][i].options.split("~");
                    if (obj.data[1][i].user_answers != null) 
                      
                    {   //in case of status -1
                        if (obj.data[1][i].user_answers + obj.data[1][i].qid == temp[0] + obj.data[1][i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[1][i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={true} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Save answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else if (obj.data[1][i].user_answers + obj.data[1][i].qid == temp[1] + obj.data[1][i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[1][i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={true} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Save answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else if (obj.data[1][i].user_answers + obj.data[1][i].qid == temp[2] + obj.data[1][i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[1][i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={true} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Save answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else if (obj.data[1][i].user_answers + obj.data[1][i].qid == temp[3] + obj.data[1][i].qid) {
                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[1][i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={true} />{temp[3]}<br />
                                        <input type="button" value="Save answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                        else {

                            mainResponse.push(
                                <div className="container">
                                    <h4>{i + 1}) {obj.data[1][i].question} </h4>
                                    <form>
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[0] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[0]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[1] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[1]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[2] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[2]}<br />
                                        <input type="radio" name="option" value={obj.data[1][i].qid} id={temp[3] + "-" + obj.data[1][i].qid} onChange={this.submitAnswer} checked={false} />{temp[3]}<br />
                                        <input type="button" value="Save answer" onClick={this.finalSubmit} />

                                    </form>
                                </div>);
                        }
                    }  //answers=null
                    /*if (obj.data[i].user_answers != null) {
                       
                       // console.log(obj.data[i].user_answers+ ' '+obj.data[i].qid+'\n');
                        var temp=obj.data[i].user_answers+obj.data[i].qid;
                       console.log(temp);
                        var node=document.getElementById(temp);
                        console.log(node);
                         //node.checked=true;
                            }*/
                }
                else if (obj.data[1][i].qtype === 'Text') {
                    mainResponse.push(
                        <div className="container">
                           
                           <div className="questions">   
                            <h4>{i + 1}) {obj.data[1][i].question} </h4>
                            <textarea rows="5" cols="50">

                            </textarea><br />
                            <button>Submit</button>
                            <br />
                            </div>
                        </div>
                    );
                }
            }
            console.log("\n Main Response is"+mainResponse);

        }

        return (
            <div className="external-container" >
            {(sessionStorage.getItem('duration')==0)?this.state.nextpage=true:''} 
              {(this.state.nextpage) && <Redirect to='/submit'/>} 
               <div className="test-header">
                 <div className="Time"><Timer a={this.setTime(sessionStorage.getItem('duration'))}/></div>
               </div>
                {mainResponse}
            
            <div className="submit-test"><input className="button" type="button" name="submit" value="Submit the test" onClick={this.nextpage} /></div>
           </div>
        );
    }
}
export default Test;