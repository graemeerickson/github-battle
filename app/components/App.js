const React = require('react');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Nav = require('./Nav');
/*
  Component parts:
    (1) state (optional)
    (2) lifecycle methods/events (optional)
    (3) UI (required)
*/

class App extends React.Component {
  render() {
    /*
      return code is compiled by Babel into vanilla JS as:
        React.createElement("div", null, "Hello World!"")
    */
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    )
  }
}

module.exports = App;