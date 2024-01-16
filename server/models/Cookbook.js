const mongoose = require('mongoose');

const cookbookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe' // Reference to the Recipe model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Cookbook = mongoose.model('Cookbook', cookbookSchema);

module.exports = Cookbook;
