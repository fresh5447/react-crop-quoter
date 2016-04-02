var React = require('react');
var ReactDOM = require('react-dom');
var DropDownState = require('./DropDownState');
var injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

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
