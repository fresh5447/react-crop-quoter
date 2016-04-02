var React = require('react');
var CityOneDropDown = require('./CityOneDropDown')

var Cty_Select_Data = createClass({
  getInitialState: function() {
    return {
      csData: null;
    }
  },
  getCty_Select_Data: function() {
    $.ajax({
      url: '/api/ctyData',/*TODO: GET ROUTE ONE */
      method: 'Get',
    }).done(function(data){
      self.setState({ csData: data })
    })
  },
  componentDidMount: function(){
    self.getCty_Select_Data();
    console.log("GOT IT", this.state.csData);
  }
  render:function() {
    return this.state.ctyData ? <CityOneDropDown data={this.state.csData}/> : null;
  }
});

module.exports = Cty_Select_Data;
