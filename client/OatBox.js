
var React = require('react');
var ShowGrain = require('./ShowGrain');


var OatBox = React.createClass({
  getInitialState: function() {
    return {
      wheat: null,
      barley: null,
      showWhich: null,
      basicWheatKey: null,
      basicWheatVal: null,
      basicBarleyKey: null,
      basicBarleyVal: null,
      stateRate: null
    }
  },
  getGrainFromServer: function() {
    var self = this;
    $.ajax({
      url: '/api/finalLocation/' + this.props.urlKey,
      method: 'GET',
    }).done(function(data){
      self.setState({wheat: data[0].wheat});
      self.setState({basicWheatKey: data[0].wheat[0]["Basic"]});
      self.setState({barley: data[0].barley});
      self.setState({basicBarleyKey: data[0].barley[0]["Basic"]});
      self.getTopHalfWheat();
      self.getTopHalfBarley();
      self.getStateRates();
    })

  },
  getTopHalfWheat: function() {
    var self = this;
    $.ajax({
      url: '/api/oneTopHalf/' + this.state.basicWheatKey,
      method: 'GET',
    }).done(function(data){
      self.setState({ basicWheatVal: data });
    })
  },
  getTopHalfBarley: function() {
    var self = this;
    $.ajax({
      url: '/api/oneTopHalf/' + this.state.basicBarleyKey,
      method: 'GET',
    }).done(function(data){
      self.setState({ basicBarleyVal: data });
    })
  },
  componentDidMount: function() {
    this.getGrainFromServer();
  },
  getStateRates: function() {
    console.log("about to get state rates", this.props.selectedCityName)
    var self = this;
    $.ajax({
      url: '/api/oneStateRate/' + self.props.selectedCityName,
      method: 'GET'
    }).done(function(data){
      console.log("FOUND STATE RATE", data[0].cityValue)
      self.setState({stateRate: data[0].cityValue});
    })
  },
  showingGrain: function() {
    if(this.state.showWhich === 'wheat') {
      return this.state.basicWheatVal ? <ShowGrain stateRate={this.state.stateRate} name={ "wheat" } half_two={this.state.basicWheatVal[0].half_two} half_two_plus={this.state.basicWheatVal[0].half_two_plus} grain={ this.state.wheat }/> : null;
    } else if(this.state.showWhich === 'barley') {
      return this.state.basicBarleyVal ? <ShowGrain stateRate={this.state.stateRate} name={ "barley" } half_two={this.state.basicBarleyVal[0].half_two} half_two_plus={this.state.basicBarleyVal[0].half_two_plus}  grain={ this.state.barley }/> : null;
    } else {
      return null;
    }
  },
  toggleGrain: function(name) {
    return this.setState({showWhich: name})
  },
  render: function() {
    return (
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="btn-group center-stuff">
                  <button onClick={this.toggleGrain.bind(this, 'wheat')} type="button" className="btn btn-secondary-outline stn-btn "><h5>wheat</h5></button>
                  <button onClick={this.toggleGrain.bind(this, 'barley')} type="button" className="btn btn-secondary-outline stn-btn "><h5>barley</h5></button>
                </div>
              </div>
              <div className="row">
                { this.showingGrain() }
              </div>
            </div>
          </div>
      )
  }
});




module.exports = OatBox