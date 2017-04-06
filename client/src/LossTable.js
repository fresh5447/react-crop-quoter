import React, { PropTypes } from 'react'

const LossTable = (props) => {
  return (
    <table className="table table-striped my-table">
      <thead>
        <tr>
          <th>Loss</th>
          <th>State/Value*</th>
          <th>Basic</th>
          <th>Top Half</th>
          <th>DDA</th>
          <th>XS20IP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Liability Per/Acre</td>
          <td>$75</td>
          <td>{ "$"+((props.riskRate / props.baseRates.basic) * 100 ).toFixed(2) }</td>
          <td>{ "$"+((props.riskRate / props.top) * 100 ).toFixed(2) }</td>
          <td>{ "$"+((props.riskRate / props.baseRates.dda) * 100 ).toFixed(2) }</td>
          <td>{ "$"+((props.riskRate / props.baseRates.xs20ip) * 100 ).toFixed(2) }</td>
        </tr>
        <tr>
          <td> 10% </td>
          <td> { "$"+(75 * .10).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.basic) * 100 ) * .10).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.top) * 100 ) * .10).toFixed(2) } </td>
          <td> - </td>
          <td> - </td>
        </tr>
        <tr>
          <td> 20% </td>
          <td> { "$"+(75 * .20).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.basic) * 100 ) * .20).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.top) * 100 ) * .20).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.dda) * 100 ) * .20).toFixed(2) }</td>
          <td> - </td>
        </tr>
        <tr>
          <td> 30% </td>
          <td> { "$"+(75 * .30).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.basic) * 100 ) * .30).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.top) * 100 ) * .30).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.dda) * 100 ) * .30).toFixed(2) }</td>
          <td> { "$"+(((props.riskRate / props.baseRates.xs20ip) * 100 ) * .30).toFixed(2) } </td>
        </tr>
        <tr>
          <td> 40% </td>
          <td> { "$"+(75 * .40).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.basic) * 100 ) * .40).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.top) * 100 ) * .40).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.dda) * 100 ) * .40).toFixed(2) }</td>
          <td> { "$"+(((props.riskRate / props.baseRates.xs20ip) * 100 ) * .40).toFixed(2) } </td>
        </tr>
        <tr>
          <td> 50% </td>
          <td> { "$"+(75 * .50).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.basic) * 100 ) * .50).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.top) * 100 ) * .50).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.dda) * 100 ) * .50).toFixed(2) }</td>
          <td> { "$"+(((props.riskRate / props.baseRates.xs20ip) * 100 ) * .50).toFixed(2) } </td>
        </tr>
        <tr>
          <td> 60% </td>
          <td> { "$"+(75 * .60).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.basic) * 100 ) * .60).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.top) * 100 ) * .60).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.dda) * 100 ) * .60).toFixed(2) }</td>
          <td> { "$"+(((props.riskRate / props.baseRates.xs20ip) * 100 ) * .60).toFixed(2) } </td>
        </tr>
        <tr>
          <td> 70% </td>
          <td> { "$"+(75 * .70).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.basic) * 100 ) * .70).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.top) * 100 ) * .70).toFixed(2) } </td>
          <td> { "$"+(((props.riskRate / props.baseRates.dda) * 100 ) * .70).toFixed(2) }</td>
          <td> { "$"+(((props.riskRate / props.baseRates.xs20ip) * 100 ) * .70).toFixed(2) } </td>
        </tr>
        <tr>
          <td> <strong> Rates </strong> </td>
          <td> <strong> {props.sr} </strong> </td>
          <td> <strong> {props.baseRates.basic} </strong> </td>
          <td> <strong> {props.top}</strong> </td>
          <td> <strong> {props.baseRates.dda} </strong> </td>
          <td> <strong> {props.baseRates.xs20ip} </strong> </td>
        </tr>
      </tbody>
    </table>

  )
}

export default LossTable
