export const getTripDetails = async (tripId) => {
  try {
    const token = localStorage.getItem("token");

    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/trips/getTrip/${tripId}`
      : `${import.meta.env.VITE_APP_BACKEND_URL}/api/trips/getTrip/${tripId}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error("Failed to fetch trip details");

    return data;
  } catch (error) {
    console.error("Error fetching trip details:", error);
    throw error;
  }
};

export const getManagerTrips = async () => {
  try {
    const token = localStorage.getItem("token");

    const isDevelopment = import.meta.env.MODE === "development";

    const url = isDevelopment
      ? `/api/trips/manager`
      : `${import.meta.env.VITE_APP_BACKEND_URL}/api/trips/manager`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error("Failed to fetch trip details");

    return data;
  } catch (error) {
    console.error("Error fetching trip details:", error);
    throw error;
  }
};
