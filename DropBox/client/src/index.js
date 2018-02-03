import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import './public/scooter.css';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store=createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    </Provider>
    ,document.querySelector('#root'));
registerServiceWorker();
