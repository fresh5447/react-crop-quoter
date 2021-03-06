var React = require('react');
var One_Data = require('./One_Data');
var Two_Data = require('./Two_Data');
var Three_Data = require('./Three_Data');
var OatBox = require('./Oatbox');

var MainDropDownBox = React.createClass({
  getInitialState: function() {
    return {
      oneSelection: null,
      twoSelection: null,
      threeSelection: null,
      selectedCityName: null,
    }
  },
  updateOneSelection: function(valOne, valTwo) {
    this.setState({ oneSelection: valOne })
    this.setState({ selectedCityName: valTwo })
    console.log("success in setting selectedCityName", valTwo);
  },
  updateTwoSelection: function(newVal) {
    this.setState({ twoSelection: newVal })
  },
  updateThreeSelection: function(newVal) {
    this.setState({threeSelection: newVal});
  },
  showTwo: function() {
    if(this.state.oneSelection) {
      return <Two_Data updateTwoSelection={this.updateTwoSelection} urlKey={ this.state.oneSelection }/>
    } else {
      return null;
    }
  },
  showThree: function() {
    if(this.state.twoSelection) {
      return <Three_Data updateThreeSelection={this.updateThreeSelection} keyOne={ this.state.oneSelection } keyTwo={ this.state.twoSelection }/>
    } else {
      return null;
    }
  },
  showOatBox: function() {
    if(this.state.threeSelection) {
      var urlKey = this.state.oneSelection + this.state.twoSelection + this.state.threeSelection;
      return <OatBox urlKey={urlKey} selectedCityName={this.state.selectedCityName}/>
    }
  },
  resetQuote: function(){
    window.location = '/'
  },
  render: function() {
    var resetBtn = this.state.oneSelection ? <button onClick={this.resetQuote.bind(this)} type="button" className="btn btn-secondary-outline my-reset-btn stn-btn center-block">reset</button> : null;
    return (
      <div className="row">
      { resetBtn }
        <One_Data updateOneSelection={ this.updateOneSelection } />
        { this.showTwo() }
        { this.showThree() }
        { this.showOatBox() }
      </div>
      )
  }
});

module.exports = MainDropDownBox;