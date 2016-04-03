var React = require('react');
var Three_Display = require('./Three_Display')

var Three_Data = React.createClass({
  getInitialState: function() {
    return {
      dataThree: null
    }
  },
  get_Select_Data: function() {
    console.log("About to get dd 3 data");
    var self = this;
    $.ajax({
      url: '/api/dropDownThree/' + this.props.keyOne + this.props.keyTwo,
      method: 'Get',
    }).done(function(data){
      console.log("got dd 3 data");
      self.setState({ dataThree: data })
    })
  },
  onSelectionChange: function(event){
    this.props.updateThreeSelection(event.target.value);
  },
  componentDidMount: function(){
    this.get_Select_Data();
  },
  render: function() {
    return this.state.dataThree ? <Three_Display onSelectionChange={this.onSelectionChange} csData={this.state.dataThree}/> : null
  }
});

module.exports = Three_Data;