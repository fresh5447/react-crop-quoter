var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

var FarmerOptionsSelection = React.createClass({
  getInitialState: function() {
    return { 
      cityValue: '',
      townValue: '',
      rangeValue: '',
      locKey: '',
      currentLoc: '',
      locations: ''
      };
  },
  getLocKey: function() {
    var city = this.state.cityValue;
    var town = this.state.townValue;
    var range = this.state.rangeValue;
    if(!city || !town || !range){
      return null
    }
    var locKey = city + town + range;
    return locKey
  },
  handleCityChange: function(event, index, value) {
    return this.setState({cityValue: value})
  },
  handleTownChange: function(event, index, value) {
    return this.setState({townValue: value})
  },
  handleRangeChange: function(event, index, value) {
    return this.setState({rangeValue: value})
  },
  render: function() {
    var cityItems = this.props.cities.map(function(i){
      return <MenuItem value={i.key} key={'cities' + i._id} primaryText={i.name}/>
    });
    var townShipItems = this.props.locations.map(function(i){
      return <MenuItem value={i.twp} key={'townships_' + i._id} primaryText={i.twp}/>
    });
    var rangeItems = this.props.locations.map(function(i){
      return <MenuItem value={i.rge} key={'range' + i._id} primaryText={i.rge}/>
    });
    return (
      <div className="container"> 
        <div className="row"> 
          <div className="col-xs-4">
            <h5> county </h5>
            <SelectField maxHeight={300} value={this.state.cityValue} onChange={this.handleCityChange}>
              {cityItems}
            </SelectField>
          </div>
          <div className="col-xs-4">
            <h5> township </h5>
            <SelectField  value={this.state.townValue} onChange={this.handleTownChange}>
              {townShipItems}
            </SelectField>
          </div>
          <div className="col-xs-4">
            <h5>range </h5>
            <SelectField  value={this.state.rangeValue} onChange={this.handleRangeChange}>
              {rangeItems}
            </SelectField>
          </div>
        </div>
        <div>
          <h5> finalize </h5>
          <button onClick={this.props.getLocation}> GO </button>
        </div>
      </div>
      )
  }
});

module.exports = FarmerOptionsSelection;