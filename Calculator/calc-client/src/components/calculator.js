import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/calcAPI';
import Calc from "./calc";
import Message from "./Message";

class Calculator extends Component {

    state = {
        answer: ''
    };

    handleSubmit = (calcdata) => {
        console.log("Data"+JSON.stringify(calcdata));
        if(calcdata.operation==='+'){
            API.doAdd(calcdata)
                .then(res => {
                    this.setState({
                        answer:res.message
                    });
                });
        }else if(calcdata.operation==='-'){
            API.doSub(calcdata)
                .then(res => {
                    this.setState({
                        answer:res.message
                    });
                });
        }else if(calcdata.operation==='*'){
            API.doMult(calcdata)
                .then(res => {
                    this.setState({
                        answer:res.message
                    });
                });
        }else  if(calcdata.operation==='/'){
            API.doDiv(calcdata)
                .then(res => {
                    this.setState({
                        answer:res.message
                    });
                });
        }
    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <Calc handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.answer}/>
                    </div>
                )}/>

            </div>
        );
    }
}

export default withRouter(Calculator);