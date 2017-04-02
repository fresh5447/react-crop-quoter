var React = require('react');


function ShowGrain(props){
  var arrOfGrains = [];
  window.arG = arrOfGrains;
  var tableHeads = props.grain.map(function(item){
    return <th> { Object.keys(item) } </th>
  });
  var tableBody = props.grain.map(function(item){
    var arKey = Object.keys(item);
    arrOfGrains.push( item[arKey] )
    return <td> { item[arKey] } </td>
  });
    return (
      <div className="container myContainer">
        <table className="table table-striped my-table">
          <thead> <h5> { props.name }</h5><h5> Private Rates</h5>
            <tr>
              { tableHeads }
            </tr>
          </thead>
          <tbody>
            <tr>
              { tableBody }
            </tr>

          </tbody>
        </table>
        <table className="table table-striped my-table">
          <thead> <h5>  Top Half Companion Rates </h5> 
            <tr>
              <th> Top Half </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> { props.half_two } </td>
            </tr>
            
          </tbody>
        </table>
        <table className="table table-striped my-table">
          <thead> <h5> State Hail Rate (from private or State of MT) </h5>
          </thead>
          <tbody>
            <tr>
              <td> { props.stateRate } </td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  };

module.exports = ShowGrain;