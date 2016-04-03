var React = require('React');
var DropDownOneData = require('./DropDownOneData');

var DropDownBox = React.createClass({
  getInitialState: function() {
    return {
      oneSelection: null,
      twoSelection: null,
      threeSelection: null,
    }
  },
  updateOneSelection: function(newVal) {
    this.setState({ oneSelection: newVal })
  },
  showTwo: function() {
    if(this.state.oneSelection) {
      return <DropDownTwoData updateTwoSelection={this.updateTwoSelection} urlKey={ this.state.oneSelection }/>
    } else {
      return null;
    }
  },
  showThree: function() {
    if(this.state.oneSelection) {
      return <DropDownThreeData updateTwoSelection={this.updateTwoSelection} urlKey={ this.state.oneSelection }/>
    } else {
      return null;
    }
  },
  render: function() {
    return (
      <div>
        <DropDownOneData updateOneSelection={ this.updateOneSelection } />
      </div>
      )
  }
});

module.exports = DropDownBox;