var React = require('react');
var ReactDOM = require('react-dom');
var DropDownState = require('./DropDownState');

require('./stylesheets/main.scss');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <DropDownState />
      </div>
      );
  }
});

ReactDOM.render(
  <App />, document.getElementById('app')
);