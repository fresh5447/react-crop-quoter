var React = require('react');
var Cty_Select_Data = require('./Cty_Select_Data');
var Tws_Select_Data = require('./Tws_Select_Data');
var Cty_Select_Data = require('./Rge_Select_Data');

var SelectBoxManView = React.createClass({
  render: function() {
    return (
    <Cty_Select_Data />
    <Tws_Select_Data />
    <Reg_Select_Data />
      )
  }
});

module.exports = SelectBoxManView;