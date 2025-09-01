import React from 'react';

interface ProfileProps {
  user: { id: number; name: string; email: string };
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => (
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
      <h1 style={{ color: '#4338ca', marginBottom: '1rem' }}>Welcome, {user.name}!</h1>
      <p style={{ color: '#374151', marginBottom: '1rem' }}>This is your profile page.</p>
      <div style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>Email: {user.email}</div>
      <button style={{
        background: '#e0e7ff',
        color: '#4338ca',
        border: 'none',
        borderRadius: '8px',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: 500
      }} onClick={onLogout}>
        Log Out
      </button>
    </div>
  </div>
);

export default Profile;
