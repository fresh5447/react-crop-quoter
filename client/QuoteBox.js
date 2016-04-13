var React = require('react');

var QuoteBox = React.createClass({
  showPrice: function(cost, rate){
    return console.log("COSTL", cost, "RATE:", rate)
  },
  render: function() {
    var dollars = 75;
    var cost = this.props.stateRate * 0.75;
    var costt = cost.toString().substr(0,4);
    var stateRate = this.props.stateRate;
    var basicRate = this.props.grain[0][Object.keys(this.props.grain[0])];
    var topHalf = this.props.topHalf;
    var dda = this.props.grain[2][Object.keys(this.props.grain[2])];
    var xs = this.props.grain[5][Object.keys(this.props.grain[5])];

    var outPutBasic = dollars * Number(stateRate)*.01
    var totalBasic = outPutBasic /  Number(basicRate)*.01
    var firstOne = totalBasic * 10000;

    var outPutTop = dollars * Number(stateRate)*.01
    var totalTop = outPutTop /  Number(topHalf)*.01
    var secondOne = totalTop * 10000;

    var outPutThird = dollars * Number(stateRate)*.01
    var totalThird = outPutThird /  Number(dda)*.01
    var thirdOne = totalThird * 10000;

    var outPutFourth = dollars * Number(stateRate)*.01
    var totalFourth = outPutFourth /  Number(xs)*.01
    var fourthOne = totalFourth * 10000;


    console.log("GRAIN", this.props.grain)
    return (
      <div className="">
        <div className="container">
          <h3>Rate Comparison</h3>
          <h5> State </h5> <p>$75 per acre at State Rate of { this.props.stateRate } Would cost you ${ costt } per acre </p>
          <h5> Other Products  at $75 </h5>
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
                <td> <em>  ${ dollars } </em>  </td>
                <td>  <em> ${ firstOne.toString().substr(0,5) } </em>  </td>
                <td>  <em> ${ secondOne.toString().substr(0,5) } </em> </td>
                <td>  <em> ${ thirdOne.toString().substr(0,5) } </em>  </td>
                <td> <em> ${ fourthOne.toString().substr(0,5) } </em>  </td>
              </tr>
              <tr>
                <td>10%</td>
                <td> ${dollars * .10} </td>
                <td> ${(firstOne * .10).toString().substr(0,4)} </td>
                <td> ${(secondOne * .10).toString().substr(0,4)} </td>
                <td> ${(thirdOne * .10).toString().substr(0,4)} </td>
                <td> ${(fourthOne * .10).toString().substr(0,4)} </td>
              </tr>
              <tr>
                <td>20%</td>
                <td> ${dollars * .20} </td>
                <td> ${(firstOne * .20).toString().substr(0,4)} </td>
                <td> ${(secondOne * .20).toString().substr(0,4)} </td>
                <td> ${(thirdOne * .20).toString().substr(0,4)} </td>
                <td> ${(fourthOne * .20).toString().substr(0,4)} </td>
              </tr>
              <tr>
                <td>30%</td>
                <td> ${dollars * .30} </td>
                <td> ${(firstOne * .30).toString().substr(0,4)} </td>
                <td> ${(secondOne * .30).toString().substr(0,4)} </td>
                <td> ${(thirdOne * .30).toString().substr(0,4)} </td>
                <td> ${(fourthOne * .30).toString().substr(0,4)} </td>
              </tr>
              <tr>
                <td>40%</td>
                <td> ${dollars * .40} </td>
                <td> ${(firstOne * .40).toString().substr(0,4)} </td>
                <td> ${(secondOne * .40).toString().substr(0,4)} </td>
                <td> ${(thirdOne * .40).toString().substr(0,4)} </td>
                <td> ${(fourthOne * .40).toString().substr(0,4)} </td>
              </tr>
              <tr>
                <td>50%</td>
                <td> ${dollars * .50} </td>
                <td> ${(firstOne * .50).toString().substr(0,4)} </td>
                <td> ${(secondOne * .50).toString().substr(0,4)} </td>
                <td> ${(thirdOne * .50).toString().substr(0,4)} </td>
                <td> ${(fourthOne * .50).toString().substr(0,4)} </td>
              </tr>
              <tr>
                <td>60%</td>
                <td> ${dollars * .60} </td>
                <td> ${(firstOne * .60).toString().substr(0,4)} </td>
                <td> ${(secondOne * .60).toString().substr(0,4)} </td>
                <td> ${(thirdOne * .60).toString().substr(0,4)} </td>
                <td> ${(fourthOne * .60).toString().substr(0,4)} </td>
              </tr>
              <tr>
                <td>70%</td>
                <td> ${dollars * .70} </td>
                <td> ${(firstOne * .70).toString().substr(0,4)} </td>
                <td> ${(secondOne * .70).toString().substr(0,4)} </td>
                <td> ${(thirdOne * .70).toString().substr(0,4)} </td>
                <td> ${(fourthOne * .70).toString().substr(0,4)} </td>
              </tr>
              <tr>
                <td> <strong> Rates </strong> </td>
                <td> <strong> { stateRate } </strong> </td>
                <td> <strong> { basicRate } </strong> </td>
                <td> <strong> { topHalf } </strong> </td>
                <td> <strong> { dda } </strong> </td>
                <td> <strong> { xs } </strong> </td>
              </tr>
            </tbody>
          </table>
          <div className="row">
                 <strong> <p> $75 per acre is the Maximum you can buy of State Value </p> </strong>
                 <strong> <p> Discounts available with Non-State Value Programs </p> </strong>
                 <em> <p> Cash with application results  a 6% discount on premium </p> </em>
                 <em> <p> Cash with application is due 7/1/11 </p> </em>
          </div>
        </div>
      </div>
      )
  }
});

module.exports = QuoteBox;