import "./InputField.scss";
import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ErrorIcon } from "../../assets/input_error_x.svg";
import { motion } from "framer-motion";
import { fromRightAnimation } from "../../animations";
import { FiAlertCircle } from "react-icons/fi";

export const InputField = ({
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  value,
  error,
  touched,
  disabled,
  label,
  clearInput,
  ...props
}) => {
  const handleInputClear = () => {
    clearInput();
  };

  return (
    <div className="inputField">
      <label
        htmlFor={name}
        className={`inputField__label ${
          disabled ? "inputField__label--disabled" : ""
        }`}
      >
        {label}
      </label>
      <div
        className={`inputField__searchSection 
          ${disabled ? "inputField__searchSection--disabled" : ""} 
          ${error ? "inputField__searchSection--error" : ""}`}
      >
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`inputField__input 
              ${disabled ? "inputField__input--disabled" : ""}`}
          disabled={disabled}
        />
        {error && value !== "" && (
          <button
            className="inputField__input-error-icon"
            onClick={handleInputClear}
          >
            <ErrorIcon />
          </button>
        )}
        {error && value === "" && (
          <FiAlertCircle className="inputField__input-error-icon" />
        )}
      </div>
      {error && (
        <motion.div
          className="inputField--error"
          initial="initial"
          animate="animate"
          variants={fromRightAnimation}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  clearInput: PropTypes.func,
};
