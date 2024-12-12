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
