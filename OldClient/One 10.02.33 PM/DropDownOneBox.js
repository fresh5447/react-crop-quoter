var React = require('react');
var Cty_Select_Data = require('./Cty_Select_Data');

var DropDownOneBox = React.createClass({
  render: function() {
    return <Cty_Select_Data getTws_Select_Data={ this.props.getTws_Select_Data } getUrlOneKey={this.props.getUrlOneKey}/>
  }
});

module.exports = DropDownOneBox;