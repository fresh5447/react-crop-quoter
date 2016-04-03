var React = require('react');

function DropDownTwo(props){
    console.log(props, 'props in dropdowntwo')
    var twpItems = props.csData ? props.csData.map(function(i){
      console.log(i)
      return <option value={ i.rge } key={i.rge}>{i.rge}</option>
    }) : null;
    return (
      <div className="container myContainer">
      <form>
        <h3> Township </h3>
        <fieldset className="form-group">
          <select onChange={ props.onSelectionChange } className="form-control">
            { twpItems }
          </select>
        </fieldset>
      </form>
      </div>
      )
  };

module.exports = DropDownTwo;
