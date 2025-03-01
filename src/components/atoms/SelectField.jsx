import React from "react";

const SelectField = ({ label, value, onChange, options }) => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <label className="block font-medium">{label}</label>
    <select
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default SelectField;