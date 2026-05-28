import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import leavesBg from '../assets/leaves.jpg';

export default function SplashPage() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Cormorant+Garamond:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          width: 100%;
          height: 100%;
          min-height: 100vh;
        }

        body {
          background-color: #1b2e17;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .splash-screen {
          width: 100vw;
          height: 100vh;
          position: relative;
          background-image: url(${leavesBg});
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── INTRO SCREEN ── */
        .intro-screen {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-image: url(${leavesBg});
          background-size: cover;
          background-position: center;
          transition: opacity 0.9s ease;
        }

        .intro-screen.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .intro-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 22, 8, 0.60);
        }

        .intro-logo-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        }

        .intro-logo {
          font-family: 'Plaster', cursive;
          font-size: 120px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: -3px;
          display: flex;
          align-items: center;
        }

        .v-letter { color: #4E8A66; }
        .ale-letters { color: #f0e8db; }

        .intro-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 300;
          color: #4E8A66;
          letter-spacing: 1px;
        }

        .intro-tagline em {
          font-style: italic;
          color: #4E8A66;
        }

        /* ── MAIN SPLASH ── */
        .splash-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,18,8,0.3) 0%,
            rgba(10,18,8,0.1) 30%,
            rgba(8,15,6,0.65) 70%,
            rgba(5,10,4,0.95) 100%
          );
          z-index: 2;
        }

        .splash-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0 80px 70px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 700px;
        }

        .splash-pill {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          padding: 6px 18px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        .splash-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.05;
          margin-bottom: 18px;
          animation: fadeUp 0.6s ease 0.25s both;
        }

        .splash-title em {
          font-style: italic;
          color: #9dd99d;
        }

        .splash-desc {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.62);
          line-height: 1.75;
          margin-bottom: 42px;
          max-width: 440px;
          animation: fadeUp 0.6s ease 0.4s both;
        }

        .splash-btn-row {
          display: flex;
          flex-direction: row;
          gap: 16px;
          animation: fadeUp 0.6s ease 0.55s both;
        }

        .btn-primary {
          height: 52px;
          padding: 0 40px;
          background: linear-gradient(140deg, #2e6e2e 0%, #3d9a3d 100%);
          border: none;
          border-radius: 30px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(45,110,45,0.45);
          transition: transform 0.14s ease, box-shadow 0.14s ease;
          white-space: nowrap;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(45,110,45,0.55);
        }

        .btn-secondary {
          height: 52px;
          padding: 0 36px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: 30px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: background 0.14s ease, border-color 0.14s ease;
          white-space: nowrap;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.4);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="splash-screen">

        {/* ── INTRO SCREEN ── */}
        <div className={`intro-screen ${!showIntro ? 'hidden' : ''}`}>
          <div className="intro-overlay" />
          <div className="intro-logo-wrap">
            <div className="intro-logo">
              <span className="v-letter">V</span>
              <span className="ale-letters">ale</span>
            </div>
            <p className="intro-tagline">
              Find comfort in <em>every</em> choice
            </p>
          </div>
        </div>

        {/* ── MAIN SPLASH ── */}
        <div className="splash-overlay" />

        <div className="splash-content">
          <span className="splash-pill">New Collection</span>
          <h1 className="splash-title">
            Shop with<br /><em>comfort</em><br />in mind.
          </h1>
          <p className="splash-desc">
            Discover products you love, delivered fast.
            Quality you can trust, prices that make sense.
          </p>
          <div className="splash-btn-row">
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              I already have an account
            </button>
          </div>
        </div>

      </div>
    </>
  );
}