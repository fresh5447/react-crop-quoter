var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

var DropDownOne = React.createClass({
  onMyChange: function(thing){
    console.log("changing",thing )
  },
  render: function() {
    var self = this;
    var cityItems = this.props.csData.map(function(i){
      return <MenuItem onChange={self.onMyChange.bind(null, i.key)} value={i.key} key={i.key} primaryText={i.name}/>
    });
    return (
      <div className="container"> 
        <div className="row"> 
          <div className="col s4">
            <h5> county </h5>
            <SelectField maxHeight={300} >
              { cityItems }
            </SelectField>
          </div>
        </div>
      </div>
      )
  }
});

module.exports = DropDownOne;