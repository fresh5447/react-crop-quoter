var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

var DropDownOneDisplay = React.createClass({
  getInitialState: function() {
    return {
      cityValue: null
    }
  },
  handleCityChange: function(event, index, value) {
    this.setState({cityValue: value})
    this.props.handleDropDownOneChange(this.state.cityValue);
  },
  render: function() {
    var cityItems = this.props.listItems.map(function(i){
      return <MenuItem value={i.key} key={i.key} primaryText={i.name}/>
    });

    return (
      <div className="container"> 
        <div className="row"> 
          <div className="col s4">
            <h5> county </h5>
            <SelectField maxHeight={300} onChange={this.handleCityChange} value={this.state.cityValue}>
              { cityItems }
            </SelectField>
          </div>
        </div>
      </div>
      )
  }
});

module.exports = DropDownOneDisplay;