import React from 'react';

interface IToggle {
    checked:any;
    onChange:any;
}
const Toggle = ({ checked, onChange }:IToggle) => (
  <span className="toggle-control">
    <input
      className="dmcheck"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id="dmcheck"
    />
    <label htmlFor="dmcheck" />
  </span>
);

export default Toggle;