require('dotenv').config(); // This should be the first line

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../recipe/src/graphql/schema');
const resolvers = require('../recipe/src/graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/RecipeBook';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Successfully connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB:', error));

app.use(cors());
app.use(express.json());

// Apollo Server setup
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo Server
async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`);
  });
}

startApolloServer();