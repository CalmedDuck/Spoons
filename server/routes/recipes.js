const express = require('express');
const axios = require('axios');
const multer = require('multer');
const Recipe = require('../models/Recipe');
const router = express.Router();


const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;


router.get('/searchRecipes', async (req, res) => {
    try {
        const { query, cuisine, diet, ...otherParams } = req.query;
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}`;

        const response = await axios.get(apiUrl, {
            params: {
                query,
                cuisine,
                diet,
                ...otherParams
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/randomRecipes', async (req, res) => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                number: 10 // Number of random recipes
            }
        });
        res.json(response.data.recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getUserRecipes/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const recipes = await Recipe.find({ userId });
        res.json(recipes);
    } catch (error) {
        console.error('Error in /getUserRecipes:', error);
        res.status(500).json({ message: "Internal server error", error: error.toString() });
    }
});

router.post('/createRecipe', async (req, res) => {
    try {
        const { userId, title, ingredients, instructions, readyInMinutes, servings } = req.body;

        const newRecipe = new Recipe({
            userId,
            title,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split('\n'),
            instructions: Array.isArray(instructions) ? instructions : instructions.split('\n'),
            readyInMinutes,
            servings
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        console.error("Error in /api/createRecipe:", error);
        res.status(500).json({ message: "Internal server error", error: error.toString() });
    }
});

router.get('/getRecipeDetails/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

