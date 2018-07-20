import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
//import Example from './Components/Timer'
import Routes from './Routes.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
