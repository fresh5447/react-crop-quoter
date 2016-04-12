var React = require('react');
var Two_Data = require('./Two_Data');

Array.prototype.stupidUnique = function() {
    return this.reduce(function(accum, current) {
        if (accum.indexOf(current) < 0) {
            accum.push(current);
        }
        return accum;
    }, []);
};

function Two_Display(props){
  var newArr = [];

  for (var i = 0; i < props.csData.length; i++) {
    newArr.push(props.csData[i].twp);
  };

  var upD = newArr.stupidUnique();

  upD.unshift("-Select-");

  var twpItems = upD.map(function(i){
      return <option value={ i } key={i}>{i}</option>
    });
    return (
            <div className="jumbotron">
              <div className="container">
                  <form>
                    <fieldset className="form-group">
                      <label htmlFor="">township</label>
                      <select onChange={ props.onSelectionChange } className="form-control">
                        { twpItems }
                      </select>
                    </fieldset>
                  </form>
              </div>
            </div>
      )
  };

module.exports = Two_Display;



