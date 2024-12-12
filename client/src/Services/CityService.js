export async function getAllCities() {
  try {
    const response = await fetch("/api/cities");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const cities = await response.json();
    return cities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}
