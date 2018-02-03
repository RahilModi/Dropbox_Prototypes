import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import CryptoJS from 'crypto-js';
import {connect} from 'react-redux';

import App from "./App";
import Signup from "./Signup";
import UserInfo from "./UserInfo";
import * as LoginAPI from '../api/LoginAPI';
import * as UserAPI from '../api/GetUserAPI';
import {LoadUser, InitializeState} from '../actions/index';
import * as config from '../config';

class Login extends Component{
    state = {
        userdata:{
            emailId: '',
            password: ''
        },
        isLoggedIn: false,
        message: ''
    };

    handleLogin = () => {
        var payload, ciphertext, encrypt;
        ciphertext = CryptoJS.AES.encrypt(this.state.userdata.password,config.crypto_key);
        encrypt = ciphertext.toString();

        payload={
            emailId:this.state.userdata.emailId,
            encryptedPassword:encrypt,
            password:this.state.userdata.password
        }
        console.log(payload);
        LoginAPI.performLogin(payload)
            .then(status => {
                console.log(status);
                if(status === 201){
                    this.setState({
                        isLoggedIn: true,
                        message:"Welcome to the DropBox Prototype"
                    });
                    this.getUserDetail();
                }else if(status === 401){
                    this.setState({
                        isLoggedIn: false,
                        message:"Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    getUserDetail = () => {
        var emailId = this.state.userdata.emailId;
        UserAPI.getUser({emailId})
            .then( obj => {
                this.props.LoadUser(obj);
                if(typeof(Storage) !== "undefined"){
                    localStorage.UserId = obj.UserId;
                    localStorage.EmailId = obj.EmailId;
                }
                this.props.InitializeState();
                this.props.history.push("/App");
            });
    };

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div className="row justify-content-md-center">
                        <div className="col-md-3">
                            <form>
                                <div className="form-group">
                                    <h1>Login</h1>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Username"
                                        placeholder="Enter Registered Email"
                                        value={this.state.userdata.emailId}
                                        onChange={event => {
                                            this.setState({
                                                userdata: {
                                                    ...this.state.userdata,
                                                    emailId: event.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        label="Password"
                                        placeholder="Enter Password"
                                        value={this.state.userdata.password}
                                        onChange={event => {
                                            this.setState({
                                                userdata: {
                                                    ...this.state.userdata,
                                                    password: event.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="c-btn c-btn--primary"
                                            type="button"
                                            onClick={() => this.handleLogin()}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <p>Don't have an account yet?<a href="Signup">Sign Up</a></p>
                        </div>
                    </div>
                )}/>
                <Route exact path="/App" component={App}/>
                <Route exact path="/Signup" component={Signup}/>
                <Route exact path="/UserInfo" component={UserInfo}/>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        userdetail: state.userdetail
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({LoadUser, InitializeState}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));