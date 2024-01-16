import { gql } from '@apollo/client';

export const RANDOM_RECIPES_QUERY = gql`
  query GetRandomRecipes {
    randomRecipes {
      id
      title
      image
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query SearchRecipes($query: String!) {
    searchRecipes(query: $query) {
      id
      title
      image
      # Add any other fields you need
    }
  }
`;

export const GET_RECIPE_DETAILS = gql`
query GetRecipeDetails($id: ID!) {
  getRecipeDetails(id: $id) {
    title
    image
    servings
    readyInMinutes
    instructions
    ingredients
  }
}
`;

export const GET_USER_RECIPES = gql`
  query GetUserRecipes($userId: ID!) {
    getUserRecipes(userId: $userId) {
      id
      title
      ingredients
      instructions
      readyInMinutes
      servings
    }
  }
`;


export const CHAT_WITH_BOT_QUERY = gql`
    query ChatWithBot($userInput: String!, $contextId: String) {
        chatWithBot(userInput: $userInput, contextId: $contextId) {
            answerText
            newContextId
        }
    }
`;