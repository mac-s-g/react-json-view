import React from 'react';


export const VariableTypeSelect = (props) => {
  const {selectedType, onTypeSelect} = props;

  const supportedTypes = ['object', 'array', 'string', 'integer', 'float', 'boolean', 'function',
    'null', 'nan', 'undefined', 'date'];

  const renderOption = (optionName) => {
    return (
      <option value={optionName}>{optionName}</option>
    );
  }

  const handleChange = (e) => {
    return onTypeSelect(e.target.value);
  }

  return (
    <select value={selectedType} onChange={handleChange}>
      {supportedTypes.map(type => renderOption(type))}
    </select>
  );
}