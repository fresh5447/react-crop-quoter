var React = require('react');
var DropDownOne = require('./DropDownOne')

var Cty_Select_Data = React.createClass({
  getInitialState: function() {
    return {
      csData: null
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
  onSelectionChange: function(event){
    this.props.getUrlOneKey(event.target.value);
    this.props.getTws_Select_Data(event.target.value);
  },
  componentDidMount: function(){
    this.getCty_Select_Data();
  },
  render:function() {
    return this.state.csData ? <DropDownOne onSelectionChange={this.onSelectionChange} csData={this.state.csData}/> : null
  }
});

module.exports = Cty_Select_Data;
