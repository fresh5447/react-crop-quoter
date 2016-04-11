
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
    }
  },
  getGrainFromServer: function() {
    console.log("GETTING GRAIN FROM SERVER")
    var self = this;
    $.ajax({
      url: '/api/finalLocation/' + this.props.urlKey,
      method: 'GET',
    }).done(function(data){
      self.setState({wheat: data[0].wheat});
      self.setState({basicWheatKey: data[0].wheat[0]["Basic"]});
      console.log("SETTING STATE FOR BASIC WHEAT KEY", data[0].wheat[0]["Basic"])
      self.setState({barley: data[0].barley});
      self.setState({basicBarleyKey: data[0].barley[0]["Basic"]});
      self.getTopHalfWheat();
      self.getTopHalfBarley();
    })

  },
  getTopHalfWheat: function() {
    console.log("GETTING TOP HALF FOR WHEAT")
    var self = this;
    $.ajax({
      url: '/api/oneTopHalf/' + this.state.basicWheatKey,
      method: 'GET',
    }).done(function(data){
      console.log("FOUND TOP HALF FOR WHEAT", data);
      self.setState({ basicWheatVal: data });
    })
  },
  getTopHalfBarley: function() {
    var self = this;
    $.ajax({
      url: '/api/oneTopHalf/' + this.state.basicBarleyKey,
      method: 'GET',
    }).done(function(data){
      console.log("FOUND TOP HALF FOR Barley", data);
      self.setState({ basicBarleyVal: data });
    })
  },
  componentDidMount: function() {
    this.getGrainFromServer()
  },
  showingGrain: function() {
    if(this.state.showWhich === 'wheat') {
      console.log(this.state.basicWheatVal[0].half_two, "FIRST VAL");
      console.log(this.state.basicWheatVal.half_two, "SECOND VAL");

      return this.state.basicWheatVal ? <ShowGrain name={ "Wheat" } half_two={this.state.basicWheatVal[0].half_two} half_two_plus={this.state.basicWheatVal[0].half_two_plus} grain={ this.state.wheat }/> : null;
    } else if(this.state.showWhich === 'barley') {
      return this.state.basicBarleyVal ? <ShowGrain name={ "barley" } half_two={this.state.basicBarleyVal[0].half_two} half_two_plus={this.state.basicBarleyVal[0].half_two_plus}  grain={ this.state.barley }/> : null;
    } else {
      return null;
    }
  },
  toggleGrain: function(name) {
    return this.setState({showWhich: name})
  },
  render: function() {
    return (
        <div className="container">
          <div className="btn-group">
            <button onClick={this.toggleGrain.bind(this, 'wheat')} type="button" className="btn btn-secondary-outline">Wheat</button>
            <button onClick={this.toggleGrain.bind(this, 'barley')} type="button" className="btn btn-secondary-outline">Barley</button>
            { this.showingGrain() }
          </div>
        </div>
      )
  }
});

module.exports = OatBox