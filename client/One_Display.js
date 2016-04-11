var React = require('react');

function One_Display(props){
    props.csData.unshift({
        "key" : "0000",
        "name" : "-Select County-"
    });
    var cityItems = props.csData.map(function(i){
      return <option value={ i.key + i.name} key={i.key}>{i.name}</option>
    });
    return (
        <div className="jumbotron my-jumbo">
          <div className="container">
            <h1>crop quoter</h1>
            <p>wheat & barley</p>
            <form>
              <fieldset className="form-group">
                <label htmlFor="">Select County</label>
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



