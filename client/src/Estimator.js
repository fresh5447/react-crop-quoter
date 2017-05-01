import React, { Component } from 'react';

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
      console.log("INSIDE THE THING")
      var cost = (( (this.state.selectedRate * this.state.dollarPerAcre) * .10) * this.state.acresToCover);
      console.log(cost, "COST")

      var oldCost = (( (this.state.oldSelectedRate * this.state.dollarPerAcre) * .10) * this.state.acresToCover);
      let costDiffernce = Number(cost) -  Number(oldCost)
      console.log(costDiffernce, "DIFFERENCE")
      this.setState({ totalCost: cost, oldTotalCost: oldCost, theDiff: costDiffernce})
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

  render() {
    return (
      <div className="jumbotron">
        <form className="form-inline">
          <h3> Estimate This Year </h3>
          <label> Dollar per acre </label>
          <div className="form-group">
            <input placeholder="dollar per acre" onChange={ (event) => this.onFieldChange("dollarPerAcre", event.target.value) } />
          </div>
          <div className="form-group">
            <label>rate</label>
              <select onChange={ (event) => this.onFieldChange( 'selectedRate', event.target.value ) }>
                <option defaultValue="-">-</option>
                { this.state.arrOfRates17 ? this.state.arrOfRates17.map(item => {
                  return <option value={item.value}>{`${String(item.key)} / ${item.value} `}</option>
                }) : null}
              </select>
          </div>
          <div className="form-group">
            <label>rate</label>
              <input placeholder="how many acres to cover?" onChange={ (event) => this.onFieldChange("acresToCover", event.target.value) } />
          </div>
        </form>
        <div>
          <h3> { this.state.totalCost ? `This years cost: ${this.state.totalCost}` : null } </h3>
          <h3> select rate purchased last year </h3>
            <div className="form-group">
              <label>rate</label>
                <select onChange={ (event) => this.onFieldChange( 'oldSelectedRate', event.target.value ) }>
                  <option defaultValue="-">-</option>
                  { this.state.arrOfRates16 ? this.state.arrOfRates16.map(item => {
                    return <option value={item.value}>{`${String(item.key)} / ${item.value} `}</option>
                  }) : null}
                </select>
            </div>
          <h3> { this.state.theDiff ? `Compared to last year: ${this.state.theDiff}` : null } </h3>
        </div>
      </div>
    )
  }
}

export default Estimator;
