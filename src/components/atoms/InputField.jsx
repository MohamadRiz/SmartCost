import React from "react";

const InputField = ({ label, value, onChange, type = "number", min, max }) => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <label className="block font-medium">{label}</label>
    <input
      type={type}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
  </div>
);

export default InputField;