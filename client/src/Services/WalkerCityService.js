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

export async function addWalkerCity(walkerCity) {
  try {
    const response = await fetch("/api/walkercities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walkerCity),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdWalkerCity = await response.json();
    console.log("WalkerCity added successfully:", createdWalkerCity);
    return createdWalkerCity;
  } catch (error) {
    console.error("Error adding walkerCity:", error);
    throw error;
  }
}

export async function deleteWalkerCity(walkerCityId) {
  try {
    const response = await fetch(`/api/walkercities/${walkerCityId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`WalkerCity with ID ${walkerCityId} deleted successfully.`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Error deleting walkerCity with ID ${walkerCityId}:`, error);
    throw error;
  }
}
