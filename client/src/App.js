import React, { Component } from 'react';
import DropDown from './DropDown';
import logo from './logo.svg';
import './App.css';
import BasicRatesTable from './BasicRatesTable';


// var filteredArray = arr.filter(function(item, pos){
//   return arr.indexOf(item)== pos;
// });

// var sorts = ns.sort(function(a,b){
//  return (a[3] > b[3] ) ? 1 : -1
// })
//

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      basicInfo: null,
      basicCities: null,
      topHalfData: null,
      baseCtySelection: null,
      baseTownSelection: null,
      baseRgeSelection: null,
      totalBasicRate: null,
      viewWhich: "wheat",
      count: 0
    }
    this.onFieldChange = this.onFieldChange.bind(this);
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
  getTotalBaseRates() {
    if(this.state.baseCtySelection && this.state.baseTownSelection && this.state.baseRgeSelection){
      console.log("FOUND GET TOTAL BASE RATES");
      var ting = this.state.baseCtySelection + this.state.baseTownSelection + this.state.baseRgeSelection
      console.log(ting);
      fetch(`/api/v2/basic/${ting}`)
        .then(blob => blob.json())
        .then(totalBasicRate => {
          console.log(totalBasicRate, "IN SUCCESS OF GET TOTAL")
          this.setState({ totalBasicRate })
        })
        .catch(e => e)
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
    console.log(fieldName, fieldValue);
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
  showTableToggle() {
    if(this.state.viewWhich === "wheat"){
      return (
        <div>
          <button onClick={() => this.setState({viewWhich: 'barley'}) }> Show Barley </button>
        </div>
      )
    } else if (this.state.viewWhich === "barley") {
      return (
        <div>
          <button onClick={() => this.setState({viewWhich: 'wheat'}) }> show wheat </button>
        </div>
      )
    } else {
      return
    }
  }
  render() {
    // .filter((item, pos) => this.state.basicInfo.indexOf(pos) == pos)).

    const base2Options = this.state.baseCtySelection ? this.state.basicInfo.filter((i, pos) => {
      var selectedCity = this.state.baseCtySelection;
      return i.key.substring(0,3) === selectedCity ;
    }).filter((item, pos, arr) => arr.indexOf(item) == pos).map(d => {
      return <option value={ d.key.substring(3,7) }>{ d.key.substring(3,7)}</option>
    }) : <option value="na">loading...</option>;

    const base3Options = this.state.baseTownSelection ? this.state.basicInfo.filter((i, pos) => {
      var selectedTown = this.state.baseTownSelection;
      return ( i.key.substring(3,7) === selectedTown ) && ( this.state.basicInfo.indexOf(i)== pos);
    }).map(d => {
      return <option value={ d.key.substring(7,11) }>{ d.key.substring(7,11)}</option>
    }) : <option value="na">loading...</option>;

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>McMeel Insurance Crop Quoter</h2>
        </div>

        <div>
          <h3> Select Count</h3>
          <DropDown onFieldChange={this.onFieldChange} selectionToUpdate="baseCtySelection">
            { this.state.basicCities ? this.state.basicCities.map(d => {
                return <option value={ d.key }>{ d.city }</option>
              }) : <option value="na">loading...</option>
            }
          </DropDown>
        </div>


          { this.state.baseCtySelection ? (
          <div>
            <h3> Select Township </h3>
            <DropDown onFieldChange={this.onFieldChange} selectionToUpdate="baseTownSelection">
              { base2Options }
            </DropDown>
            </div>
            ) : null
          }


        { this.state.baseTownSelection ? (
          <div>
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
              { this.showTableToggle() }
              { this.state.viewWhich === "wheat" ? <BasicRatesTable items={this.state.totalBasicRate.wheat} title="wheat"/> : null }
              { this.state.viewWhich === "barley" ? <BasicRatesTable items={this.state.totalBasicRate.barley} title="barley"/> : null }
            </div> ) : null }

      </div>
    );
  }
}

export default App;
