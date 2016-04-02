var React = require('react');
var DropDownOneDisplay = require('./DropDownOneDisplay');

var DropDownOneMaster = React.createClass({
  getInitialState: function() {
    return {
      listItems: null
    }
  },
  loadData: function() {
    var self = this;
    $.ajax({
      url: '/api/dropDownOne',
      method: 'GET'
    }).done(function(data){
      self.setState({listItems: data})
    })
  },
  componentDidMount: function() {
    this.loadData();
  },
  render: function() {
    return this.state.listItems ? <DropDownOneDisplay listItems={ this.state.listItems } handleDropDownOneChange={this.props.handleDropDownOneChange}/> : null;
  }
});
 
module.exports = DropDownOneMaster;