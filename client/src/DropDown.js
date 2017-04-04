import React from 'react';

const DropDown = (props) =>
<div>
  <select onChange={ (event) => props.onFieldChange( props.selectionToUpdate, event.target.value ) }>
    <option defaultValue="-">-</option>
    { props.children }
  </select>
</div>

export default DropDown;
