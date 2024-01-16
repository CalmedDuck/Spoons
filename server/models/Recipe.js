const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    recipeId: { 
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    ingredients: [String], 
    instructions: [String], 
    readyInMinutes: Number,
    servings: Number,
    image: String, 
    source: String, 
    created: { 
        type: Boolean,
        default: false
    },
    spoonacularCardUrl: String, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
