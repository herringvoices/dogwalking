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

export async function updateWalker(walkerId, updatedWalker) {
  try {
    const response = await fetch(`/api/walkers/${walkerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWalker),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const walker = await response.json();
    console.log(`Walker with ID ${walkerId} updated successfully:`, walker);
    return walker; // Return the updated walker
  } catch (error) {
    console.error(`Error updating walker with ID ${walkerId}:`, error);
    throw error;
  }
}
