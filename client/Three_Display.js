var React = require('react');
var Three_Data = require('./Three_Data');

function Three_Display(props){
    props.csData.unshift({
        "_id" : "000dfasfa0",
        "rge" : "-Select Range-"
    });

    var rgeItems = props.csData.map(function(i){
      return <option value={ i.rge } key={i._id}>{i.rge}</option>
    });
    return (
            <div className="jumbotron">
              <div className="container">
                <h1>range</h1>
                  <form>
                    <fieldset className="form-group">
                      <select onChange={ props.onSelectionChange } className="form-control">
                        { rgeItems }
                      </select>
                    </fieldset>
                  </form>
              </div>
            </div>
      )
  };

module.exports = Three_Display;