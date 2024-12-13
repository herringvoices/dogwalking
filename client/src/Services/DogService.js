export async function getAllDogs() {
  try {
    const response = await fetch("/api/dogs");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dogs = await response.json();
    return dogs;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    throw error;
  }
}

export async function addDog(dog) {
  try {
    const response = await fetch("/api/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const addedDog = await response.json();
    return addedDog;
  } catch (error) {
    console.error("Error adding a dog:", error);
    throw error;
  }
}

export async function deleteDog(dogId) {
  try {
    const response = await fetch(`/api/dogs/${dogId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Dog with ID ${dogId} deleted successfully.`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Error deleting dog with ID ${dogId}:`, error);
    throw error; // Re-throw the error for further handling
  }
}
