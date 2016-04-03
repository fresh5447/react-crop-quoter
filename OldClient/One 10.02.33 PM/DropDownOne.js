var React = require('react');


function DropDownOne(props){
    var cityItems = props.csData.map(function(i){
      return <option value={ i.key } key={i.key}>{i.name}</option>
    });
    return (
      <div className="container myContainer">
      <form>
        <fieldset className="form-group">
          <label htmlFor="exampleSelect1">County</label>
          <select onChange={ props.onSelectionChange } className="form-control">
            { cityItems }
          </select>
        </fieldset>
      </form>
      </div>
      )
  };

module.exports = DropDownOne;
