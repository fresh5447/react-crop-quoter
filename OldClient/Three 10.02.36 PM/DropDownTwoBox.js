var React = require('react');
var Tws_Select_Data = require('./Tws_Select_Data');

var DropDownTwoBox = React.createClass({
  render: function() {
    return <Tws_Select_Data moreData={this.props.moreData} urlKeyOne={this.props.urlKeyOne}/>
  }
});

module.exports = DropDownTwoBox;