const User = require('../../../server/models/User'); // Import User model
const Recipe = require('../../../server/models/Recipe'); // Import Recipe model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Import axios for making API requests

const resolvers = {
    Query: {
        // Recipe-related queries
        async randomRecipes() {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
                    params: { apiKey: process.env.SPOONACULAR_API_KEY, number: 10 }
                });
                return response.data.recipes.map(recipe => ({
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    // Map other fields as necessary
                }));
            } catch (error) {
                console.error('Error fetching random recipes:', error);
                throw new Error('Failed to fetch random recipes');
            }
        },
        async getUserRecipes(_, { userId }) {
            return await Recipe.find({ userId });
        },
        async getRecipeDetails(_, { id }) {
          try {
              const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                  params: { apiKey: process.env.SPOONACULAR_API_KEY }
              });

              const recipe = response.data;
              return {
                  id: recipe.id,
                  title: recipe.title,
                  image: recipe.image,
                  servings: recipe.servings,
                  readyInMinutes: recipe.readyInMinutes,
                  instructions: recipe.analyzedInstructions.map(inst => inst.steps.map(step => step.step)).flat(),
                  ingredients: recipe.extendedIngredients.map(ingredient => ingredient.original)
              };
          } catch (error) {
              console.error('Error fetching recipe details:', error);
              throw new Error('Failed to fetch recipe details');
          }
      },
        async searchRecipes(_, { query }) {
            try {
                const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
                    params: {
                        query: query,
                        apiKey: process.env.SPOONACULAR_API_KEY
                    }
                });
                return response.data.results.map(recipe => ({
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    // Map other fields as necessary
                }));
            } catch (error) {
                console.error('Error fetching recipes from Spoonacular:', error);
                throw new Error('Failed to fetch recipes');
            }
        },
        async chatWithBot(_, { userInput, contextId }) {
            try {
                const response = await axios.get(`https://api.spoonacular.com/food/converse`, {
                    params: {
                        text: userInput,
                        contextId,
                        apiKey: process.env.SPOONACULAR_API_KEY
                    }
                });
                return {
                    answerText: response.data.answerText,
                    newContextId: response.data.contextId
                };
            } catch (error) {
                console.error('Error communicating with the chatbot:', error);
                throw new Error('Failed to communicate with the chatbot');
            }
        },
    },

    
    Mutation: {
        // User-related mutations
        register: async (_, { username, email, password }) => {
            const user = new User({ username, email, password });
            await user.save();
            return user;
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !await bcrypt.compare(password, user.password)) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { ...user._doc, token };
        },
        // Recipe-related mutations
        createRecipe: async (_, { userId, title, ingredients, instructions, readyInMinutes, servings }) => {
            const newRecipe = new Recipe({
                userId, title, ingredients, instructions, readyInMinutes, servings
            });
            return await newRecipe.save();
        },
    }
};

module.exports = resolvers;