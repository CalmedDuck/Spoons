if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Load environment variables in development
}

const express = require('express');
const path = require('path'); // Add this line
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../recipe/src/graphql/schema');
const resolvers = require('../recipe/src/graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RecipeBook';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Successfully connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB:', error));

// Middleware
app.use(cors());
app.use(express.json());

// Apollo Server setup
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
apolloServer.applyMiddleware({ app });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'path-to-your-react-app-build-folder')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/path-to-your-react-app-build-folder/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`);
});

