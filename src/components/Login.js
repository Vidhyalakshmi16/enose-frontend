import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: username,
                password,
            });

            if (response.status === 200) {
                // ✅ Store JWT token for authentication
                localStorage.setItem('token', response.data.token);

                // ✅ Store user email (optional)
                localStorage.setItem('user', JSON.stringify({ email: username }));

                alert('✅ Login successful!');
                navigate('/dashboard'); // ✅ Redirect to Dashboard
            }
        } catch (error) {
            alert(error.response?.data?.message || '❌ Login failed!');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                email: username,
                password,
            });

            if (response.status === 201) {
                alert('✅ Registration successful! Please log in.');
                setIsRegistering(false);
            }
        } catch (error) {
            alert(error.response?.data?.message || '❌ Registration failed!');
        }
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <h2>E-NOSE</h2>
            </header>

            <div className="login-form">
                <h3>{isRegistering ? 'Register' : 'Login'}</h3>

                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button onClick={isRegistering ? handleRegister : handleLogin}>
                    {isRegistering ? 'Register' : 'Login'}
                </button>

                {!isRegistering ? (
                    <div className="toggle-register">
                        <span>Don't have an account? </span>
                        <button onClick={() => setIsRegistering(true)}>Register</button>
                    </div>
                ) : (
                    <div className="toggle-register">
                        <span>Already have an account? </span>
                        <button onClick={() => setIsRegistering(false)}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
