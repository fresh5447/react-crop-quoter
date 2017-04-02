var React = require('react');

var QuoteBox = React.createClass({
  showPrice: function(cost, rate){
    return console.log("COSTL", cost, "RATE:", rate)
  },
  getValForLiability: function(product, rate){
    if(product === 'state'){
      return 75.00
    } else {
      var cpa = 75 * this.props.stateRate;
      var total = cpa / rate;
      return total.toFixed(2)
    }
  },
  getLiability: function(product, rate){
    if(product === 'state'){
      return 75 
    } else {
      var cpa = 75 * this.props.stateRate;
      var total = cpa / rate;
      return total 
    }
  },
  getLossValue: function(productValue, percent){
    var tots = productValue * percent
    return tots
  },
  showRowOne: function(one, two, three, four, five){
    var arrOfValues = [one, two, three, four, five];
    var maxxx = Math.max(one, two, three, four, five); 
    var mappedVals = arrOfValues.map(function(item){
      if(item == maxxx){
        return <td> <em> ${ item.toFixed(2) }  </em>  </td>
      } else {
        return <td> <em> ${ item.toFixed(2) }  </em>  </td>  
      }
    });
    return (
              <tr className="my-table">
                <td> <em> Liabiltiy Per/Acre </em> </td>
                { mappedVals }
              </tr>
      )
  },
  showRowTwo: function(one, two, three){
    console.log(one, two, three)
    var arrOfValuess = [one, two, three];
    var maxxxs = Math.max(one, two, three);
    var mappedVals = arrOfValuess.map(function(item){
      if(item == maxxxs){
        return <td className="maximum-effort">${ item.toFixed(2) } </td>
      } else {
        return <td>${ item.toFixed(2) } </td>  
      }
    });
    return mappedVals
  },
  showRowThree: function(one, two, three, four){
    console.log(one, two, three, four)
    var arrOfValuess = [one, two, three, four];
    var maxxxs = Math.max(one, two, three, four);
    var mappedVals = arrOfValuess.map(function(item){
      if(item == maxxxs){
        return <td className="maximum-effort"> ${ item.toFixed(2) } </td>
      } else {
        return <td>${ item.toFixed(2) } </td>  
      }
    });
    return mappedVals
  },
  showRest: function(one, two, three, four, five){
    console.log(one, two, three, four, five)
    var arrOfValuess = [one, two, three, four, five];
    var maxxxs = Math.max(one, two, three, four, five);
    var mappedVals = arrOfValuess.map(function(item){
      if(item == maxxxs){
        return <td className="maximum-effort">${ item.toFixed(2)} </td>
      } else {
        return <td>${ item.toFixed(2) } </td>  
      }
    });
    return mappedVals
  },
  getEmail: function(){
          console.log("CLICKED");
          var person = prompt("Please enter your email");
          if (!person) {
            return
          } else {
            console.log(person)
          }
  },
  render: function() {

    var cost = this.props.stateRate * 0.75;
    var costt = cost.toString().substr(0,4);

    var stateRate = this.props.stateRate;
    var basicRate = this.props.grain[0][Object.keys(this.props.grain[0])];
    var topHalf = this.props.topHalf;
    var dda = this.props.grain[2][Object.keys(this.props.grain[2])];
    var xs = this.props.grain[5][Object.keys(this.props.grain[5])];


    return (
      <div className="">
        <div className="container">
        <p>
          <button className="btn btn-primary style-btn" id="show-rates" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
           Show Loss Scenario
          </button>
        </p>

        <div className="collapse" id="collapseExample">
          
          <h5> State </h5> <p>$75 per acre at State Rate of { this.props.stateRate } would cost you ${ costt } per acre </p>
          <h5> Other Products  while spending ${ costt } per acre  </h5>
          <table className="table table-striped">
            <thead>
              <tr className="my-table">
                <th>Loss</th>
                <th>State/Value*</th>
                <th>Basic</th>
                <th>Top Half</th>
                <th> DDA </th>
                <th> XS20IP </th>
              </tr>
            </thead>
            <tbody>
                {this.showRowOne(this.getLiability('state'), this.getLiability('base', this.props.grain[0][Object.keys(this.props.grain[0])] ), this.getLiability('topHalf', this.props.topHalf ), this.getLiability('dda', this.props.grain[2][Object.keys(this.props.grain[2])] ),   this.getLiability('xs', this.props.grain[5][Object.keys(this.props.grain[5])] ))}
              <tr className="my-table">
                <td>10%</td>
                { this.showRowTwo(this.getLossValue(this.getValForLiability('state'), .10), this.getLossValue(this.getValForLiability('base', basicRate ), .10), this.getLossValue(this.getValForLiability('topHalf', topHalf ), .10)) }
                <td> $- </td>
                <td> $- </td>
              </tr>
              <tr className="my-table">
              <td>20%</td>
                { this.showRowThree(this.getLossValue(this.getValForLiability('state'), .20),this.getLossValue(this.getValForLiability('base', basicRate ), .20),this.getLossValue(this.getValForLiability('topHalf', topHalf ), .30), this.getLossValue(this.getValForLiability('dda', dda), .10)  ) }
                <td> $- </td>
              </tr>
              <tr className="my-table">
                <td>30%</td>
                { this.showRest(this.getLossValue(this.getValForLiability('state'), .30), this.getLossValue(this.getValForLiability('base', basicRate ), .30), this.getLossValue(this.getValForLiability('topHalf', topHalf ), .50), this.getLossValue(this.getValForLiability('dda', dda), .30), this.getLossValue(this.getValForLiability('xs', xs ), .10)   ) }
              </tr>
              <tr className="my-table">
                <td>40%</td>
                { this.showRest(this.getLossValue(this.getValForLiability('state'), .40), this.getLossValue(this.getValForLiability('base', basicRate ), .40), this.getLossValue(this.getValForLiability('topHalf', topHalf ), .70), this.getLossValue(this.getValForLiability('dda', dda), .40), this.getLossValue(this.getValForLiability('xs', xs ), .20) ) }
              </tr>
              <tr className="my-table">
                <td>50%</td>
                { this.showRest(this.getLossValue(this.getValForLiability('state'), .50), this.getLossValue(this.getValForLiability('base', basicRate ), .50), this.getLossValue(this.getValForLiability('topHalf', topHalf ), .90), this.getLossValue(this.getValForLiability('dda', dda), .50), this.getLossValue(this.getValForLiability('xs', xs ), .30) ) } 
              </tr>
              <tr className="my-table">
                <td>60%</td>
                { this.showRest(this.getLossValue(this.getValForLiability('state'), .60), this.getLossValue(this.getValForLiability('base', basicRate ), .60), this.getLossValue(this.getValForLiability('topHalf', topHalf ), 1), this.getLossValue(this.getValForLiability('dda', dda), .60), this.getLossValue(this.getValForLiability('xs', xs ), .40) ) }
              </tr>
              <tr className="my-table">
                <td>70%</td>
                { this.showRest(this.getLossValue(this.getValForLiability('state'), .70), this.getLossValue(this.getValForLiability('base', basicRate ), .70), this.getLossValue(this.getValForLiability('topHalf', topHalf ), 1), this.getLossValue(this.getValForLiability('dda', dda), .70), this.getLossValue(this.getValForLiability('xs', xs ), .50) ) }
              </tr>
              <tr className="my-table">
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
                 <em> <p> Cash with application is due July 1st</p> </em>
          </div>

        </div>
        </div>
      </div>
      )
  }
});

module.exports = QuoteBox;