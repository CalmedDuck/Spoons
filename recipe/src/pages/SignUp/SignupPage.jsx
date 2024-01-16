import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import './SignupPage.css';
import "../../css/winter.css";
/*import "../../css/summer.css";
import "../../css/autumn.css";
import "../../css/spring.css";*/

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            console.log('Signup successful:', data);
            navigate('/login');
        },
        onError: (error) => {
            console.error('Signup failed:', error);
        },
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ variables: { username, email, password } });
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleSignup} className="auth-form">
                <h1>Hi! Welcome to your virtual Cook Book!</h1>
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <button type="submit" disabled={loading}>Sign Up</button>
                {error && <p>Error: {error.message}</p>}
                <p>Already have an account? What are you waiting for, <a href="/login">Log In</a></p>
            </form>
        </div>
    );
}

export default SignupPage;
