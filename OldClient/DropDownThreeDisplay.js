var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

var DropDownThreeDisplay = React.createClass({
  handleCityChange: function(event, index, value) {
    this.props.handleDropDownOneChange(value);
  },
  render: function() {
    var cityItems = this.props.listItems.map(function(i){
      return <MenuItem value={i.key} key={i.key} primaryText={i.name}/>
    });

    return (
      <div className="container"> 
        <div className="row"> 
          <div className="col s4">
            <h5> Range </h5>
            <SelectField maxHeight={300} onChange={this.handleCityChange}>
              { cityItems }
            </SelectField>
          </div>
        </div>
      </div>
      )
  }
});

module.exports = DropDownThreeDisplay;