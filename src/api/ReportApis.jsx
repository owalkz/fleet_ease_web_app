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
