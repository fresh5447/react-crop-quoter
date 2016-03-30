var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Slider = require('./Slider');
var FarmerOptionsSelection  = require('./FarmerOptionsSelection');
var StateOptions = require('./StateOptions');
var SelectTownShip = require('./SelectTownShip');
var WhiteOrWheat = require('./WhiteOrWheat');

injectTapEventPlugin();

var Loader = React.createClass({
  render: function() {
    return (
      <div>
        Loading.....
      </div>
      )
  }
});
var App = React.createClass({
  getInitialState: function() {
    return {
      cities: null,
      locations: null,
      selectedLocation: null,
      showSelection: false,
    }
  },
  getCities: function() {
    var self = this;
    $.ajax({
      url: '/api/cities',
      method: 'GET'
    }).done(function(data){
      self.setState({cities: data})
    })
  },
  getLocation: function(key) {
    console.log("setting location")
    var self = this;
    $.ajax({
      url: '/api/locationkey/' + key,
      method: 'GET'
    }).done(function(data){
      self.setState({selectedLocation: data})
      self.setState({showSelection: true})
    })
  },
  getLocations: function() {
    var self = this;
    var self = this;
    $.ajax({
      url: '/api/locations',
      method: 'GET'
    }).done(function(data){
      self.setState({locations: data})
    })
  },
  showStepTwo: function() {
    if(this.state.showSelection){
      return <WhiteOrWheat location={this.state.selectedLocation[0]}/>
    }
  },
  componentDidMount: function() {
    this.getCities();
  },
  render: function(){
    if(!this.state.cities) {
      return <Loader/>
    } else {
    return (
      <div>
        <FarmerOptionsSelection getLocation={this.getLocation}  cities={this.state.cities} locations={this.state.locations}/>
        { this.showStepTwo() }
      </div>
      )      
    }

  }
})


ReactDOM.render(<App/>, document.getElementById('app'));