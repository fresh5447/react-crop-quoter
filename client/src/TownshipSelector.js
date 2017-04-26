import React from 'react';
import DropDown from './DropDown';

const TownshipSelector = (props) => {
  return (
    <div>
      <h3> Select Township </h3>
      <DropDown onFieldChange={props.onFieldChange} selectionToUpdate="selectedTownship">
        { props.availableTownshipSelections }
      </DropDown>
    </div>
  )
}

export default TownshipSelector;
