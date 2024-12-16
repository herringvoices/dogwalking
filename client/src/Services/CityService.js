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

export async function addCity(newCity) {
  try {
    const response = await fetch("/api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const addedCity = await response.json();
    console.log(`City added successfully:`, addedCity);
    return addedCity; // Return the added city
  } catch (error) {
    console.error("Error adding city:", error);
    throw error;
  }
}

export async function deleteCity(cityId) {
  try {
    const response = await fetch(`/api/cities/${cityId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`City with ID ${cityId} deleted successfully.`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Error deleting city with ID ${cityId}:`, error);
    throw error;
  }
}
