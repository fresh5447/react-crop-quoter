import React, { PropTypes, Component } from 'react'

class LossTable extends Component {
  rates = {
    state: ( 75 ).toFixed(2),
    basic: ((this.props.riskRate / this.props.baseRates.basic) * 100 ).toFixed(2),
    topHalf: ((this.props.riskRate / this.props.top) * 100 ).toFixed(2),
    dda: ((this.props.riskRate / this.props.baseRates.dda) * 100 ).toFixed(2),
    xsip: ((this.props.riskRate / this.props.baseRates.xs20ip) * 100 ).toFixed(2)

  }
  showRow10() {
    var one = (this.rates.state * .10)
    var two = (this.rates.basic * .10).toFixed(2);
    var three = (this.rates.topHalf * .10).toFixed(2);
    var rates = [one, two, three ];
    var maxxx = Math.max(one, two, three);
    return (
      <tr>
        <td> 10% </td>
        { rates.map(item => {
          if(item == maxxx){
            return <td className="max">{ `$${item}` }</td>
          } else {
            return <td>{ `$${item}` }</td>
          }
        }) }
        <td> - </td>
        <td> - </td>
      </tr>
    )
  }
  showRow20() {
    var one = (this.rates.state * .20)
    var two = (this.rates.basic * .20).toFixed(2);
    var three = (this.rates.topHalf * .20).toFixed(2);
    var four = (this.rates.dda * .20).toFixed(2);
    var rates = [one, two, three, four ];
    var maxxx = Math.max(one, two, three, four);
    return (
      <tr>
        <td> 20% </td>
        { rates.map(item => {
          if(item == maxxx){
            return <td className="max">{ `$${item}` }</td>
          } else {
            return <td>{ `$${item}` }</td>
          }
        }) }
        <td> - </td>
      </tr>
    )
  }
  showDynamicRow(n) {
    var one = (this.rates.state * n).toFixed(2)
    var two = (this.rates.basic * n).toFixed(2);
    var three = (this.rates.topHalf * n).toFixed(2);
    var four = (this.rates.topHalf * n).toFixed(2);
    var five = (this.rates.topHalf * n).toFixed(2);
    var rates = [one, two, three, four, five ];
    var maxxx = Math.max(one, two, three, four, five);
    return (
      <tr>
        <td> { n * 100 }% </td>
        { rates.map(item => {
          if(item == maxxx){
            return <td className="max">{ `$${item}` }</td>
          } else {
            return <td>{ `$${item}` }</td>
          }
        }) }
      </tr>
    )
  }
  render() {
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
            <td>{ "$"+ this.rates.state }</td>
            <td>{ "$"+ this.rates.basic }</td>
            <td>{ "$"+ this.rates.topHalf }</td>
            <td>{ "$"+ this.rates.dda }</td>
            <td>{ "$"+ this.rates.xsip }</td>
          </tr>
          { this.showRow10() }
          { this.showRow20() }
          { this.showDynamicRow(.30) }
          { this.showDynamicRow(.40) }
          { this.showDynamicRow(.50) }
          { this.showDynamicRow(.60) }
          { this.showDynamicRow(.70) }
          <tr>
            <td> <strong> Rates </strong> </td>
            <td> <strong> {this.props.sr} </strong> </td>
            <td> <strong> {this.props.baseRates.basic} </strong> </td>
            <td> <strong> {this.props.top}</strong> </td>
            <td> <strong> {this.props.baseRates.dda} </strong> </td>
            <td> <strong> {this.props.baseRates.xs20ip} </strong> </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default LossTable
