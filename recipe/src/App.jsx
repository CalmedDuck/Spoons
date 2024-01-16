import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import SearchRecipesPage from './pages/SearchRecipesPage/SearchRecipesPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignUp/SignupPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import { AuthProvider } from './context/AuthContext';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // This line needs to be updated
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<SearchRecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Other routes */}
          </Routes>
          <Footer/>
      
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
