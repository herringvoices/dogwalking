export async function getAllWalkers() {
  try {
    const response = await fetch("/api/walkers");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const walkers = await response.json();
    return walkers;
  } catch (error) {
    console.error("Error fetching walkers:", error);
    throw error;
  }
}

export async function deleteWalker(walkerId) {
  try {
    const response = await fetch(`/api/walkers/${walkerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Walker with ID ${walkerId} deleted successfully.`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Error deleting walker with ID ${walkerId}:`, error);
    throw error; // Re-throw the error for further handling
  }
}
