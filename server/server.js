const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../recipe/src/graphql/schema');
const resolvers = require('../recipe/src/graphql/resolvers');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RecipeBook';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

app.use(cors());
app.use(express.json());

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Wrapped in an async function
async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  // Catch-all handler for any request that doesn't match the above
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`);
  });
}

startServer();
