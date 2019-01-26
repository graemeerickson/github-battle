const React = require('react');
const Popular = require('./Popular');
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
      <div className='container'>
        <Popular />
      </div>
    )
  }
}

module.exports = App;