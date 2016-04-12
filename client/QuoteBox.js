var React = require('react');

var QuoteBox = React.createClass({
  render: function() {
    var cost = this.props.stateRate * 0.75;
    window.grain = this.props.grain;
    return (
      <div className="">
        <div className="container">
          <h3>Compare Quotes</h3>
          <h5> State </h5>
          <p>$75 per acre at State Rate of { this.props.stateRate } </p>
          <p> Would cost you ${ cost } per acre </p>
          <h5> Other Products </h5>
          <p> If you spent the same per acre you could get </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Loss</th>
                <th>State/Value*</th>
                <th>Basic</th>
                <th>Top 1/2 Comparison</th>
                <th> DDA </th>
                <th> XS20IP </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> <em> Liabiltiy Per/Acre </em> </td>
                <td> <em>  $75 </em>  </td>
                <td>  <em> $$$ { this.props.grain[0][Object.keys(grain[0])] } </em>  </td>
                <td>  <em> $$$ { this.props.topHalf } </em> </td>
                <td>  <em> $$$ { this.props.grain[2][Object.keys(grain[2])] } </em>  </td>
                <td> <em> $$$ { this.props.grain[5][Object.keys(grain[5])] } </em>  </td>
              </tr>
              <tr>
                <td>10%</td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
              </tr>
              <tr>
                <td>20%</td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
              </tr>
              <tr>
                <td>30%</td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
              </tr>
              <tr>
                <td>40%</td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
              </tr>
              <tr>
                <td>50%</td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
              </tr>
              <tr>
                <td>60%</td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
              </tr>
              <tr>
                <td>70%</td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
                <td> val </td>
              </tr>
              <tr>
                <td> <strong> Rates </strong> </td>
                <td> <strong> { this.props.stateRate } </strong> </td>
                <td> <strong> { this.props.grain[0][Object.keys(grain[0])] } </strong> </td>
                <td> <strong> { this.props.topHalf } </strong> </td>
                <td> <strong> { this.props.grain[2][Object.keys(grain[2])] } </strong> </td>
                <td> <strong> { this.props.grain[5][Object.keys(grain[5])] } </strong> </td>
              </tr>
            </tbody>
          </table>
          <div className="row">
                <p> <strong> $75 per acre is the Maximum you can buy of State Value </strong> </p>
                <p> <strong> Discounts available with Non-State Value Programs </strong> </p>
                <p> <em> Cash with application results  a 6% discount on premium</em> </p>
                <p> <em> Cash with application is due 7/1/11</em> </p>
              </div>
        </div>
      </div>
      )
  }
});

module.exports = QuoteBox;