import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8070/users/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      console.log('Login successful:', user);

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      switch (user.userType) {
        case 'Resident':
          navigate('/villagerDashboard');
          break;
        case 'Grama Niladhari':
          navigate('/gramaniladharidashboard');
          break;
        case 'Divisional Secrateriat':
          navigate('/divDash');
          break;
        default:
          navigate('/villagerDashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        const errorMessage = err.response.data?.message || 'An error occurred during login. Please try again.';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'beige',
    },
    formWrapper: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
    },
    heading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: 'orange',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    errorMessage: {
      color: 'red',
      marginBottom: '20px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>User Login</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <button
              type="submit"
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
