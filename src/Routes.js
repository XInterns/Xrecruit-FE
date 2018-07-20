import React from "react";
import App from "./App.js";
import {
       BrowserRouter as Router,  
       Route, 
        Switch,
        } from "react-router-dom";   
import Login from "./Components/Login/Login.js";
import Instructions from "./Components/Instructions/Instructions.js";
import Details from "./Components/Details/Details.js";
import Test from "./Components/Test/Test.js";
import Submit from './Components/submit/submit.js';
//import Statelist from "./states/containers/Statelist";
export default function Routes(props) {
    return (
        <Router>
                <App>
                <Switch>
                    <Route path="/" exact  component={Login} />
                    <Route path="/instructions" exact  component={Instructions} />
                    <Route path="/details" exact  component={Details} />
                    <Route path="/test" exact  component={Test} />
                    <Route exact path="/submit" exact  component={Submit} />  //last page

                </Switch>
                </App>
        
        </Router>
    )
}