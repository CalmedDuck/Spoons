const BASE_URL = 'https://spoons.onrender.com/'; // Replace with your backend's URL

export const searchRecipes = async (queryParams) => {
  try {
    const response = await fetch(`${BASE_URL}/api/searchRecipes?${new URLSearchParams(queryParams)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
};
