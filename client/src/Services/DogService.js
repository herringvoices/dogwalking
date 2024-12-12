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
