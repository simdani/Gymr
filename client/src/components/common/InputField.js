import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ type, className, value, placeholder, name, onChange }) => {
    return (<input
      type={type}
      className={className}
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      />);
};

InputField.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export default InputField;
