import React, { Component } from 'react';
import DropDown from './DropDown';
import logo from './logo.svg';
import './App.css';
import BasicRatesTable from './BasicRatesTable';
import LossTable from './LossTable';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      basicInfo:         null,
      basicCities:       null,
      topHalfData:       null,
      baseCtySelection:  null,
      baseTownSelection: null,
      baseRgeSelection:  null,
      totalBasicRate:    null,
      viewWhich:         "wheat",
      stateRate:         null,
      city:              null,
      count:             0
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.showTableToggle = this.showTableToggle.bind(this);
  }
  componentDidMount() {
    this.loadBase();
    this.loadTophalf();
  }

  loadBase() {
    fetch('/api/v2/basic')
      .then(blob => blob.json())
      .then(data => {
        const { basicInfo, basicCities } = data;
        this.setState({ basicInfo, basicCities })
      })
      .catch(e => {
        console.error(e, 'ERROR');
        return e
      })
  }
  getStRate(){
    console.log("TYRING TO GRESDGSDF")
    let cityText = "";
    let keyy = this.state.baseCtySelection;
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
            return this.setState({ stateRate: data })
          })
          .catch(e => {
            console.error(e, 'ERROR');
            return e
          })
      }, 3000);

  }
  getTotalBaseRates() {
    if(this.state.baseCtySelection && this.state.baseTownSelection && this.state.baseRgeSelection){
      var ting = this.state.baseCtySelection + this.state.baseTownSelection + this.state.baseRgeSelection
      fetch(`/api/v2/basic/${ting}`)
        .then(blob => blob.json())
        .then(totalBasicRate => {
          this.setState({ totalBasicRate })
          console.log(totalBasicRate);
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
      return item.baseKey === this.state.totalBasicRate.wheat.basic
    })
    return wheatTopRate.topRate.toFixed(2);
  }
  getTopBarleyRate() {
    const barleyTopRate = this.state.topHalfData.find((item) => {
      return item.baseKey === this.state.totalBasicRate.barley.basic
    })
    return barleyTopRate.topRate.toFixed(2);
  }
  clearAllState(){
    return this.setState({
      baseCtySelection:  null,
      baseTownSelection: null,
      baseRgeSelection:  null,
      totalBasicRate:    null
    })
  }
  showTableToggle() {
    if(this.state.viewWhich === "wheat"){
      return (
        <div className="App">
          <button className="btn btn-primary" onClick={() => this.setState({viewWhich: 'barley'}) }> Show Barley </button>
        </div>
      )
    } else if (this.state.viewWhich === "barley") {
      return (
        <div className="App">
          <button className="btn btn-primary" onClick={() => this.setState({viewWhich: 'wheat'}) }> show wheat </button>
        </div>
      )
    } else {
      return
    }
  }
  render() {

    const base2Options = this.state.baseCtySelection ? this.state.basicInfo.filter(i => {
      var selectedCity = this.state.baseCtySelection;
      return i.key.substring(0,3) === selectedCity;
    }).map(d => {
      return <option value={ d.key.substring(3,7) }>{ d.key.substring(3,7) }</option>
    }) : <option value="na">loading...</option>;

    const base3Options = this.state.baseTownSelection ? this.state.basicInfo.filter(i => {
      var selectedTown = this.state.baseTownSelection;
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
            <DropDown onFieldChange={this.onFieldChange} selectionToUpdate="baseCtySelection">
              { this.state.basicCities ? this.state.basicCities.map(d => {
                  return <option value={ d.key }>{ d.city }</option>
                }) : <option value="na">loading...</option>
              }
            </DropDown>
          </div>
          <div>

          </div>
        </div>


          { this.state.baseCtySelection ? (
          <div className="App">
            <h3> Select Township </h3>
            <DropDown onFieldChange={this.onFieldChange} selectionToUpdate="baseTownSelection">
              { base2Options }
            </DropDown>
            </div>
            ) : null
          }


        { this.state.baseTownSelection ? (
          <div className="App">
            <h3> Select Your Range </h3>
            <select onChange={ (e) => {
              this.setState({baseRgeSelection: e.target.value})
              setTimeout(() => {
                this.getTotalBaseRates()
              }, 1000);
            }
            }>
              <option defaultValue="-">-</option>;
              { base3Options }
            </select>
          </div>
        ) : null }


        { this.state.totalBasicRate ? (
            <div>
              { this.state.viewWhich === "wheat" ? <BasicRatesTable toggle={this.showTableToggle} top={this.getTopWheatRate()} items={this.state.totalBasicRate.wheat} title="wheat"/> : null }
              { this.state.viewWhich === "barley" ? <BasicRatesTable toggle={this.showTableToggle} top={this.getTopBarleyRate()} items={this.state.totalBasicRate.barley} title="barley"/> : null }
            </div> ) : null }


            { this.state.totalBasicRate ? (
                <div className="App">
                  <button onClick={() => this.getStRate()} className="btn btn-primary"> Show Loss Scenario </button>
                </div> ) : null }

            { this.state.stateRate ? (
              <div className="App">
                <div>
                  <h3>{ this.state.stateRate.city }</h3>
                  <p>$75 per acre at State Rate of { this.state.stateRate.rate } would cost you { this.state.stateRate.rate * .75 } per acre</p>
                </div>
                <div className="App">
                  <LossTable sr={this.state.stateRate.rate}
                            riskRate={this.state.stateRate.rate * .75 }
                            top={this.state.viewWhich === "wheat" ?
                              this.getTopWheatRate() : this.getTopBarleyRate()
                            }
                            baseRates={this.state.viewWhich === "wheat" ?
                              this.state.totalBasicRate.wheat  : this.state.totalBasicRate.barley }
                  />
                </div>
              </div>
            ) : null }

      </div>
    );
  }
}

export default App;
