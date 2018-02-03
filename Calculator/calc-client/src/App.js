import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Calculator from './components/calculator'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Calculator />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
