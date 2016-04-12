var React = require('react');

function One_Display(props){
    props.csData.unshift({
        "key" : "0000",
        "name" : "-Select-"
    });
    var cityItems = props.csData.map(function(i){
      return <option value={ i.key + i.name} key={i.key}>{i.name}</option>
    });
    return (
        <div className="jumbotron my-jumbo">
          <div className="container ">
          <div>
            <h1 className="oat-btns center-stuff">crop quoter</h1>
          </div>

            <form>
              <fieldset className="form-group">
                <label htmlFor="">county</label>
                <select onChange={ props.onSelectionChange } id="valOfCounty" className="form-control">
                  { cityItems }
                </select>
              </fieldset>
            </form>
          </div>
        </div>
      )
  };

module.exports = One_Display;



