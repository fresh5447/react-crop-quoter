var React = require('react');
var DropDownTwoDisplay = require('./DropDownTwoDisplay');

var DropDownTwoMaster = React.createClass({
  getInitialState: function() {
    return {
      listItems: null
    }
  },
  loadData: function(key) {
    //Key = { this.state.cty }
    var self = this;
    $.ajax({
      url: '/api/dropDownTwo/' + this.props.ddOne,
      method: 'GET'
    }).done(function(data){
      self.setState({listItems: data})
    })
  },
  componentDidMount: function() {
    this.loadData();
  },
  render: function() {
    return this.state.listItems ? <DropDownTwoDisplay listItems={ this.state.listItems } handleDropDownTwoChange={this.props.handleDropDownTwoChange}/> : null;
  }
});

module.exports = DropDownTwoMaster;