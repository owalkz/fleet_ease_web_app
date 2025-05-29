// api/aiApis.js
const API_URL =
  import.meta.env.VITE_APP_ENVIRONMENT == "development"
    ? `/api`
    : `${import.meta.env.VITE_APP_BACKEND_URL}/api`;

export const askPlatformAssistant = async (question) => {

  const response = await fetch(`${API_URL}/ai/platform-assistant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to get answer from AI.");
  }

  return await response.json();
};
