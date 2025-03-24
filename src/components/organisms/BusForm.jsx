import React from "react";
import SelectField from "../atoms/SelectField";
import InputField from "../atoms/InputField";
import DistanceInput from "../molecules/DistanceInput";
import CostInput from "../molecules/CostInput";
import CheckboxField from "../atoms/CheckboxField";

const BusForm = ({
  name,
  setName,
  busType,
  setBusType,
  busCount,
  setBusCount,
  dayCount,
  setDayCount,
  shifCount,
  setShifCount,
  driverFeeTko,
  setDriverFeeTko,
  driverFeeTkoKosong,
  setDriverFeeTkoKosong,
  driverCount,
  setDriverCount,
  tripCount,
  setTripCount,
  distance,
  setDistance,
  fuelPrice,
  setFuelPrice,
  driverFee,
  setDriverFee,
  maintenancePrice,
  setMaintenancePrice,
  depreciationCost,
  setDepreciationCost,
  margin,
  setMargin,
  totalKm,
  handleTotalChange,
  hideDistance,
  setHideDistance,
  tolPrice,
  setTolPrice,
}) => (
  <>
    <div className="grid grid-cols-1 gap-4">
      <InputField
        label="🤵 Nama Penyewa"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <SelectField
        label="🚌 Kategori Sewa"
        value={busType}
        onChange={(e) => setBusType(e.target.value)}
        options={[
          { value: "Shuttle", label: "Shuttle" },
          { value: "Carter Harian", label: "Carter Harian" },
        ]}
      />
      <InputField
        label="🧮 Jumlah Bus"
        value={busCount}
        onChange={(e) => setBusCount(Number(e.target.value))}
        min="1"
        max="30"
      />
      <InputField
        label="📅 Jumlah Hari"
        value={dayCount}
        onChange={(e) => setDayCount(Number(e.target.value))}
        min="1"
        max="30"
      />
      <InputField
        label="👨‍✈️ Jumlah Pramudi"
        value={driverCount}
        onChange={(e) => setDriverCount(Number(e.target.value))}
        min="1"
        max="30"
      />
      <InputField
        label="🌙 Shif Pramudi"
        value={shifCount}
        onChange={(e) => setShifCount(Number(e.target.value))}
        min="1"
        max="30"
      />
      <InputField
        label="🧑 TKO Jam Produksi"
        value={driverFeeTko}
        onChange={(e) => setDriverFeeTko(Number(e.target.value))}
        min="1"
        max="30"
      />
      <InputField
        label="🧑 TKO Jam Kosong"
        value={driverFeeTkoKosong}
        onChange={(e) => setDriverFeeTkoKosong(Number(e.target.value))}
        min="1"
        max="30"
      />
      {!hideDistance && (
        <InputField
          label="📍 Ritanse"
          value={tripCount}
          onChange={(e) => setTripCount(Number(e.target.value))}
          min="1"
          max="30"
        />
      )}
    </div>
    <div className="grid grid-cols-1 gap-4 mt-4">
      <CheckboxField
        label="Hitung langsung"
        checked={hideDistance}
        onChange={() => setHideDistance(!hideDistance)}
      />
    </div>
    {!hideDistance && (
      <DistanceInput distance={distance} setDistance={setDistance} />
    )}
    <div className="grid grid-cols-1 gap-4 mt-4">
      <InputField
        value={totalKm}
        onChange={handleTotalChange}
        label="📍Total Jarak (km)"
      />
    </div>
    <CostInput
      fuelPrice={fuelPrice}
      maintenancePrice={maintenancePrice}
      setFuelPrice={setFuelPrice}
      setMaintenancePrice={setMaintenancePrice}
      driverFee={driverFee}
      setDriverFee={setDriverFee}
      depreciationCost={depreciationCost}
      setDepreciationCost={setDepreciationCost}
      tolPrice={tolPrice}
      setTolPrice={setTolPrice}
    />
    <div className="grid grid-cols-1 gap-4 mt-4">
      <InputField
        label="📊 Margin (%)"
        value={margin}
        onChange={(e) => setMargin(Number(e.target.value))}
        min="10"
        max="100"
      />
    </div>
  </>
);

export default BusForm;
