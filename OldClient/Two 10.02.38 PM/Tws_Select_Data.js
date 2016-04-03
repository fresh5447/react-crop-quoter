var React = require('react');
var DropDownTwo = require('./DropDownTwo');

var Tws_Select_Data = React.createClass({
  onSelectionChange: function(event){
    console.log("FOUND ON SELECTION", event.target.value);
  },
  render:function() {
    return <DropDownTwo onSelectionChange={this.onSelectionChange} csData={this.props.moreData}/>;
  }
});

module.exports = Tws_Select_Data;
