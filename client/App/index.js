var React = require('react');
var ReactDOM = require('react-dom');
var DropDownBox = require('./DropDownBox');

require('../stylesheets/main.scss');


var App = React.createClass({
  render: function() {
    return (
      <div>
        <DropDownBox/>
      </div>
      );
  }
});

ReactDOM.render(
  <App />, document.getElementById('app')
);
