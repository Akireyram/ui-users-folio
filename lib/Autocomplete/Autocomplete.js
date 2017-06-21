import React, { PropTypes } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import css from './Autocomplete.css';

const Autocomplete = ({ options, label, input: { value, onChange } }) => {
  const selected = (value) ? [value] : [];

  return (
    <div className={css.root}>
      <label htmlFor={label} className={css.label}>{label}</label>
      <Typeahead
        clearButton
        name={label}
        bsSize="small"
        onInputChange={val => onChange(val)}
        selected={selected}
        className={css.Autocomplete}
        options={options}
      />
    </div>
  );
};

Autocomplete.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default Autocomplete;
