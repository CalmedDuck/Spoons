
// make a search to spoonacular food api
// example search:
// https://api.spoonacular.com/recipes/complexSearch?apiKey={YOUR-API-KEY}&query=pasta
export const queryRecipes = (query) => {
    return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}`);
};

// get recipes by recipe id from spoonacular food api
export const getOneRecipe = (recID) => {
    return fetch(`https://api.spoonacular.com/recipes/${recID}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`)
};