import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './components/index';
import Home from './components/home';
import Activitylog from './components/activitylog';
import Profile from './components/profile';

class App extends Component {
  render() {
    return(
      <Router>
            <div>
                <Route exact path="/" component={Index}/>
                <Route  path="/home" component={Home}/>
                <Route path="/signin" component={Index} />
                <Route path="/activitylog" component={Activitylog} />
                <Route path="/profile" component={Profile} />
            </div>
        </Router>
    )
  }
}

export default App;

