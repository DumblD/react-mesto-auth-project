import React from 'react';
import './FormInput.css';

function FormInput({
  type,
  name,
  className,
  required,
  minLength,
  maxLength,
  placeholder,
  value,
  onChange,
  inputElement,
  isValidationError,
  errorMessageText,
}) {

  function handleCheckValidity(ev) {
    onChange(ev, inputElement);
  }

  return (
    <>
      <input
        type={type}
        name={name}
        className={isValidationError? `input_type_error ${className}` : `${className}`}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleCheckValidity}
      />
      <span className={`popup__error ${name}-error`}>{errorMessageText}</span>
    </>
  );
}

export default FormInput;
