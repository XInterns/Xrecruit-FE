import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Body from './Components/Body/';
import Header from './Components/Header/';

class Index extends React.Component {
    render() {
        return (
            <div className="window">
                <Header />
                <Body />
            </div>
        );
    }
}
ReactDOM.render(<Index />,document.getElementById('root'));