import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    console.log('ProtectedRoute - isLoading:', isLoading, 'user:', user); // Debugging log

    if (isLoading) {
        return <div>Loading...</div>; // Loading indicator
    }

    if (!user) {
        console.log('Redirecting to login...'); // Debugging log
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;