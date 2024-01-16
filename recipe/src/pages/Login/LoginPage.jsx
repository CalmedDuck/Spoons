import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';
import "../../css/winter.css";
/*import "../../css/summer.css";
import "../../css/autumn.css";
import "../../css/spring.css";*/

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('LoginPage handleLogin - attempting login with:', { email, password });
            const { data } = await loginUser({ variables: { email, password } });
            console.log('LoginPage handleLogin - login response data:', data);

            if (data.login.token) {
                console.log('LoginPage handleLogin - received token:', data.login.token);
                login(data.login.token);
                navigate('/profile');
            } else {
                console.error('LoginPage handleLogin - No token received');
            }
        } catch (error) {
            console.error('LoginPage handleLogin - Login failed:', error);
        }
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleLogin} className="auth-form">
                <h1>Hi! Welcome Back</h1>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>Log In</button>
                {error && <p>Error: {error.message}</p>}
                <p>Don't have an account? No worries,<a href="/signup">Sign Up</a></p>
            </form>
        </div>
    );
}

export default LoginPage;
