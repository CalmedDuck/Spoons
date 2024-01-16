import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE_DETAILS } from '../../graphql/queries';
import './RecipeDetailsPage.css';
import "../../css/winter.css";
/*import "../../css/summer.css";
import "../../css/autumn.css";
import "../../css/spring.css";*/ 

function RecipeDetailsPage() {
    const { id } = useParams();
    
    // GraphQL query hook
    const { loading, data, error } = useQuery(GET_RECIPE_DETAILS, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading recipe details: {error.message}</p>;

    const { getRecipeDetails: recipeDetails } = data;

    return (
        <div className="recipe-details">
            <h1>{recipeDetails.title}</h1>
            <img src={recipeDetails.image} alt={recipeDetails.title} />
            <h2>Ingredients</h2>
            <ul>
                {recipeDetails.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            {/* Render other recipe details */}
        </div>
    );
}

export default RecipeDetailsPage;
