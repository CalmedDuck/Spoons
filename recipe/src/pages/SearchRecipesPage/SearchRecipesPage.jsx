import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_RECIPES } from '../../graphql/queries';
import './SearchRecipesPage.css';
import "../../css/winter.css";
/*import "../../css/summer.css";
import "../../css/autumn.css";
import "../../css/spring.css";*/

function SearchRecipesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [executeSearch, { loading, data }] = useLazyQuery(SEARCH_RECIPES, {
        variables: { query: searchQuery }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
          executeSearch();
        }
    };

    const recipes = data ? data.searchRecipes : [];

    return (
        <div className="search-recipes-page">
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>Search</button>
                </form>
            </div>
            <div className="search-results">
                {loading ? <p>Loading...</p> : 
                    recipes.map(recipe => (
                        <div key={recipe.id} className="recipe-item">
                            <h3>{recipe.title}</h3>
                            <img src={recipe.image} alt={recipe.title} />
                            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SearchRecipesPage;
