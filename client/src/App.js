import React, {Component} from 'react';
import DropDown from './DropDown';
import logo from './logo.svg';
import './App.css';
import BasicRatesTable from './BasicRatesTable';
import LossTable from './LossTable';
import CountySelector from './CountySelector';
import TownshipSelector from './TownshipSelector';
import Estimator from './Estimator';

import _ from 'underscore';

class App extends Component {
  state = {
    townshipAndRangeData: null,
    countyData: null,
    topHalfData: null,
    selectedCounty: null,
    selectedTownship: null,
    selectedRange: null,
    basicTableData: null,
    wheatOrBarleyTable: 'wheat',
    activeStateRate: null,
    city: null,
    count: 0,
    loadingLossScenario: false,
    oldBasicTableData: undefined
  };

  onFieldChange = this.onFieldChange.bind(this);
  toggleWheatBarleyTable = this.toggleWheatBarleyTable.bind(this);

  componentDidMount() {
    this.fetchInitialBasicData();
    this.fetchTopHalfData();
  }

  fetchInitialBasicData() {
    fetch('/api/v2/basic')
      .then(blob => blob.json())
      .then(data => {
        // go back to bI
        this.setState({
          townshipAndRangeData: data.basicInfo,
          countyData: data.basicCities,
        });
      })
      .catch(e => {
        console.error(e, 'ERROR');
        return e;
      });
  }

  fetchStateRate() {
    let cityText = '';
    let keyy = this.state.selectedCounty;
    fetch(`/api/v2/basicCityByKey/${keyy}`)
      .then(blob => blob.json())
      .then(data => {
        cityText = data.city;
        console.log('in city text', cityText);
        this.setState({city: cityText});
        return cityText;
      })
      .catch(e => {
        console.error(e, 'ERROR');
        return e;
      });

    setTimeout(() => {
      fetch(`/api/v2/state/${this.state.city}`)
        .then(blob => blob.json())
        .then(data => {
          console.log(data, 'DATA GETTING STATE RATE');
          return this.setState({
            activeStateRate: data,
            loadingLossScenario: false,
          });
        })
        .catch(e => {
          console.error(e, 'FUCK ME ME?');
          return e;
        });
    }, 1000);
  }

  getTotalBasicTableData() {
    if (
      this.state.selectedCounty &&
      this.state.selectedTownship &&
      this.state.selectedRange
    ) {
      var lookUpKey =
        this.state.selectedCounty +
        this.state.selectedTownship +
        this.state.selectedRange;
      fetch(`/api/v2/basic/${lookUpKey}`)
        .then(blob => blob.json())
        .then(basicTableData => {
          console.log(basicTableData, 'BASIC TABLE DATA');
          this.setState({basicTableData});
        })
        .catch(e => {
          console.error(e);
          return e;
        });
        fetch(`/api/v2/old/basic/${lookUpKey}`)
          .then(blob => blob.json())
          .then(oldBasicTableData => {
            this.setState({oldBasicTableData});
          })
          .catch(e => {
            console.error(e);
            return e;
          });
    }
  }

  fetchTopHalfData() {
    fetch('/api/v2/tophalf')
      .then(blob => blob.json())
      .then(topHalfData => this.setState({topHalfData}))
      .catch(e => {
        console.error(e, 'ERROR');
        return e;
      });
  }

  onFieldChange(fieldName, fieldValue) {
    const newState = {};
    newState[fieldName] = fieldValue;
    this.setState(newState);
  }

  getTopWheatRate() {
    const wheatTopRate = this.state.topHalfData.find(item => {
      return item.baseKey === this.state.basicTableData.wheat.basic;
    });
    return wheatTopRate.topRate.toFixed(2);
  }

  getTopBarleyRate() {
    const barleyTopRate = this.state.topHalfData.find(item => {
      return item.baseKey === this.state.basicTableData.barley.basic;
    });
    return barleyTopRate.topRate.toFixed(2);
  }

  clearAllState() {
    return this.setState({
      selectedCounty: null,
      selectedTownship: null,
      selectedRange: null,
      basicTableData: null,
    });
  }

  toggleWheatBarleyTable() {
    if (this.state.wheatOrBarleyTable == 'wheat') {
      return (
        <div className="App">
          <button
            className="btn btn-primary togglerButton"
            onClick={() => this.setState({wheatOrBarleyTable: 'barley'})}
          >
            {' '}Show Barley{' '}
          </button>
        </div>
      );
    } else if (this.state.wheatOrBarleyTable == 'barley') {
      return (
        <div className="App">
          <button
            className="btn btn-primary togglerButton"
            onClick={() => this.setState({wheatOrBarleyTable: 'wheat'})}
          >
            {' '}show wheat{' '}
          </button>
        </div>
      );
    } else {
      return;
    }
  }

