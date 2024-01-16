import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_RECIPES } from '../../graphql/queries';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [executeSearch, { loading, data }] = useLazyQuery(SEARCH_RECIPES, {
    variables: { query }
  });

  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      executeSearch();
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div>
        {loading ? <p>Loading...</p> : data?.searchRecipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            {/* Additional recipe details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchComponent;
