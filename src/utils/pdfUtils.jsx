import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "/fleet_ease_logo.png?url";

const LOGO_WIDTH = 40;
const LOGO_HEIGHT = 20;
const LOGO_X = 14;
const LOGO_Y = 10;

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "N/A";

const renderDateRangeHeader = (doc, filters, y = 20) => {
  if (filters?.startDate || filters?.endDate) {
    const start = formatDate(filters.startDate);
    const end = formatDate(filters.endDate);
    doc.setFontSize(12);
    doc.text(`Filtered Date Range: ${start} → ${end}`, 14, y);
    return y + 8;
  }
  return y;
};

export const exportFleetOverviewToPDF = (
  overview,
  monthlyStats = [],
  filters = {},
  logoBase64 = null,
  preview = false
) => {
  const doc = new jsPDF();

  if (logoBase64) {
    doc.addImage(logo, "PNG", LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);
  }

  doc.setFontSize(18);
  doc.text("Fleet Overview Report", 14, logoBase64 ? 40 : 20);

  let nextY = renderDateRangeHeader(doc, filters, logoBase64 ? 50 : 30);

  autoTable(doc, {
    startY: nextY,
    head: [["Metric", "Value"]],
    body: [
      ["Total Drivers", overview.totalDrivers],
      ["Active Vehicles", overview.activeVehicles],
      ["Available Vehicles", overview.availableVehicles],
      ["Total Trips", overview.totalTrips],
      ["Completed Trips", overview.completedTrips],
      ["Pending Trips", overview.pendingTrips],
      ["Active Trips", overview.activeTrips],
      ["Total Distance", `${overview.totalDistance} km`],
      ["Harsh Events", overview.harshEventCount],
    ],
  });

  if (monthlyStats.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Month", "Trip Count"]],
      body: monthlyStats.map((stat) => [
        stat._id,
        stat.tripCount,
      ]),
    });
  }

  if (preview) {
    return doc.output("bloburl"); // <== Return blob URL
  } else {
    doc.save("fleet-overview.pdf");
  }
};

export const exportDriverReportToPDF = (
  driverSummary = [],
  expiringLicenses = [],
  filters = {},
  logoBase64 = null,
  preview = false
) => {
  const doc = new jsPDF();

  if (logoBase64) {
    doc.addImage(logo, "PNG", LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);
  }

  doc.setFontSize(18);
  doc.text("Driver Report", 14, logoBase64 ? 40 : 20);

  let nextY = renderDateRangeHeader(doc, filters, logoBase64 ? 50 : 30);

  autoTable(doc, {
    startY: nextY,
    head: [
      ["Name", "Trip Count", "Total Distance", "Harsh Events", "Avg Distance"],
    ],
    body: driverSummary.map((d) => [
      d.name,
      d.tripCount,
      `${d.totalDistance} km`,
      d.harshEvents,
      `${d.avgDistance} km`,
    ]),
  });

  if (expiringLicenses.length) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Name", "Email", "License Expiry Date"]],
      body: expiringLicenses.map((d) => [
        d.name,
        d.emailAddress,
        formatDate(d.licenseExpiryDate),
      ]),
    });
  }

  if (preview) {
    return doc.output("bloburl"); // <== Return blob URL
  } else {
    doc.save("driver-report.pdf");
  }
};

export const exportTripReportToPDF = (
  tripSummary = {},
  harshEvents = [],
  filters = {},
  logoBase64 = null,
  preview = false
) => {
  const doc = new jsPDF();

  if (logoBase64) {
    doc.addImage(logo, "PNG", LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);
  }

  doc.setFontSize(18);
  doc.text("Trip Report", 14, logoBase64 ? 40 : 20);

  let nextY = renderDateRangeHeader(doc, filters, logoBase64 ? 50 : 30);

  autoTable(doc, {
    startY: nextY,
    head: [["Metric", "Value"]],
    body: Object.entries(tripSummary).map(([key, value]) => [key, value]),
  });

  if (harshEvents.length > 0) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Trip ID", "Vehicle", "Event Count", "Start", "End"]],
      body: harshEvents.map((e) => [
        e.tripId,
        e.vehicle.licensePlateNumber,
        e.harshEventCount,
        formatDate(e.startTime),
        formatDate(e.endTime),
      ]),
    });
  }

  if (preview) {
    return doc.output("bloburl"); // <== Return blob URL
  } else {
    doc.save("trip-report.pdf");
  }
};

export const exportVehicleReportToPDF = (
  usage = [],
  breakdown = [],
  insurance = [],
  overdue = [],
  filters = {},
  logoBase64 = null,
  preview = false
) => {
  const doc = new jsPDF();

  if (logoBase64) {
    doc.addImage(logo, "PNG", LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);
  }

  doc.setFontSize(18);
  doc.text("Vehicle Report", 14, logoBase64 ? 40 : 20);

  let nextY = renderDateRangeHeader(doc, filters, logoBase64 ? 50 : 30);

  if (usage.length) {
    autoTable(doc, {
      startY: nextY,
      head: [["Make", "Model", "Plate", "Trips", "Distance", "Avg Speed"]],
      body: usage.map((v) => [
        v.make,
        v.model,
        v.licensePlateNumber,
        v.tripCount,
        `${v.totalDistance} km`,
        `${v.averageSpeed} km/h`,
      ]),
    });
    nextY = doc.lastAutoTable.finalY + 10;
  }

  if (breakdown.length) {
    autoTable(doc, {
      startY: nextY,
      head: [["Make", "Model", "Plate", "Trips", "Distance", "Avg Speed"]],
      body: breakdown.map((v) => [
        v.make,
        v.model,
        v.licensePlateNumber,
        v.tripCount,
        `${v.totalDistance} km`,
        `${v.averageSpeed} km/h`,
      ]),
    });
    nextY = doc.lastAutoTable.finalY + 10;
  }

  if (insurance.length) {
    autoTable(doc, {
      startY: nextY,
      head: [["Make", "Model", "Plate", "Insurance Expiry"]],
      body: insurance.map((v) => [
        v.make,
        v.model,
        v.licensePlateNumber,
        formatDate(v.insuranceExpiryDate),
      ]),
    });
    nextY = doc.lastAutoTable.finalY + 10;
  }

  if (overdue.length) {
    autoTable(doc, {
      startY: nextY,
      head: [["Make", "Model", "Plate", "Mileage", "Next Service"]],
      body: overdue.map((v) => [
        v.make,
        v.model,
        v.licensePlateNumber,
        `${v.mileage} km`,
        `${v.nextServiceMileage} km`,
      ]),
    });
  }

  if (preview) {
    return doc.output("bloburl"); // <== Return blob URL
  } else {
    doc.save("vahicle-report.pdf");
  }
};
