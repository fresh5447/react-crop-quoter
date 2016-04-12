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
          <thead> <h3> rain & hail </h3> <p> { props.name } </p>
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
          <thead> <h3>  top half rates </h3> 
            <tr>
              <th> crop value 2.0 </th>
              <th>  crop value +2.0 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> { props.half_two } </td>
              <td> { props.half_two_plus } </td>
            </tr>
            
          </tbody>
        </table>
        <table className="table table-striped my-table">
          <thead> <h3> State Rate </h3>
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