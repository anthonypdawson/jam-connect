import React from 'react';
import { User, UserInstrument } from './apiClient';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const formatLocation = () => {
    const parts = [user.city, user.state, user.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Location not set';
  };

  const formatGender = (gender?: string) => {
    if (!gender) return 'Not specified';
    return gender.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatExperienceLevel = (level: string) => {
    return level.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem 1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '2rem 3rem',
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#4338ca', marginBottom: '0.5rem' }}>Welcome, {user.name}!</h1>
          {user.bio && (
            <p style={{ color: '#374151', fontStyle: 'italic', marginBottom: '1rem' }}>"{user.bio}"</p>
          )}
        </div>

        {/* Basic Info */}
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Email</label>
              <p style={{ color: '#374151', margin: '0.25rem 0 0' }}>{user.email}</p>
            </div>
            <div>
              <label style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Age</label>
              <p style={{ color: '#374151', margin: '0.25rem 0 0' }}>{user.age || 'Not specified'}</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Gender</label>
              <p style={{ color: '#374151', margin: '0.25rem 0 0' }}>{formatGender(user.gender)}</p>
            </div>
            <div>
              <label style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Location</label>
              <p style={{ color: '#374151', margin: '0.25rem 0 0' }}>{formatLocation()}</p>
            </div>
          </div>
        </div>

        {/* Musical Info */}
        {(user.musicalInfluences || user.collaborationStyle || user.genres?.length) && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#4338ca', marginBottom: '1rem', fontSize: '1.1rem' }}>Musical Profile</h3>
            
            {user.musicalInfluences && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Musical Influences</label>
                <p style={{ color: '#374151', margin: '0.25rem 0 0' }}>{user.musicalInfluences}</p>
              </div>
            )}
            
            {user.collaborationStyle && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Collaboration Style</label>
                <p style={{ color: '#374151', margin: '0.25rem 0 0' }}>{user.collaborationStyle}</p>
              </div>
            )}
            
            {user.genres && user.genres.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Genres</label>
                <div style={{ margin: '0.25rem 0 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {user.genres.map((genre, index) => (
                    <span key={index} style={{
                      background: '#e0e7ff',
                      color: '#4338ca',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instruments */}
        {user.instruments && user.instruments.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#4338ca', marginBottom: '1rem', fontSize: '1.1rem' }}>Instruments</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {user.instruments.map((instrument) => (
                <div key={instrument.id} style={{
                  background: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ color: '#374151', fontWeight: 500, textTransform: 'capitalize' }}>
                      {instrument.instrument}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                      {formatExperienceLevel(instrument.experienceLevel)}
                    </div>
                    {instrument.yearsExperience && (
                      <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                        {instrument.yearsExperience} years
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(user.website || user.socialLinks) && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#4338ca', marginBottom: '1rem', fontSize: '1.1rem' }}>Links</h3>
            {user.website && (
              <div style={{ marginBottom: '0.5rem' }}>
                <a href={user.website} target="_blank" rel="noopener noreferrer" style={{
                  color: '#4338ca',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}>
                  🌐 {user.website}
                </a>
              </div>
            )}
            {user.socialLinks && Object.entries(user.socialLinks).map(([platform, url]) => (
              <div key={platform} style={{ marginBottom: '0.5rem' }}>
                <a href={url} target="_blank" rel="noopener noreferrer" style={{
                  color: '#4338ca',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  textTransform: 'capitalize'
                }}>
                  📱 {platform}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button style={{
            background: '#e0e7ff',
            color: '#4338ca',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 500,
            marginRight: '1rem'
          }}>
            Edit Profile
          </button>
          <button style={{
            background: '#f3f4f6',
            color: '#6b7280',
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
    </div>
  );
};

export default Profile;
