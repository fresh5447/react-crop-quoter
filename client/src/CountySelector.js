import React from 'react';
import DropDown from './DropDown';

const CountySelector = (props) => {
  return (
    <div>
      <h3> County </h3>
      <DropDown onFieldChange={props.onFieldChange} selectionToUpdate="selectedCounty">
        { props.countyData ? props.countyData.map(d => {
            return <option key={d.key} value={ d.key }>{ d.city }</option>
          }) : <option value="na">loading...</option>
        }
      </DropDown>
    </div>
  )
}

export default CountySelector;
