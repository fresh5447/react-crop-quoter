var React = require('react');

function ShowGrain(props){
  console.log("BASIC VALUS FOR TOP INSIDE SHOW GRAIN", props.half_two);
  var tableHeads = props.grain.map(function(item){
    return <th> { Object.keys(item) } </th>
  });
  var tableBody = props.grain.map(function(item){
    var arKey = Object.keys(item);
    return <td> { item[arKey] } </td>
  });
    return (
      <div className="container myContainer">
        <table className="table table-hover my-table">
          <thead> 
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
        <table className="table table-hover my-table">
          <thead> Top Half Rates
            <tr>
              <th> Crop Value 2.0 </th>
              <th> Crop Value +2.0 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> { props.half_two } </td>
              <td> { props.half_two_plus } </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      )
  };

module.exports = ShowGrain;