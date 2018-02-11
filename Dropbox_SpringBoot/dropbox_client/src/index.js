import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import store from './store/index';

// optional cofiguration
const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }
class Root extends Component  {
render () {
        return (
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Root />
     </Provider>,
     document.getElementById('root'));



      
     
      
     