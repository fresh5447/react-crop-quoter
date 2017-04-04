import React from 'react';

const BasicRatesTable = (props) => {
  return (
    <div className="App">
      <div className="App">
        <h3> Here's your {props.title} options </h3>
        <table className="my-table">
          <thead>
            <tr>
              <th>Basic</th>
              <th>DXS5</th>
              <th>DDA</th>
              <th>DXS10</th>
              <th>DD20</th>
              <th>XS20IP</th>
              <th>80MIN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ props.items.basic.toFixed(2) }</td>
              <td>{ props.items.dxs5.toFixed(2) }</td>
              <td>{ props.items.dda.toFixed(2) }</td>
              <td>{ props.items.dxs10.toFixed(2) }</td>
              <td>{ props.items.dd20.toFixed(2) }</td>
              <td>{ props.items.xs20ip.toFixed(2) }</td>
              <td>{ props.items.eightyMin.toFixed(2) }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BasicRatesTable;
