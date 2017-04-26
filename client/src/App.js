// view one - BasicSelections
// WheatOrBarleyTable
// Loss Scenario


import React, { Component } from 'react';
import DropDown from './DropDown';
import logo from './logo.svg';
import './App.css';
import BasicRatesTable from './BasicRatesTable';
import LossTable from './LossTable';


class App extends Component {
  state = {
    townshipAndRangeData: null,
    countyData:       null,
    topHalfData:       null,
    selectedCounty:  null,
    selectedTownship: null,
    selectedRange:  null,
    basicTableData:    null,
    wheatOrBarleyTable:         "wheat",
    activeStateRate:         null,
    city:              null,
    count:             0
  }

  onFieldChange = this.onFieldChange.bind(this);
  showTableToggle = this.showTableToggle.bind(this);

  componentDidMount() {
    this.fetchInitialBasicData();
    this.loadTophalf();
  }

  fetchInitialBasicData() {
    fetch('/api/v2/basic')
      .then(blob => blob.json())
      .then(data => {
        // go back to bI
        this.setState({ townshipAndRangeData: data.basicInfo, countyData: data.basicCities })
      })
      .catch(e => {
        console.error(e, 'ERROR');
        return e
      })
  }
  fetchStateRate(){
    console.log("TYRING TO GRESDGSDF")
    let cityText = "";
    let keyy = this.state.selectedCounty;
    console.log(keyy, "FOUND GET STATE RATE")

    fetch(`/api/v2/basicCityByKey/${keyy}`)
      .then(blob => blob.json())
      .then(data => {
        cityText = data.city;
        console.log("in city text", cityText);
        this.setState({ city: cityText })
        return cityText
      })
      .catch(e => {
        console.error(e, 'ERROR');
        return e
      })

      setTimeout(() => {
        fetch(`/api/v2/state/${this.state.city}`)
          .then(blob => blob.json())
          .then(data => {
            console.log(data, "DATA GETTING STATE RATE");
            return this.setState({ activeStateRate: data })
          })
          .catch(e => {
            console.error(e, 'ERROR');
            return e
          })
      }, 3000);

  }
  getTotalBasicTableData() {
    if(this.state.selectedCounty && this.state.selectedTownship && this.state.selectedRange){
      var lookUpKey = this.state.selectedCounty + this.state.selectedTownship + this.state.selectedRange
      fetch(`/api/v2/basic/${lookUpKey}`)
        .then(blob => blob.json())
        .then(basicTableData => {
          this.setState({ basicTableData })
          console.log(basicTableData, "TOTAL BASIC RATE");
        })
        .catch(e => {
          console.error(e);
          return e
        })
    }

  }
  loadTophalf() {
    fetch('/api/v2/tophalf')
      .then(blob => blob.json())
      .then(topHalfData => this.setState({ topHalfData }))
      .catch(e => {
        console.error(e, 'ERROR');
        return e
      })
  }

  onFieldChange(fieldName, fieldValue) {
    const newState = {};
    newState[fieldName] = fieldValue;
    this.setState(newState);
  }

