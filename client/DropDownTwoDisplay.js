var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

var DropDownTwoDisplay = React.createClass({
  handleTwsChange: function(event, index, value) {
    this.props.handleDropDownOneChange(value);
  },
  render: function() {
    var twsItems = this.props.listItems.map(function(i){
      return <MenuItem value={i._id} key={i.twp} primaryText={i.twp}/>
    });

    return (
      <div className="container"> 
        <div className="row"> 
          <div className="col s4">
            <h5> township </h5>
            <SelectField maxHeight={300} onChange={this.handleTwsChange}>
              { twsItems }
            </SelectField>
          </div>
        </div>
      </div>
      )
  }
});

module.exports = DropDownTwoDisplay;