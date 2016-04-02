var React = require('react');
var DropDownOne = require('./DropDownOne')

var Cty_Select_Data = React.createClass({
  getInitialState: function() {
    return {
      csData: null,
      selection: null,
    }
  },
  getCty_Select_Data: function() {
    var self = this;
    $.ajax({
      url: '/api/dropDownOne',
      method: 'Get',
    }).done(function(data){
      self.setState({ csData: data })
    })
  },
  onCityChange: function(event){
    console.log("changing", event.target.value )
  },
  componentDidMount: function(){
    this.getCty_Select_Data();
  },
  render:function() {
    return this.state.csData ? <DropDownOne onCityChange={this.onCityChange} csData={this.state.csData}/> : null
  }
});

module.exports = Cty_Select_Data;
