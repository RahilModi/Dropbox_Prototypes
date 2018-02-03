import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import logo from './../public/logo.svg';
import './../public/scooter.css';

class LeftMenu extends Component {
    render() {return (
        <div id="right" className="c-banner">
            <div>
                <object type="image/svg+xml" id="imgLogo" data={logo} height="75px">
                    logo
                </object>
            </div>
            <div>
                <button className="c-btn c-btn--tertiary--2 f3" onClick={() => this.props.history.push("/App")}>Home</button>
            </div>
            <div className = "align-bottom">
                <button className="c-btn c-btn--tertiary--2" onClick={() => this.props.history.push("/")}>Logout</button>
            </div>
        </div>
    );
    }
}

export default withRouter(LeftMenu);