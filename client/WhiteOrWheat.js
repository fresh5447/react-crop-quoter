var React = require('react');

var StateHailResults = React.createClass({
  
})

var WhiteOrWheat = React.createClass({
  getInitialState: function() {
    return {
      showOat: null
    }
  },
  setOat: function(item) {
    this.setState({showOat: item})
  },
  showWheat: function() {
    return this.props.location.wheat.map(function(i){
      var name = Object.keys(i)
      return (
              <td>${ i[name] }</td>
            )
        })
  },
  showBarley: function() {
    return this.props.location.barley.map(function(i){
      var name = Object.keys(i)
      return (
              <td>${ i[name] }</td>
            )
        })
  },
  showOatsOrWhat: function() {
    if(this.state.showOat === 'wheat'){
      return this.showWheat();
    } else {
      return this.showBarley();
    }
  },
  render: function() {
    window.thing = this.props.location.wheat;
    var activeWheat = this.state.showOat ? this.state.showOat : 'wheat';
    return (
      <div className="container">
        <h5> <span className="steps">Wheat/Barley Prices For { this.props.location.locationKey } </span></h5>
        <button className="btn btn-secondary" onClick={this.setOat.bind(this, 'barley')}> Barley </button><button className="btn btn-secondary" onClick={this.setOat.bind(this, 'wheat')}> Wheat </button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Basic</th>
              <th>DXS5</th>
              <th>DDA</th>
              <th>DXS1</th>
              <th>DD20</th>
              <th>XS20IP</th>
              <th>80MIN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              { this.showOatsOrWhat() }
            </tr>
          </tbody>
        </table>

      </div>
      )
  }
});

module.exports = WhiteOrWheat;
