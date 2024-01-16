const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Recipe {
    id: ID!
    userId: String!
    title: String!
    image: String
    servings: Int
    readyInMinutes: Int
    instructions: [String]!
    ingredients: [String]!
  }

  type ChatbotResponse {
    answerText: String
    newContextId: String
  }

  type Query {
    randomRecipes: [Recipe]
    getUserRecipes(userId: ID!): [Recipe]
    getRecipeDetails(id: ID!): Recipe
    searchRecipes(query: String!): [Recipe]
    chatWithBot(userInput: String!, contextId: String): ChatbotResponse
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createRecipe(
      userId: ID!
      title: String!
      ingredients: [String]!
      instructions: [String]!
      readyInMinutes: Int
      servings: Int
    ): Recipe
  }
`;

module.exports = typeDefs;
