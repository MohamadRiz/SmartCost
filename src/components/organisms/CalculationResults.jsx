import React from "react";

const CalculationResults = ({ 
  totalKm, 
  driverCost, 
  fuelCost, 
  maintenanceCost, 
  totalDepreciationDailyCost, 
  totalDepreciationCost, 
  totaloperational, 
  totalRent, 
  totalDailyRent 
}) => (
  <div className="mt-6 p-6 bg-blue-50 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">🔍 Hasil Perhitungan</h3>
    <p><strong>Total KM Tempuh:</strong> {Math.round(totalKm)} km</p>
    <p><strong>Total Biaya Pramudi:</strong> Rp {Math.round(driverCost).toLocaleString()}</p>
    <p><strong>Biaya Bahan Bakar:</strong> Rp {Math.round(fuelCost).toLocaleString()}</p>
    <p><strong>Biaya Perawatan:</strong> Rp {Math.round(maintenanceCost).toLocaleString()}</p>
    <p><strong>Biaya Penyusutan perhari:</strong> Rp {Math.round(totalDepreciationDailyCost).toLocaleString()}</p>
    {/* <p><strong>Total Biaya Penyusutan:</strong> Rp {Math.round(totalDepreciationCost).toLocaleString()}</p> */}
    <p><strong>Total Biaya Operasional:</strong> Rp {Math.round(totaloperational).toLocaleString()}</p>
    <p><strong>Total Biaya Sewa:</strong> Rp {Math.round(totalRent).toLocaleString()}</p>
    {/* <p><strong>Total Biaya Sewa per Hari:</strong> Rp {Math.round(totalDailyRent).toLocaleString()}</p> */}
  </div>
);

export default CalculationResults;
