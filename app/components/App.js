import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Battle from './Battle';
import Home from './Home';
import Nav from './Nav';
import Popular from './Popular';
import Results from './Results';
/*
  Component parts:
    (1) state (optional)
    (2) lifecycle methods/events (optional)
    (3) UI (required)
*/

class App extends Component {
  render() {
    /*
      return code is compiled by Babel into vanilla JS as:
        React.createElement("div", null, "Hello World!"")
    */
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
