import React from "react";

const CheckboxField = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      {/* Custom Styled Checkbox */}
      <div className="relative w-6 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden peer"
        />
        <div className="w-6 h-6 bg-gray-200 border border-gray-400 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-600 transition-all"></div>
        {/* Check Icon */}
        {checked && (
          <svg
            className="absolute inset-0 w-6 h-6 text-white stroke-[3px] transition-opacity opacity-100 peer-checked:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Label */}
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};

export default CheckboxField;
