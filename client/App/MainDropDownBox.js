var React = require('React');
var One_Data = require('./One_Data');
var Two_Data = require('./Two_Data');
var Three_Data = require('./Three_Data');

var MainDropDownBox = React.createClass({
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
  updateTwoSelection: function(newVal) {
    this.setState({ twoSelection: newVal })
  },
  updateThreeSelection: function(newVal) {
    this.setState({threeSelection: newVal});
  },
  showTwo: function() {
    if(this.state.oneSelection) {
      console.log("trying to show drop down two")
      return <Two_Data updateTwoSelection={this.updateTwoSelection} urlKey={ this.state.oneSelection }/>
    } else {
      return null;
    }
  },
  showThree: function() {
    if(this.state.twoSelection) {
      console.log("trying to show drop down three")
      return <Three_Data updateThreeSelection={this.updateThreeSelection} keyOne={ this.state.oneSelection } keyTwo={ this.state.twoSelection }/>
    } else {
      return null;
    }
  },
  render: function() {
    return (
      <div>
        <One_Data updateOneSelection={ this.updateOneSelection } />
        { this.showTwo() }
        { this.showThree() }
      </div>
      )
  }
});

module.exports = MainDropDownBox;