var React = require('react');
var DropDownOneData = require('./DropDownTwoData');

function DropDownTwo(props){
    var cityItems = props.csData.map(function(i){
      return <option value={ i.rge } key={i._id}>{i.rge}</option>
    });
    return (
      <div className="container myContainer">
      <form>
        <fieldset className="form-group">
          <label htmlFor="">Range</label>
          <select onChange={ props.onSelectionChange } className="form-control">
            { cityItems }
          </select>
        </fieldset>
      </form>
      </div>
      )
  };

module.exports = DropDownTwo;