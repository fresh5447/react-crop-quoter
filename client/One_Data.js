var React = require('react');
var One_Display = require('./One_Display');

var One_Data = React.createClass({
  getInitialState: function() {
    return {
      dataOne: null
    }
  },
  getCty_Select_Data: function() {
    var self = this;
    $.ajax({
      url: '/api/dropDownOne',
      method: 'Get',
    }).done(function(data){
      self.setState({ dataOne: data })
    })
  },
  onSelectionChange: function(event){
    var cityKey = event.target.value.substr(0,3);
    var cityName = event.target.value.substr(3);
    this.props.updateOneSelection(cityKey, cityName);
  },
  componentDidMount: function(){
    this.getCty_Select_Data();
  },
  render: function() {
    return this.state.dataOne ? <One_Display onSelectionChange={this.onSelectionChange} csData={this.state.dataOne}/> : null
  }
});

module.exports = One_Data;