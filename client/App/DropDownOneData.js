var React = require('react');
var DropDownOne = require('./DropDownOne')

var DropDownOneData = React.createClass({
  getInitialState: function() {
    return {
      data: null
    }
  },
  getCty_Select_Data: function() {
    var self = this;
    $.ajax({
      url: '/api/dropDownOne',
      method: 'Get',
    }).done(function(data){
      self.setState({ data: data })
    })
  },
  onSelectionChange: function(event){
    this.props.updateOneSelection(event.target.value);
  },
  componentDidMount: function(){
    this.getCty_Select_Data();
  },
  render: function() {
    return this.state.data ? <DropDownOne onSelectionChange={this.onSelectionChange} csData={this.state.data}/> : null
  }
});

module.exports = DropDownOneData;