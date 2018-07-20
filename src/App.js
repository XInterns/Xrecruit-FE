import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import React,{Component} from 'react';
import './App.css';
import Login from './Components/Login/Login.js';
import Instructions from './Components/Instructions/Instructions.js';
import Details from './Components/Details/Details.js';
import Test from './Components/Test/Test.js';
import Submit from './Components/submit/submit.js';
import Routes from './Routes.js';

var obj={};
export default class App extends Component {
  render() {
    return (
      <Router> 
      <div >

                 <Switch>
                    <Route exact path="/" exact  component={Login} />
                    <Route exact path="/instructions" exact  component={Instructions} />
                    <Route exact path="/details" exact  component={Details} />
                    <Route exact path="/test" exact  component={Test} />
                    <Route exact path="/submit" exact  component={Submit} />  //last page


                </Switch>
      
</div>
</Router>
    );
  }
}


