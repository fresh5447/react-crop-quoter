var React = require('react');
var ReactDOM = require('react-dom');
var MainDropDownBox = require('./MainDropDownBox');

require('./stylesheets/main.scss');


// make drop down one with options for top half rolls through cities

// drop down two filter where keys match.. map through cells

// drop down three filter where cells match and show

var MainApp = React.createClass({
  getInitialState: function(){
    return {
      cities: null,
      baseData: null,
      topHalfData: null,
    }
  },
  componentDidMount: function(){
    this.loadBase();
  },
  loadBase: function() {
    fetch('/api/v2/basic')
      .then(d => console.table(d))
  },
  render: function() {
    return (
      <div>
        <h1> Hello world! </h1>
      </div>
      );
  }
});

ReactDOM.render(
  <MainApp />, document.getElementById('app')
);
