var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

var FarmerOptionsSelection = React.createClass({
  getInitialState: function() {
    return { 
      cityValue: null,
      townValue: null,
      rangeValue: null,
      };
  },
  handleSubmit: function(e) {
    console.log("button clicked")
    e.preventDefault();
    var city = this.state.cityValue;
    var town = this.state.townValue;
    var range = this.state.rangeValue;
    if(!city || !town || !range){
      return null
    }
    var locKey = city + town + range;
    this.props.getLocation(locKey);
  },
  handleCityChange: function(event, index, value) {
    return this.setState({cityValue: value})
  },
  handleTownChange: function(e) {
    return this.setState({townValue: e.target.value})
  },
  handleRangeChange: function(e) {
    return this.setState({rangeValue: e.target.value})
  },
  render: function() {
    var cityItems = this.props.cities.map(function(i){
      return <MenuItem value={i.key} key={'cities' + i._id} primaryText={i.name}/>
    });
    return (
      <div className="container">
      <h5> <span className="steps">select location </span></h5>
        <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-4">
            <h5> county </h5>
            <SelectField maxHeight={300} value={this.state.cityValue} onChange={this.handleCityChange}>
              {cityItems}
            </SelectField>
          </div>
          <div className="col-xs-4">
          <h5> township </h5>
          <input
            type="text"
            placeholder="005S"
            value={ this.state.townValue }
            onChange={ this.handleTownChange }/>
          </div>
          <div className="col-xs-4">
          <h5> range </h5>
          <input
            type="text"
            placeholder="009W"
            value={ this.state.rangeValue }
            onChange={ this.handleRangeChange }/>
          </div>
        </div>
        <div className="row">
          <button type="submit" className="btn btn-secondary">GO</button>
        </div>
        </form>
      </div>
      )
  }
});

module.exports = FarmerOptionsSelection;