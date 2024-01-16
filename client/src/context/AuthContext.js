import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; 
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        console.log('Checking token on load:', token); // Debugging log
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({ token, ...decodedToken });
            } catch (error) {
                console.error('Token decoding failed:', error);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('userToken', token);
        const decodedToken = jwtDecode(token);
        setUser({ token, ...decodedToken });
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};