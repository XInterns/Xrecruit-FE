
import React, { Component } from 'react';
import './submit.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import axios from 'axios';

export default class Submit extends Component{
    constructor(props) {
        super(props);
    }
        render()
        {
            return (
            <div className="Success-outer">
                  <div className="Success">
                    You have successfully completed the test!!
                  </div>
            </div>);
        
    }
}