  getTopWheatRate() {
    const wheatTopRate = this.state.topHalfData.find((item) => {
      return item.baseKey === this.state.basicTableData.wheat.basic
    })
    return wheatTopRate.topRate.toFixed(2);
  }
  getTopBarleyRate() {
    const barleyTopRate = this.state.topHalfData.find((item) => {
      return item.baseKey === this.state.basicTableData.barley.basic
    })
    return barleyTopRate.topRate.toFixed(2);
  }
  clearAllState(){
    return this.setState({
      selectedCounty:  null,
      selectedTownship: null,
      selectedRange:  null,
      basicTableData:    null
    })
  }
  showTableToggle() {
    if(this.state.wheatOrBarleyTable === "wheat"){
      return (
        <div className="App">
          <button className="btn btn-primary" onClick={() => this.setState({wheatOrBarleyTable: 'barley'}) }> Show Barley </button>
        </div>
      )
    } else if (this.state.wheatOrBarleyTable === "barley") {
      return (
        <div className="App">
          <button className="btn btn-primary" onClick={() => this.setState({wheatOrBarleyTable: 'wheat'}) }> show wheat </button>
        </div>
      )
    } else {
      return
    }
  }
  render() {

    const base2Options = this.state.selectedCounty ? this.state.townshipAndRangeData.filter(i => {
      var selectedCity = this.state.selectedCounty;
      return i.key.substring(0,3) === selectedCity;
    }).map(d => {
      return <option value={ d.key.substring(3,7) }>{ d.key.substring(3,7) }</option>
    }) : <option value="na">loading...</option>;

    const base3Options = this.state.selectedTownship ? this.state.townshipAndRangeData.filter(i => {
      var selectedTown = this.state.selectedTownship;
      return i.key.substring(3,7) === selectedTown;
    }).map(d => {
      return <option value={ d.key.substring(7,11) }>{ d.key.substring(7,11)}</option>
    }) : <option value="na">loading...</option>;

    return (
      <div className="">
        <div className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>McMeel Insurance Crop Quoter</h2>
          <button className="btn btn-danger" onClick={() => this.clearAllState()}> Reset </button>
        </div>

        <div className="App Buttons App">
          <div>
            <h3> Select County</h3>
            <DropDown onFieldChange={this.onFieldChange} selectionToUpdate="selectedCounty">
              { this.state.countyData ? this.state.countyData.map(d => {
                  return <option value={ d.key }>{ d.city }</option>
                }) : <option value="na">loading...</option>
              }
            </DropDown>
          </div>
          <div>

          </div>
        </div>


          { this.state.selectedCounty ? (
          <div className="App">
            <h3> Select Township </h3>
            <DropDown onFieldChange={this.onFieldChange} selectionToUpdate="selectedTownship">
              { base2Options }
            </DropDown>
            </div>
            ) : null
          }


        { this.state.selectedTownship ? (
          <div className="App">
            <h3> Select Your Range </h3>
            <select onChange={ (e) => {
              this.setState({selectedRange: e.target.value})
              setTimeout(() => {
                this.getTotalBasicTableData()
              }, 1000);
            }
            }>
              <option defaultValue="-">-</option>;
              { base3Options }
            </select>
          </div>
        ) : null }


        { this.state.basicTableData ? (
            <div>
              { this.state.wheatOrBarleyTable === "wheat" ? <BasicRatesTable toggle={this.showTableToggle} top={this.getTopWheatRate()} items={this.state.basicTableData.wheat} title="wheat"/> : null }
              { this.state.wheatOrBarleyTable === "barley" ? <BasicRatesTable toggle={this.showTableToggle} top={this.getTopBarleyRate()} items={this.state.basicTableData.barley} title="barley"/> : null }
            </div> ) : null }


            { this.state.basicTableData ? (
                <div className="App">
                  <button onClick={() => this.fetchStateRate()} className="btn btn-primary"> Show Loss Scenario </button>
                </div> ) : null }

            { this.state.activeStateRate ? (
              <div className="App">
                <div>
                  <h3>{ this.state.activeStateRate.city }</h3>
                  <p>$75 per acre at State Rate of { this.state.activeStateRate.rate } would cost you { this.state.activeStateRate.rate * .75 } per acre</p>
                </div>
                <div className="App">
                  <LossTable sr={this.state.activeStateRate.rate}
                            riskRate={this.state.activeStateRate.rate * .75 }
                            top={this.state.wheatOrBarleyTable === "wheat" ?
                              this.getTopWheatRate() : this.getTopBarleyRate()
                            }
                            baseRates={this.state.wheatOrBarleyTable === "wheat" ?
                              this.state.basicTableData.wheat  : this.state.basicTableData.barley }
                  />
                </div>
              </div>
            ) : null }

      </div>
    );
  }
}

export default App;
