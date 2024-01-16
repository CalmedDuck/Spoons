import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { jwtDecode } from 'jwt-decode'; 
import { CREATE_RECIPE } from '../../graphql/mutations';
import './CreateRecipeForm.css';

function CreateRecipeForm({ onRecipeCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        readyInMinutes: '',
        servings: '',
    });

    const [createRecipe] = useMutation(CREATE_RECIPE);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('userToken'); // Get token from localStorage
        let userId;

        if (token) {
            const decoded = jwtDecode(token);
            userId = decoded.userId;
        }

        if (!userId) {
            console.error('UserId is undefined. Unable to create recipe.');
            return;
        }

        const { title, ingredients, instructions, readyInMinutes, servings } = formData;

        try {
            await createRecipe({
                variables: {
                    userId, // Add userId to the variables
                    title, 
                    ingredients: ingredients.split('\n'), 
                    instructions: instructions.split('\n'), 
                    readyInMinutes: parseInt(readyInMinutes), 
                    servings: parseInt(servings) 
                }
            });
            // Call the onRecipeCreated callback function
            if (onRecipeCreated) {
                onRecipeCreated();
            }
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
    };

    return (
        <div className="create-recipe-form-container">
            <form onSubmit={handleSubmit} className="create-recipe-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="ingredients"
                    placeholder="Ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="readyInMinutes"
                    placeholder="Preparation Time (minutes)"
                    value={formData.readyInMinutes}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="servings"
                    placeholder="Servings"
                    value={formData.servings}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
}

export default CreateRecipeForm;
