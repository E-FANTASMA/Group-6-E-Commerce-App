import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clothesImg from '../assets/clothes.jpg';
import { extractToken, login, setAuthToken } from '../api/auth';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
    if (password.length < 6) { alert('Please enter your password.'); return; }

    try {
      setIsSubmitting(true);
      const response = await login({ email, password });
      const token = extractToken(response);
      if (!token) {
        alert('Login succeeded but no session was returned. If email confirmation is enabled, confirm your email then try again.');
        return;
      }
      setAuthToken(token);
      navigate('/dashboard');
    } catch (error: any) {
      alert(error?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          width: 100% !important;
          height: 100% !important;
          min-height: 100vh !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #f5f2ec !important;
          font-family: 'Inter', sans-serif !important;
        }

        .field-input {
          width: 100%;
          height: 50px;
          background: #ffffff;
          border: 1.5px solid #e6e1db;
          border-radius: 10px;
          padding: 0 48px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #222;
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .field-input:focus {
          border-color: #2d7a4f;
          box-shadow: 0 0 0 3px rgba(45,122,79,0.1);
        }

        .login-btn {
          width: 100%;
          height: 52px;
          background: linear-gradient(140deg, #2d7a4f 0%, #4EA8A6 80%);
          border: none;
          border-radius: 30px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(45,122,79,0.35);
          transition: transform 0.14s ease;
          margin-bottom: 24px;
        }

        .login-btn:hover { transform: translateY(-1px); }

        .social-btn {
          width: 52px;
          height: 52px;
          background: #ffffff;
          border: 1.5px solid #e6e1db;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.14s ease;
        }

        .social-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* FULL SCREEN WRAPPER */}
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
      }}>

        {/* LEFT PANEL */}
        <div style={{
          width: '45%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <img
            src={clothesImg}
            alt="Welcome back"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* centered text overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 44px',
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 46,
              fontWeight: 700,
              color: '#1a4d2e',
              lineHeight: 1.1,
              marginBottom: 12,
            }}>
              Welcome Back!
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: '#555',
              lineHeight: 1.65,
            }}>
              Continue curating your taste by logging in with your personal info
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          flex: 1,
          height: '100%',
          background: '#f5f2ec',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 8%',
          overflowY: 'auto',
        }}>
          <div style={{ width: '100%', maxWidth: 420 }}>

            {/* Title */}
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 28,
              fontWeight: 600,
              color: '#1a4d2e',
              marginBottom: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}>
              Log in to&nbsp;
              <span style={{ fontFamily: "'Plaster', cursive", fontSize: 30, letterSpacing: -0.5 }}>
                <span style={{ color: '#4E8A66' }}>V</span>
                <span style={{ color: '#c8b89a' }}>ale</span>
              </span>
            </div>

            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 8 }}>
                Email address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <polyline points="2,7 12,14 22,7"/>
                  </svg>
                </span>
                <input className="field-input" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input className="field-input" id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}/>
                <button style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 4 }} type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b0aca6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: 14, height: 14, accentColor: '#1a4d2e', cursor: 'pointer' }}/>
                <label htmlFor="remember" style={{ fontSize: 13, color: '#777', cursor: 'pointer' }}>Remember Me</label>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 500, color: '#e53935', cursor: 'pointer' }}>
                Forgot password
              </button>
            </div>

            {/* Login button */}
            <button className="login-btn" onClick={handleLogin} disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{ flex: 1, height: 1, background: '#dbd6d0' }}/>
              <span style={{ fontSize: 12, color: '#aaa', whiteSpace: 'nowrap' }}>Or log in with</span>
              <div style={{ flex: 1, height: 1, background: '#dbd6d0' }}/>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 26 }}>
              <button className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </button>
              <button className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0f0f0f">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#888' }}>
              Don't have an account?
              <button
                type="button"
                onClick={() => navigate('/signup')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginLeft: 3,
                  color: '#1a4d2e',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Sign up.
              </button>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
