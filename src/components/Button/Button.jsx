/*Import Button component:  import { Button } from "components/Button";
<Button  
label="Default"
onCLick={onClick}
variant: "primary/secondary" (Primary - Blue Button; Secondary - Text Button)
size="large/medium" - only for Primary button
icon="" //show default icons for primary and secondary buttons 
disabled //If button should be disabled
/>
*/

import "./buttons.scss";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as MagnifierIcon } from "../../assets/svg/MagnifierIcon-white.svg";
import { ReactComponent as TextButtonIcon } from "../../assets/svg/TextButtonIcon.svg";

const Size = {
  LARGE: "large",
  MEDIUM: "medium",
  EMPTY: "",
};

const Variant = {
  LARGE: "primary",
  MEDIUM: "secondary",
};

const childrenShape = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const Button = ({
  children,
  label,
  onClick,
  variant,
  size,
  icon,
  disabled,
  type,
}) => {
  return (
    <button
      className={classNames({
        btn__primary: variant === "primary" || true,
        btn__secondary: variant === "secondary",
        btn__large: size === "large",
        btn__medium: size === "medium",
      })}
      type={type}
      disabled={disabled}
      onClick={!disabled ? onClick : () => void 0}
    >
      {icon || !icon == null ? (
        variant === "primary" ? (
          <MagnifierIcon className="btn__icon" />
        ) : (
          <TextButtonIcon className="btn__secondary__icon" />
        )
      ) : (
        ""
      )}
      {label}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: childrenShape,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
  size: PropTypes.oneOf(Object.values(Size)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
};
