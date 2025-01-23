import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3003/api/login', formData);

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        alert('Successfully logged in!');
        navigate('/'); // Redirect to homepage or dashboard
      } else {
        alert(response.data.msg);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <p className="forgot-password">
          <a href="/forgotpwd">Forgot Password?</a>
        </p>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <p className="register-link">
        Don&apos;t have an account?{' '}
        <a href="/signup" onClick={() => navigate('/signup')}>Sign Up</a>
      </p>
    </div>
  );
};

export default LoginPage;
