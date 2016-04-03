var React = require('react');
var DropDownThreeDisplay = require('./DropDownThreeDisplay');

var DropDownThreeMaster = React.createClass({
  getInitialState: function() {
    return {
      listItems: null
    }
  },
  loadData: function(key) {
    //Key = {this.state.cty}
    var self = this;
    $.ajax({
      url: '/api/dropDownTwo/' + key,
      method: 'GET'
    }).done(function(data){
      self.setState({listItems: data})
    })
  },
  componentDidMount: function() {
    this.loadData();
  },
  render: function() {
    return this.state.listItems ? <DropDownThreeDisplay listItems={ this.state.listItems } handleDropDownThreeChange={this.props.handleDropDownThreeChange}/> : null;
  }
});

module.exports = DropDownThreeMaster;