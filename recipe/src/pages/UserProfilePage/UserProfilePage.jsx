import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { jwtDecode } from 'jwt-decode'; 
import { GET_USER_RECIPES } from '../../graphql/queries';
import { CREATE_RECIPE } from '../../graphql/mutations';
import CreateRecipeForm from '../../components/CreateRecipeForm/CreateRecipeForm';
import './UserProfilePage.css';
import "../../css/winter.css";
/*import "../../css/summer.css";
import "../../css/autumn.css";
import "../../css/spring.css";*/

function UserProfilePage() {
    const token = localStorage.getItem('userToken');
    let userId;

    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
    }

    const { loading, error, data, refetch } = useQuery(GET_USER_RECIPES, {
        variables: { userId },
        skip: !userId
    });

    const [createRecipe] = useMutation(CREATE_RECIPE);

    const handleSaveRecipe = async (recipeData) => {
        if (!userId) {
            console.error('UserId is undefined. Unable to create recipe.');
            return;
        }

        try {
            await createRecipe({
                variables: { userId, ...recipeData }
            });
            refetch(); 
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    const handleRecipeCreated = () => {
        refetch();
    };

    if (!userId) {
        return <p>User not found. Please log in.</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading recipes: {error.message}</p>;
    }
    return (
        <div className="user-profile-page">
            <h1>User Profile</h1>
            <CreateRecipeForm onSave={handleSaveRecipe} onRecipeCreated={handleRecipeCreated} />
            <h2>Saved Recipes</h2>
            <div>
                {data?.getUserRecipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        <h3>{recipe.title}</h3>
                        {recipe.image && <img src={recipe.image} alt={recipe.title} />} {/* Display image if available */}
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions.join(', ')}</p>
                        <p><strong>Prep time:</strong> {recipe.readyInMinutes} minutes</p>
                        <p><strong>Servings:</strong> {recipe.servings}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserProfilePage;