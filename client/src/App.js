import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      count: 0
    }
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
  render() {
    const base1Options = this.state.basicCities ? this.state.basicCities.map(d => {
      return <option value={ d.key }>{ d.city }</option>
    }) : <option value="na">loading...</option>;

    const base2Options = this.state.baseCtySelection ? this.state.basicInfo.filter(i => {
      var selectedCity = this.state.baseCtySelection;
      return i.key.substring(0,3) === selectedCity;
    }).map(d => {
      return <option value={ d.key.substring(3,7) }>{ d.key.substring(3,7)}</option>
    }) : <option value="na">loading...</option>;

    const base3Options = this.state.baseTownSelection ? this.state.basicInfo.filter(i => {
      var selectedTown = this.state.baseTownSelection;
      return i.key.substring(3,7) === selectedTown;
    }).map(d => {
      return <option value={ d.key.substring(7,11) }>{ d.key.substring(7,11)}</option>
    }) : <option value="na">loading...</option>;

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>McMeel Insurance Crop Quoter</h2>
        </div>
        <p className="App-intro">

        </p>

        <div>
          <h3> Select Your County </h3>
          <select onChange={ (e) => this.setState({baseCtySelection: e.target.value}) }>
            <option defaultValue="-">-</option>;
            { base1Options }
          </select>
        </div>

        { this.state.baseCtySelection ? (
          <div>
            <h3> Select Your Township </h3>
            <select onChange={ (e) => this.setState({baseTownSelection: e.target.value}) }>
              <option defaultValue="-">-</option>;
              { base2Options }
            </select>
          </div>
        ) : null }

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
          <div className="App">
            <div className="App">
              <h3> Here's your wheat options </h3>
              <table className="my-table">
                <thead>
                  <tr>
                    <th>Basic</th>
                    <th>DXS5</th>
                    <th>DDA</th>
                    <th>DXS10</th>
                    <th>DD20</th>
                    <th>XS20IP</th>
                    <th>80MIN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ "$" +  this.state.totalBasicRate.wheat.basic.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.wheat.dxs5.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.wheat.dda.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.wheat.dxs10.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.wheat.dd20.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.wheat.xs20ip.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.wheat.eightyMin.toFixed(2) }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3> Here's your barley options </h3>
              <table className="my-table">
                <thead>
                  <tr>
                    <th>Basic</th>
                    <th>DXS5</th>
                    <th>DDA</th>
                    <th>DXS10</th>
                    <th>DD20</th>
                    <th>XS20IP</th>
                    <th>80MIN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ "$" +  this.state.totalBasicRate.barley.basic.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.barley.dxs5.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.barley.dda.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.barley.dxs10.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.barley.dd20.toFixed(2) }</td>
                    <td>{ "$" +  this.state.totalBasicRate.barley.xs20ip.toFixed(2) }</td>
                    <td>{ "$" + this.state.totalBasicRate.barley.eightyMin.toFixed(2) }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null }

        { this.state.totalBasicRate ? (
        <div className="App">
          <h3> Top Half Companion </h3>
          <table className="my-table">
            <thead>
              <tr>
                <th>Basic Wheat @ { "$" +  this.state.totalBasicRate.wheat.basic.toFixed(2) }</th>
                <th>Basic Barley @ { "$" +  this.state.totalBasicRate.barley.basic.toFixed(2) }   </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>top 1/2 for wheat { this.getTopWheatRate() }</td>
                <td>top half for barley { this.getTopBarleyRate() }</td>
              </tr>
            </tbody>
          </table>
        </div> ) : null }

      </div>
    );
  }
}

export default App;
