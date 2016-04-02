var React = require('react');
var Cty_Select_Data = require('./Cty_Select_Data');

var DropDownOneBox = React.createClass({
  render: function() {
    return <Cty_Select_Data getUrlKey={this.props.getUrlKey}/>
  }
});

module.exports = DropDownOneBox;