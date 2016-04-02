var React = require('react');
var ReactDOM = require('react-dom');
var DropDownOneBox = require('./One/DropDownOneBox');
var injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

require('../stylesheets/main.scss');


var AllDropDownBox = React.createClass({

  getInitialState: function() {
    return {
      urlKeyOne: null,
      urlKeyTwo: null,
    }
  },
  getUrlKey: function(urlKey) {
    this.setState({ urlKeyOne: urlKey })
    console.log(urlKey);
  },

  render: function() {
    return (
      <div>
        <DropDownOneBox getUrlKey={ this.getUrlKey }/>
      </div>
      );
  }
});

ReactDOM.render(
  <AllDropDownBox />, document.getElementById('app')
);
