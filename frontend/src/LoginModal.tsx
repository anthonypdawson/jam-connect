import React from 'react';

interface LoginModalProps {
  show: boolean;
  form: { email: string; password: string };
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, form, error, onChange, onSubmit, onCancel }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <form onSubmit={onSubmit} style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        padding: '2rem 2.5rem',
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative'
      }}>
        <h2 style={{ color: '#4338ca', marginBottom: '0.5rem' }}>Log In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #e0e7ff', fontSize: '1rem' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #e0e7ff', fontSize: '1rem' }}
        />
        {error && <div style={{ color: 'red', fontSize: '0.95rem' }}>{error}</div>}
        <button type="submit" style={{
          background: '#4338ca',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 500,
          marginTop: '0.5rem'
        }}>
          Log In
        </button>
        <button type="button" style={{
          background: '#e0e7ff',
          color: '#4338ca',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          fontSize: '0.95rem',
          cursor: 'pointer',
          fontWeight: 500
        }} onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