  filterTownData() {
    // Step one: return only that match the first 3 chars
    // of the key. 999Y is for when no others match
    // Then we used map to make the array shallow
    // after we make array unique, we map to option drowdown
    var findMatches = this.state.townshipAndRangeData
      .filter(i => {
        var countyKey = i.key.substring(0, 3);
        return countyKey === this.state.selectedCounty;
      })
      .map(data => data.key.substring(3, 7))
      .filter(item => item !== '999Y');
    var filteredItems = _.uniq(findMatches);
    var mappedItems = filteredItems.map(item => {
      return (
        <option value={item}>
          {item}
        </option>
      );
    });
    return mappedItems;
  }

  filterRangeData() {
    // see filter town data
    var findMatches = this.state.townshipAndRangeData.filter(i => {
      var selectedTown = this.state.selectedTownship;
      return i.key.substring(3, 7) === selectedTown;
    });
    var getValues = findMatches.map(d => d.key.substring(7, 11));
    var filterToUnique = _.uniq(getValues);
    return filterToUnique.map(d => {
      return (
        <option value={d}>
          {d}
        </option>
      );
    });
  }

  render() {
    const availableTownshipSelections = this.state.selectedCounty
      ? this.filterTownData()
      : <option value="na">loading...</option>;

    const availableRangeSelections = this.state.selectedTownship
      ? this.filterRangeData()
      : <option value="na">loading...</option>;

    return (
      <div className="">
        {/* JUMBOHEADER */}
        <div className="App App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>McMeel Insurance Crop Quoter</h2>
          <button
            className="btn btn-danger"
            onClick={() => window.location = '/'}
          >
            {' '}Reset{' '}
          </button>
        </div>

        {/* SELECTOR_FLEX */}
        <div className="jumbotron selector-flex">
          {/* COUNTY_SELECTOR */}
          <div className="selector">
            <CountySelector
              onFieldChange={this.onFieldChange}
              countyData={this.state.countyData}
            />
          </div>

          {/* TOWNSHIP_SELECTOR */}
          {this.state.selectedCounty
            ? <div className="selector">
                <TownshipSelector
                  onFieldChange={this.onFieldChange}
                  availableTownshipSelections={availableTownshipSelections}
                />
              </div>
            : null}

          {/* TOWNSHIP_SELECTOR */}
          {this.state.selectedTownship
            ? <div className="selector">
                <h3> Range </h3>
                <select
                  onChange={e => {
                    this.setState({selectedRange: e.target.value});
                    setTimeout(() => {
                      this.getTotalBasicTableData();
                    }, 1000);
                  }}
                >
                  <option defaultValue="-">-</option>;
                  {availableRangeSelections}
                </select>
              </div>
            : null}
        </div>

        {this.state.basicTableData
          ? <div className="jumbotron">
              {this.state.wheatOrBarleyTable == 'wheat'
                ? <BasicRatesTable
                    toggle={this.toggleWheatBarleyTable}
                    top={this.getTopWheatRate()}
                    items={this.state.basicTableData.wheat}
                    title="wheat"
                  />
                : null}
              {this.state.wheatOrBarleyTable == 'barley'
                ? <BasicRatesTable
                    toggle={this.toggleWheatBarleyTable}
                    top={this.getTopBarleyRate()}
                    items={this.state.basicTableData.barley}
                    title="barley"
                  />
                : null}
            </div>
          : null}

        {this.state.basicTableData
          ? <div className="jumbotron App">
              <button
                onClick={() => {
                  this.setState({loadingLossScenario: true});
                  this.fetchStateRate();
                }}
                className="btn btn-primary"
              >
                {!this.state.loadingLossScenario
                  ? 'Show Loss Scenario'
                  : 'Loading...'}
              </button>
            </div>
          : null}

        {this.state.activeStateRate
          ? <div className="App">
              <div>
                <h3>{this.state.activeStateRate.city}</h3>
                <p>
                  <strong>$75</strong> per acre at State Rate of
                  {' '}
                  <strong>{this.state.activeStateRate.rate}</strong>
                  {' '}
                  would cost you
                  {' '}
                  <strong>
                    {'$' + (this.state.activeStateRate.rate * 0.75).toFixed(2)}
                  </strong>
                  {' '}
                  per acre
                </p>
              </div>
              <div className="jumbotron">
                <LossTable
                  sr={this.state.activeStateRate.rate}
                  riskRate={this.state.activeStateRate.rate * 0.75}
                  top={
                    this.state.wheatOrBarleyTable === 'wheat'
                      ? this.getTopWheatRate()
                      : this.getTopBarleyRate()
                  }
                  baseRates={
                    this.state.wheatOrBarleyTable === 'wheat'
                      ? this.state.basicTableData.wheat
                      : this.state.basicTableData.barley
                  }
                />
              </div>
              <Estimator rates17={
                  this.state.wheatOrBarleyTable === 'wheat'
                    ? this.state.basicTableData.wheat
                    : this.state.basicTableData.barley
                }
                rates16={
                   this.state.wheatOrBarleyTable === 'wheat'
                     ? this.state.oldBasicTableData.wheat
                     : this.state.oldBasicTableData.barley
                 }
                />
            </div>
          : null}

      </div>
    );
  }
}

export default App;
