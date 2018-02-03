import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import UserActivity from  './UserActivity';
import ErrorBoundary from "./ErrorHandler";
import UserGroups from './UserGroup';

let link={
    marginRight:-100,
    paddingTop:'-80',
    outline: 'none',
    background: 'none',
    color: 'rgb(105, 11, 224)',
    fontSize: '18px',
    fontWeight: '800',
    border: 'none',
};

let pqr={display:'inline-block',textAlign:'left',width:'50%'};

let list={listStyleType:'none',float:'left'};

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        filelist:[],
        root:'',
        userId:'',
        rootDir:''
    };

    render() {
        return (
            <div className="mast-head__container container">

                <Route exact path="/" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>


                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/welcome" render={() => (
                    <ErrorBoundary>
                        <Welcome goToPath={this.goToPath} signout={this.signout}  getToHome={this.getToHome}  data={this.state}/>
                    </ErrorBoundary>
                )}/>

                <Route exact path="/signUp" render={() => (
                    <div>
                        <SignUp handleSignUp={this.handleSignUp} />
                        <Message message={this.state.message}/>
                    </div>

                )}/>

                <Route exact path="/userprofile" render={() => (
                    <ErrorBoundary>
                        <UserProfile goToPath={this.goToPath} signout={this.signout} getToHome={this.getToHome} data={this.state} />
                    </ErrorBoundary>

                )}/>

                <Route exact path="/usergroups" render={() => (
                    <div>
                        <UserGroups goToPath={this.goToPath} signout={this.signout} getToHome={this.getToHome} data={this.state} />
                    </div>
                )}/>

                <Route exact path="/useractivity" render={() => (
                    <ErrorBoundary>
                        <UserActivity goToPath={this.goToPath} signout={this.signout} getToHome={this.getToHome} data={this.state} />
                    </ErrorBoundary>

                )}/>

            </div>
        );
    }

    handleSubmit = (data) => {

        var userdata = {
            username:data.username,
            password:data.password
        };

        API.doLogin(userdata)
            .then(res => {
                console.log(JSON.stringify(status));

                if (res.status == '201') {

                    localStorage.setItem("token", res.userid);
                    localStorage.setItem("root", res.root);

                    this.setState({
                        isLoggedIn: true,
                        message: res.message,
                        username: res.username,
                        filelist:res.filelist,
                        root:res.root,
                        userId:res.userid
                    });

                    this.props.history.push("/welcome");

                } else if (res.status == '401') {

                    localStorage.setItem("token", null);
                    this.setState({
                        isLoggedIn: false,
                        message: res.message
                    });
                }
            });
    };

    getToHome = () =>{
        this.props.history.push('/welcome');
    };

    goToPath = (path) =>{
        this.props.history.push(path);
    };

    signout = () =>{
        API.doLogout({"data":""}).then((status) =>{
            localStorage.removeItem('token');
            localStorage.removeItem('root');
            this.props.history.push('/login');
        }) ;

    };

    handleSignUp = (userdata) => {
        API.doSignUp(userdata)
            .then(res => {
                if (res.status == '201') {
                    this.setState({
                        isLoggedIn: false,
                        message: res.message
                    });
                    this.props.history.push("/login");
                } else if (res.status == '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: res.message
                    });
                }else if (res.status == '403') {
                    this.setState({
                        isLoggedIn: false,
                        message: res.message
                    });
                }
            });
    };

}

export default withRouter(NewerHomePage);