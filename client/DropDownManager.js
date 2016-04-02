var React = require('react');
var DropDownOneMaster = require('./DropDownOneMaster');
var DropDownTwoMaster = require('./DropDownTwoMaster');
var DropDownThreeMaster = require('./DropDownThreeMaster');


var DropDownManager = React.createClass({
  render: function() {
    return (
      <div>
        <DropDownOneMaster handleDropDownOneChange={this.props.handleDropDownOneChange}/>
        <DropDownTwoMaster ddOne={this.props.ddOne} handleDropDownTwoChange={this.props.handleDropDownTwoChange}/>
        <DropDownThreeMaster handleDropDownThreeChange={this.props.handleDropDownThreeChange}/>
      </div> 
      )
  }
});

module.exports = DropDownManager;



