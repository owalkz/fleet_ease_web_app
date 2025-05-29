export const fetchManagerOverviewReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/manager/overview`
      : `${import.meta.env.VITE_APP_BACKEND_URL}/api/reports/manager/overview`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchMonthlyTripStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/monthly-trip-stats`
      : `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/reports/monthly-trip-stats`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchDriverSummaryReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/driver/summary`
      : `${import.meta.env.VITE_APP_BACKEND_URL}/api/reports/driver/summary`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchDriverPerformanceReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/driver/performance`
      : `${import.meta.env.VITE_APP_BACKEND_URL}/api/reports/driver/performance`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchDriversWithExpiringLicenses = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/driver/license-expiry`
      : `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/reports/driver/license-expiry`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchTripSummaryReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/trips/summary`
      : `${import.meta.env.VITE_APP_BACKEND_URL}/api/reports/trips/summary`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchHarshEventsReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/trips/harsh-events`
      : `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/reports/trips/harsh-events`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchVehicleUsageReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/vehicle-usage-report`
      : `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/reports/vehicle-usage-report`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchVehicleUsageBreakdown = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/vehicle/usage-breakdown`
      : `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/reports/vehicle/usage-breakdown`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchVehiclesWithExpiringInsurance = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/vehicle/insurance-expiry`
      : `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/reports/vehicle/insurance-expiry`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};

export const fetchServiceOverdueVehicles = async () => {
  try {
    const token = localStorage.getItem("token");
    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/reports/vehicle/service-overdue`
      : `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/reports/vehicle/service-overdue`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching manager report:", error);
    throw error;
  }
};
