var React = require('react');
var DropDownManager = require('./DropDownManager')

var DropDownState = React.createClass({
  getInitialState: function() {
    return {
      ddOne: null,
      ddTwo: null,
      ddThree: null,
    }
  },
  handleDropDownOneChange: function(val) {
    return this.setState({ ddOne: val })
  },
  handleDropDownTwoChange: function(val) {
    return this.setState({ ddTwo: val })
  },
  handleDropDownThreeChange: function(val) {
    return this.setState({ ddThree: val })
  },
  render: function() {
    return (
      <div>
        <DropDownManager 
        ddOne={this.state.ddOne} handleDropDownOneChange={this.handleDropDownOneChange}
        ddTwo={this.state.ddTwo} handleDropDownTwoChange={this.handleDropDownTwoChange}
        ddThree={this.state.ddThree} handleDropDownThreeChange={this.handleDropDownThreeChange}/>
      </div>
      );
  }
});

module.exports = DropDownState;
