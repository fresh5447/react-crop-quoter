var React = require('react');
var Two_Data = require('./Two_Data');

function Two_Display(props){
    var twpItems = props.csData.map(function(i){
      if(i.twp){
        return <option value={ i.twp } key={i._id}>{i.twp}</option>
      }
    });
    return (
      <div className="container myContainer">
      <form>
        <fieldset className="form-group">
          <label htmlFor="">Township</label>
          <select onChange={ props.onSelectionChange } className="form-control">
            { twpItems }
          </select>
        </fieldset>
      </form>
      </div>
      )
  };

module.exports = Two_Display;