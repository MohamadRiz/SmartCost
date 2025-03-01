import React from "react";
import InputField from "../atoms/InputField";

const CostInput = ({ fuelPrice, maintenancePrice, setFuelPrice, setMaintenancePrice, driverFee,
  setDriverFee,depreciationCost,setDepreciationCost }) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    <InputField label="💰 Biaya Pramudi" value={driverFee} onChange={(e) => setDriverFee(Number(e.target.value))} />
    <InputField label="⛽ Biaya Bahan Bakar" value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} />
    <InputField label="🔧 Biaya Perawatan" value={maintenancePrice} onChange={(e) => setMaintenancePrice(Number(e.target.value))} />
    <InputField label="🏗 Biaya Penyusutan per Bus" value={depreciationCost} onChange={(e) => setDepreciationCost(Number(e.target.value))} />
  </div>
);

export default CostInput;