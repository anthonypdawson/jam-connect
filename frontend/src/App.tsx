import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { apiClient, User } from './apiClient';


function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('jamconnect_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    
    const response = await apiClient.signUp(form);
    
    if (response.error) {
      setError(response.error);
    } else {
      alert('Sign up successful!');
      setShowSignUp(false);
      setForm({ name: '', email: '', password: '' });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please enter email and password.');
      return;
    }
    setLoginError('');
    
    const response = await apiClient.login(loginForm);
    
    if (response.error) {
      setLoginError(response.error);
    } else if (response.data) {
      setUser(response.data.user);
      localStorage.setItem('jamconnect_user', JSON.stringify(response.data.user));
      setShowLogin(false);
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jamconnect_user');
  };

  if (user) {
    return <Profile user={user} onLogout={handleLogout} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '2rem 3rem',
        maxWidth: '420px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          color: '#4338ca'
        }}>JamConnect</h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#374151',
          marginBottom: '1.5rem'
        }}>
          A sustainable, intent-based platform for musicians to connect and collaborate—locally or remotely—based on creative resonance and musical philosophy.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button style={{
            background: '#4338ca',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(67,56,202,0.08)'
          }} onClick={() => setShowSignUp(true)}>
            Sign Up
          </button>
          <button style={{
            background: '#e0e7ff',
            color: '#4338ca',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 500
          }} onClick={() => setShowLogin(true)}>
            Log In
          </button>
        </div>
        <SignUpModal
          show={showSignUp}
          form={form}
          error={error}
          onChange={handleChange}
          onSubmit={handleSignUp}
          onCancel={() => setShowSignUp(false)}
        />
        <LoginModal
          show={showLogin}
          form={loginForm}
          error={loginError}
          onChange={handleLoginChange}
          onSubmit={handleLogin}
          onCancel={() => setShowLogin(false)}
        />
      </div>
      <footer style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.95rem' }}>
        &copy; {new Date().getFullYear()} JamConnect. For musicians, by musicians.
      </footer>
    </div>
  );
}

export default App;
