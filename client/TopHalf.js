var React = require('react');

function TopHalf(props){
  var tableHeads = props.grain.map(function(item){
    return <th> { Object.keys(item) } </th>
  });
  var tableBody = props.grain.map(function(item){
    var arKey = Object.keys(item);
    console.log(arKey);
    return <td> { item[arKey] } </td>
  });
    return (
      <div className="container myContainer">
        <table className="table table-hover">
          <thead> Top Half based on Basic Of: Basic Here
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
      </div>
      )
  };

module.exports = ShowGrain;