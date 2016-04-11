var React = require('react');

function ShowGrain(props){
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
          <thead> Rain & Hail 
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
              <th> Top Half Crop Value 2.0 </th>
              <th> Top Half Crop Value +2.0 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> { props.half_two } </td>
              <td> { props.half_two_plus } </td>
            </tr>
            
          </tbody>
        </table>
        <table className="table table-hover my-table">
          <thead>
            <tr>
              <th> State Rate</th>
            </tr>
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