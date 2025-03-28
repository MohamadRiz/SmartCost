import React, { useEffect, useState } from "react";
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
  const [distance, setDistance] = useState({
    pool_A: 0,
    a_B: 0,
    b_A: 0,
    b_Pool: 0,
  });
  const [fuelPrice, setFuelPrice] = useState(6800);
  const [driverFee, setDriverFee] = useState(395609);
  const [driverFeeTko, setDriverFeeTko] = useState(0);
  const [driverFeeTkoKosong, setDriverFeeTkoKosong] = useState(0);
  const [maintenancePrice, setMaintenancePrice] = useState(1901);
  const [depreciationCost, setDepreciationCost] = useState(8616042);
  const [margin, setMargin] = useState(10);
  const [tripCount, setTripCount] = useState(1);
  const [calculated, setCalculated] = useState(false);
  const [totalKm, setTotalKm] = useState(0);
  const [tolPrice, setTolPrice] = useState(0);
  const [hideDistance, setHideDistance] = useState(false);
  const [licensePrice, setLicensePrice] = useState(63388);

  const fuelCost = (totalKm / 3) * fuelPrice * busCount;
  const licenseCost = licensePrice * busCount;
  const driverCostTkoProduksi = driverFeeTko * 20125;
  const drivercostTkokosong = driverFeeTkoKosong * 7500;
  const tkoCost = ((driverCostTkoProduksi + drivercostTkokosong) * 1.10) * 1.20;
  console.log("driverCostTkoProduksi", driverCostTkoProduksi);
  const driverCost =
    (driverFee + tkoCost) *
    driverCount *
    shifCount;
  const maintenanceCost = totalKm * maintenancePrice * busCount;
  console.log("first maintenanceCost", maintenanceCost);
  const totalDepreciationCost = depreciationCost * busCount;
  const totalDepreciationDailyCost = depreciationCost / 22;
  const totaloperational =
    fuelCost +
    maintenanceCost +
    totalDepreciationDailyCost +
    driverCost +
    tolPrice +
    licenseCost;
  const totalRent =
    ((totaloperational + (totaloperational*(margin / 100))) * dayCount * busCount);
  const totalDailyRent = totalRent / dayCount;

  // Calculate total KM
  const calculateTotalKm = () => {
    if (hideDistance) {
      return (
        (distance["pool_A"] + distance["b_Pool"]) * shifCount +
        (distance["a_B"] + distance["b_A"]) * shifCount
      );
    }

    return (
      (distance["a_B"] + distance["b_A"]) * tripCount * shifCount +
      (distance["pool_A"] + distance["b_Pool"]) * shifCount
    );
  };

  // Update total KM when distance, shifCount, or hideDistance changes
  useEffect(() => {
    setTotalKm(calculateTotalKm());
  }, [distance, shifCount, hideDistance]);
  // Handle manual changes to total KM
  const handleTotalChange = (e) => {
    const newTotalKm = Number(e.target.value);
    const currentTotal = calculateTotalKm();

    if (currentTotal === 0) {
      // Prevent division by zero: Distribute manually if total was 0
      const equalShare = newTotalKm / 4;
      setDistance({
        pool_A: equalShare,
        a_B: equalShare,
        b_A: equalShare,
        b_Pool: equalShare,
      });
    } else {
      // Adjust each distance proportionally
      const factor = newTotalKm / currentTotal;
      const updatedDistances = Object.keys(distance).reduce((acc, key) => {
        acc[key] = distance[key] * factor;
        return acc;
      }, {});

      setDistance(updatedDistances);
    }

    setTotalKm(newTotalKm);
  };
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
    doc.save(
      `${formattedStateName}_Invoice_${formattedStartDate.replace(
        /\//g,
        "-"
      )}.pdf`
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">🚍 SmartCost !</h2>
      <h6 className="text-sm mb-6 text-center text-gray-400">By Pengembangan Bisnis Transjakarta</h6>
      <BusForm
        {...{
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
        }}
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleCalculate}
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          🧮 Calculate
        </button>
        <button
          onClick={handleClear}
          className="w-1/4 p-2 bg-gray-500 text-white rounded-lg"
        >
          ❌ Clear
        </button>
      </div>
      {calculated && (
        <>
          <CalculationResults
            {...{
              totalKm,
              driverCost,
              tkoCost,
              fuelCost,
              maintenanceCost,
              totalDepreciationDailyCost,
              totalDepreciationCost,
              totaloperational,
              totalRent,
              totalDailyRent,
              tolPrice,
              licensePrice,
            }}
          />
          <button
            onClick={handleExportToPDF}
            className="mt-4 w-full p-2 bg-green-500 text-white rounded-lg"
          >
            📥 Export Invoice
          </button>
        </>
      )}
    </div>
  );
};

export default BusRentCalculator;
