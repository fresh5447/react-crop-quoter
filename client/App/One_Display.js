var React = require('react');
var One_Data = require('./One_Data');

function One_Display(props){
    var cityItems = props.csData.map(function(i){
      return <option value={ i.key } key={i.key}>{i.name}</option>
    });
    return (
      <div className="container myContainer">
      <form>
        <fieldset className="form-group">
          <label htmlFor="">County</label>
          <select onChange={ props.onSelectionChange } className="form-control">
            { cityItems }
          </select>
        </fieldset>
      </form>
      </div>
      )
  };

module.exports = One_Display;