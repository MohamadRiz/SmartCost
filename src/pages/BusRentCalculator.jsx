import React, { useState } from "react";
import BusForm from "../components/organisms/BusForm";
import CalculationResults from "../components/organisms/CalculationResults";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BusRentCalculator = () => {
  const [name, setName] = useState("");
  const [busType, setBusType] = useState("Shuttle");
  const [busCount, setBusCount] = useState(1);
  const [dayCount, setDayCount] = useState(1);
  const [shifCount, setShifCount] = useState(1);
  const [driverCount, setDriverCount] = useState(1);
  const [distance, setDistance] = useState({ pool_A: 0, a_B: 0, b_A: 0, b_Pool: 0 });
  const [fuelPrice, setFuelPrice] = useState(6800);
  const [driverFee, setDriverFee] = useState(539679);
  const [maintenancePrice, setMaintenancePrice] = useState(2086);
  const [depreciationCost, setDepreciationCost] = useState(8427234);
  const [margin, setMargin] = useState(10);
  const [tripCount, setTripCount] = useState(1);
  const [calculated, setCalculated] = useState(false);

  const totalKm = ((distance["a_B"] + distance["b_A"]) * tripCount * shifCount) + 
                      ((distance["pool_A"] + distance["b_Pool"]) * shifCount);
  const fuelCost = ((totalKm / 3) * fuelPrice) * busCount;
  const driverCost = (driverFee * driverCount) * shifCount;
  const maintenanceCost = totalKm * maintenancePrice * busCount;
  const totalDepreciationCost = depreciationCost * busCount;
  const totalDepreciationDailyCost = depreciationCost / 25;
  const totaloperational = fuelCost + maintenanceCost + totalDepreciationDailyCost + driverCost;
  const totalRent = totaloperational * dayCount * busCount + (totaloperational * (margin / 100));
  const totalDailyRent = totalRent / dayCount;

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleClear = () => {
    setBusType("Shuttle");
    setBusCount(1);
    setDayCount(1);
    setDistance({ pool_A: 0, a_B: 0, b_A: 0, b_Pool: 0 });
    setFuelPrice(6800);
    setMaintenancePrice(2086);
    setDepreciationCost(8427234);
    setMargin(10);
    setCalculated(false);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, 
    }).format(Math.round(number));
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    const startDate = new Date(); 
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + dayCount); 
  
    // Format dates as "DD/MM/YYYY"
    const formattedStartDate = startDate.toLocaleDateString("id-ID");
    const formattedEndDate = endDate.toLocaleDateString("id-ID");
  
    doc.setFontSize(18);
    doc.text(`${name} Invoice`, 14, 15);
  
    doc.setFontSize(12);
    doc.text(`Tanggal Awal Sewa: ${formattedStartDate}`, 14, 22);
    doc.text(`Tanggal Akhir Sewa: ${formattedEndDate}`, 14, 28);
  
    const invoiceData = [
      ["Result SmartCost"],
      ["Bus Type", busType],
      ["Bus Count", busCount],
      ["Day Count", dayCount],
      ["Shift Count", shifCount],
      ["Driver Count", driverCount],
      ["Ritanse", tripCount],
      [""],
      ["Distance Details"],
      ["Pool to A", `${distance.pool_A} KM`],
      ["A to B", `${distance.a_B} KM`],
      ["B to A", `${distance.b_A} KM`],
      ["B to Pool", `${distance.b_Pool} KM`],
      [""],
      ["Cost Breakdown"],
      ["Fuel Price", formatRupiah(fuelPrice)],
      ["Driver Fee", formatRupiah(driverFee)],
      ["Maintenance Price", formatRupiah(maintenancePrice)],
      ["Depreciation Cost", formatRupiah(depreciationCost)],
      ["Margin", `${margin}%`],
      [""],
      ["Summary"],
      ["Total Km", `${totalKm} KM`],
      ["Fuel Cost", formatRupiah(fuelCost)],
      ["Driver Cost", formatRupiah(driverCost)],
      ["Maintenance Cost", formatRupiah(maintenanceCost)],
      ["Depreciation Cost Daily", formatRupiah(totalDepreciationDailyCost)],
      ["Depreciation Cost Total", formatRupiah(totalDepreciationCost)],
      ["Total Operational Cost", formatRupiah(totaloperational)],
      ["Total Rent", formatRupiah(totalRent)],
      ["Total Daily Rent", formatRupiah(totalDailyRent)],
    ];
  
    let finalData = [];
    invoiceData.forEach((item) => {
      if (item.length === 1) {
        finalData.push([item[0], ""]);
      } else {
        finalData.push(item);
      }
    });
  
    doc.autoTable({
      startY: 35,
      head: [["Description", "Value"]],
      body: finalData,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });
    const formattedStateName = name.replace(/[\s.]+/g, "_");
    doc.save(`${formattedStateName}_Invoice_${formattedStartDate.replace(/\//g, "-")}.pdf`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">🚍 SmartCost</h2>
      <BusForm {...{ name, setName, busType, setBusType, busCount, setBusCount, dayCount, setDayCount, shifCount, setShifCount, driverCount, setDriverCount,tripCount, setTripCount, distance, setDistance, fuelPrice, setFuelPrice, driverFee, setDriverFee, maintenancePrice, setMaintenancePrice, depreciationCost, setDepreciationCost, margin, setMargin }} />
      <div className="flex gap-4 mt-4">
        <button onClick={handleCalculate} className="w-full p-2 bg-blue-500 text-white rounded-lg">🧮 Calculate</button>
        <button onClick={handleClear} className="w-1/4 p-2 bg-gray-500 text-white rounded-lg">❌ Clear</button>
      </div>
      {calculated && (
        <>
          <CalculationResults {...{ totalKm, driverCost, fuelCost, maintenanceCost, totalDepreciationDailyCost, totalDepreciationCost, totaloperational, totalRent, totalDailyRent }} />
          <button onClick={handleExportToPDF} className="mt-4 w-full p-2 bg-green-500 text-white rounded-lg">📥 Export Invoice</button>
        </>
      )}
    </div>
  );
};

export default BusRentCalculator;
