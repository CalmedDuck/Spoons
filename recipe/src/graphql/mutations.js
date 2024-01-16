import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
      token
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($userId: ID!, $title: String!, $ingredients: [String]!, $instructions: [String]!, $readyInMinutes: Int, $servings: Int) {
    createRecipe(userId: $userId, title: $title, ingredients: $ingredients, instructions: $instructions, readyInMinutes: $readyInMinutes, servings: $servings) {
      id
      title
      ingredients
      instructions
      readyInMinutes
      servings
    }
  }
`;
