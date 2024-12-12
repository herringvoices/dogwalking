export async function getAllWalkerCities() {
  try {
    const response = await fetch("/api/walkercities");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const walkerCities = await response.json();
    return walkerCities;
  } catch (error) {
    console.error("Error fetching walkerCities:", error);
    throw error;
  }
}
