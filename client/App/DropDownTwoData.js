var React = require('react');
var DropDownBox = require('./DropDownBox')

var DropDownTwoData = React.createClass({
  getInitialState: function() {
    return {
      data: null
    }
  },
  get_Select_Data: function() {
    var self = this;
    $.ajax({
      url: '/api/dropDownTwo/' + this.props.urlKey,
      method: 'Get',
    }).done(function(data){
      self.setState({ data: data })
    })
  },
  onSelectionChange: function(event){
    this.props.updateTwoSelection(event.target.value);
  },
  componentDidMount: function(){
    this.get_Select_Data();
  },
  render: function() {
    return this.state.csData ? <DropDownTwo onSelectionChange={this.onSelectionChange} csData={this.state.data}/> : null
  }
});

module.exports = DropDownTwoData;