import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
var flag=0;
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, 
                  seconds:(this.props.a),
                   nextpage:false
                  };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.autosave= this.autosave.bind(this);
  }


  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer()
   {
    console.log(sessionStorage.getItem('duration'))
    
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
      setInterval(this.autosave,3000);
      
    }
  
  }
  autosave()
  {
   
    var dur=sessionStorage.getItem('duration');
    if(dur==300)alert("Only five minutes left!!");
    console.log("hit",dur)
    if(flag==0)
    {
    axios({
      method: 'post',
      url: 'http://192.168.2.191:7000/updatetime',
      data: {
        duration:dur,
        email:sessionStorage.getItem('email')      
      }
  });
    if(dur==0){
      flag=1;
    }
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    if(sessionStorage.getItem('duration')!=0)
    {let seconds = this.state.seconds - 1;
    sessionStorage.setItem("duration",seconds);

    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
  }else {clearInterval(this.timer);
        
  }
  }

  render() {
    return(
      <div>
        {(sessionStorage.getItem('duration')==0)?this.state.nextpage=true:''} 
        {(this.state.nextpage) && <Redirect to='/submit'/>} 
        {this.startTimer()} 
          Hr:{this.state.time.h} Min:{this.state.time.m} Sec:{this.state.time.s}
      </div>
    );
  }
}

