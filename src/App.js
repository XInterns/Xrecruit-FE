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
import Routes from './Routes.js';

var obj={};
export default class App extends Component {
  render() {
    return (
      <Router> 
      <div >
       
      {/* <NavLink  to="/" ><pre> <h2> Login </h2> </pre>        
      </NavLink> 
      <NavLink to="/Instructions"  >
             <pre> <h2> Instructions </h2> </pre>        
      </NavLink> 
      <NavLink to="/Details"  >
              <pre> <h2> Details </h2> </pre>        
      </NavLink> 
      <NavLink to="/Test"  >
              <pre> <h2> Test </h2> </pre>        
      </NavLink> */}

                 <Switch>
                    <Route exact path="/" exact  component={Login} />
                    <Route exact path="/instructions" exact  component={Instructions} />
                    <Route exact path="/details" exact  component={Details} />
                    <Route exact path="/test" exact  component={Test} />
                </Switch>
      
      
      {/* </header> */}
</div>
</Router>
    );
  }
}


