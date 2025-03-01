import React from "react";
import InputField from "../atoms/InputField";

const DistanceInput = ({ distance, setDistance }) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    {Object.keys(distance).map((key) => (
      <InputField
        key={key}
        label={`📍Jarak ${key.toUpperCase()} (km)`}
        value={distance[key]}
        onChange={(e) => setDistance({ ...distance, [key]: Number(e.target.value) })}
      />
    ))}
  </div>
);

export default DistanceInput;