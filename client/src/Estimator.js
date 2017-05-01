import React, { Component } from 'react';
var currencyFormatter = require('currency-formatter');

class Estimator extends Component {
  state = {
    allRates: {},
    selectedRate: undefined,
    dollarPerAcre: undefined,
    acresToCover: undefined,
    totalCost: undefined,
    oldSelectedRate: undefined,
    oldDollarPerAcre: undefined,
    oldAcresToCover: undefined,
    oldTotalCost: undefined,
    currentCost: undefined,
    arrOfRates17: undefined,
    arrOfRates16: undefined,
    comparingRate: undefined,
    theDiff: undefined
  }
  onFieldChange(fieldName, fieldValue) {
    const newState = {};
    newState[fieldName] = fieldValue;
    this.setState(newState);

    if(this.state.selectedRate && this.state.dollarPerAcre &&  this.state.acresToCover && this.state.oldSelectedRate) {
      console.log(this.state.selectedRate,this.state.dollarPerAcre, this.state.acresToCover, "ACRES AND SHIT" )
      var cost = (( (this.state.selectedRate * this.state.dollarPerAcre) * .010) * this.state.acresToCover);
      console.log(cost, "COST")

      var oldCost = (( (this.state.oldSelectedRate * this.state.dollarPerAcre) * .010) * this.state.acresToCover);
      let costDiffernce = Number(cost) -  Number(oldCost);
      this.setState({ totalCost: cost, oldTotalCost: oldCost, theDiff: costDiffernce});
    }
  }


  getDifference() {
    if(this.state.totalCost && this.state.oldTotalCost) {
      let costDiffernce = Number(this.state.totalCost) -  Number(this.state.oldTotalCost)
      return <h3> { costDiffernce }  </h3>
    } else {
      return null
    }
  }



  componentDidMount() {
    this.makeArrayOfRates()
  }

  makeArrayOfRates() {
      var obj = this.props.rates17;
      var tempArr = [];
      for (var [key, value] of Object.entries(obj)) {
          tempArr.push({key: key, value: value})
      }
      this.setState({ arrOfRates17: tempArr })

      var nextObj = this.props.rates16;
      var nextTemp = [];
      for (var [key, value] of Object.entries(nextObj)) {
          nextTemp.push({key: key, value: value})
      }
      this.setState({ arrOfRates16: nextTemp })
  }

  showDiff(){
    if( this.state.theDiff && this.state.theDiff > 0) {
      return <h3 className="negative"> More Expensive by { `${currencyFormatter.format(this.state.theDiff, { code: 'USD' })}`} </h3>
    } else if (this.state.theDiff && this.state.theDiff < 0) {
      return <h3 className="positive"> Cheaper By { `${currencyFormatter.format(this.state.theDiff, { code: 'USD' })}`} </h3>
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="jumbotron">
        <form className="form">
          <h3> Cost Comparison </h3>
          <div className="form-group">
            <label>$ per acre</label>
            <input placeholder="dollar per acre" onChange={ (event) => this.onFieldChange("dollarPerAcre", event.target.value) } />
          </div>
          <div className="form-group">
            <label>acres</label>
            <input placeholder="total acres" onChange={ (event) => this.onFieldChange("acresToCover", event.target.value) } />
          </div>
          <div className="form-group">
            <label>2017 Rate</label>
              <select onChange={ (event) => this.onFieldChange( 'selectedRate', event.target.value ) }>
                <option defaultValue="-">-</option>
                { this.state.arrOfRates17 ? this.state.arrOfRates17.map(item => {
                  return <option value={item.value}>{`${String(item.key)} / ${item.value} `}</option>
                }) : null}
              </select>
          </div>
        </form>
        <div>
          <h4> { this.state.totalCost ? `2017 Cost:${currencyFormatter.format(this.state.totalCost, { code: 'USD' })}` : null } </h4>
            <div className="form-group">
              <label>2016 rate</label>
                <select onChange={ (event) => this.onFieldChange( 'oldSelectedRate', event.target.value ) }>
                  <option defaultValue="-">-</option>
                  { this.state.arrOfRates16 ? this.state.arrOfRates16.map(item => {
                    return <option value={item.value}>{`${String(item.key)} / ${item.value} `}</option>
                  }) : null}
                </select>
            </div>
          { this.showDiff() }
        </div>
      </div>
    )
  }
}

export default Estimator;
