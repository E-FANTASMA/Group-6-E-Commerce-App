import { useNavigate } from 'react-router-dom';
import homepagePhone from '../assets/homepage phone.jpg';
import fashionCircle from '../assets/fashion-circle.jpg';
import phoneCircle from '../assets/phone circle.jpg';
import beautyCircle from '../assets/beauty-circle.jpg';
import homeCircle from '../assets/home-circle.jpg';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plaster&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background-color: #2b1d18;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .phone {
          width: 375px;
          min-height: 812px;
          background: #f5f2ec;
          border-radius: 0;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
          padding-bottom: 70px;
        }

        /* ── TOP BAR ── */
        .top-bar {
          padding: 14px 18px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f5f2ec;
        }

        .top-left p:first-child {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: #999;
        }

        .top-left p:last-child {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .vale-logo {
          font-family: 'Plaster', cursive;
          font-size: 22px;
          color: #1a4d2e;
          letter-spacing: -0.5px;
        }

        .vale-logo span { color: #2d7a4f; }

        /* ── SEARCH BAR ── */
        .search-row {
          padding: 0 18px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-icon-btn {
          width: 38px;
          height: 38px;
          background: #fff;
          border: 1.5px solid #e6e1db;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        .search-bar {
          flex: 1;
          height: 38px;
          background: #ffffff;
          border: 1.5px solid #e6e1db;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 14px;
          cursor: pointer;
        }

        .search-bar span {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #bbb;
        }

        .bell-btn {
          width: 38px;
          height: 38px;
          background: #fff;
          border: 1.5px solid #e6e1db;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* ── HERO BANNER ── */
        .hero-banner {
          margin: 0 18px 20px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          height: 160px;
        }

        .hero-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 65%);
        }

        .hero-text {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
        }

        .hero-percent {
          font-family: 'Inter', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #2d7a4f;
          line-height: 1;
        }

        .hero-discount {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #2d7a4f;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .explore-btn {
          background: #f5f2ec;
          border: none;
          border-radius: 4px;
          padding: 5px 10px;
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
        }

        /* ── SECTION HEADER ── */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18px;
          margin-bottom: 14px;
        }

        .section-title {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .see-all {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #2d7a4f;
          text-decoration: none;
          cursor: pointer;
        }

        /* ── CATEGORIES ── */
        .categories-row {
          display: flex;
          gap: 16px;
          padding: 0 18px;
          margin-bottom: 24px;
          overflow-x: auto;
        }

        .categories-row::-webkit-scrollbar { display: none; }

        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .category-circle {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #e6e1db;
        }

        .category-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: #555;
        }

        /* ── NEW ARRIVALS ── */
        .products-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 0 18px;
          margin-bottom: 20px;
        }

        .product-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.14s ease;
        }

        .product-card:hover { transform: translateY(-2px); }

        .product-img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          background: #e8e4de;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-img-placeholder {
          width: 100%;
          height: 150px;
          background: #e8e4de;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-info {
          padding: 10px 10px 12px;
        }

        .product-name {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .product-price {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #c0392b;
          margin-bottom: 3px;
        }

        .product-sold {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: #aaa;
        }

        /* ── BOTTOM NAV ── */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          width: 375px;
          height: 64px;
          background: #ffffff;
          border-top: 1px solid #ece8e2;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 100;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 8px 16px;
        }

        .nav-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: #bbb;
        }

        .nav-label.active { color: #1a4d2e; }

        .home-bar {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 4px;
          background: rgba(0,0,0,0.12);
          border-radius: 3px;
        }
      `}</style>

      <div className="phone">

        {/* STATUS BAR */}
        <div style={{ padding: '14px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f2ec' }}>
          <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600 }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="#1a1a1a">
              <rect x="0" y="7" width="3" height="5" rx="0.8" opacity="0.4"/>
              <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" opacity="0.6"/>
              <rect x="9" y="2" width="3" height="10" rx="0.8"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.8"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 24 18" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round">
              <path d="M1 6.5C4.5 3 9 1 12 1s7.5 2 11 5.5"/>
              <path d="M4 10c2-2 4.5-3.5 8-3.5s6 1.5 8 3.5"/>
              <path d="M7.5 13.5c1.5-1.5 2.5-2 4.5-2s3 .5 4.5 2"/>
              <circle cx="12" cy="17" r="1.5" fill="#1a1a1a"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="2.2" stroke="#1a1a1a" strokeWidth="1.5"/>
              <rect x="2.5" y="2.5" width="16" height="7" rx="1.2" fill="#1a1a1a"/>
              <rect x="23" y="4" width="2" height="4" rx="1" fill="#1a1a1a" opacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* TOP BAR */}
        <div className="top-bar">
          <div className="top-left">
            <p>Hello!</p>
            <p>Find your next item</p>
          </div>
          <div className="vale-logo">
            <span>V</span>ale
          </div>
        </div>

        {/* SEARCH ROW */}
        <div className="search-row">
          <button className="search-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
          <div className="search-bar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span>Search</span>
          </div>
          <button className="bell-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
        </div>

        {/* HERO BANNER */}
        <div className="hero-banner">
          <img src={homepagePhone} alt="50% Discount"/>
          <div className="hero-overlay"/>
          <div className="hero-text">
            <div className="hero-percent">50%</div>
            <div className="hero-discount">DISCOUNT</div>
            <button className="explore-btn">EXPLORE COLLECTION</button>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="section-header">
          <span className="section-title">Categories</span>
          <span className="see-all">See all</span>
        </div>

        <div className="categories-row">
          <div className="category-item">
            <div className="category-circle">
              <img src={fashionCircle} alt="Fashion"/>
            </div>
            <span className="category-label">Fashion</span>
          </div>
          <div className="category-item">
            <div className="category-circle">
              <img src={phoneCircle} alt="Mobile"/>
            </div>
            <span className="category-label">Mobile</span>
          </div>
          <div className="category-item">
            <div className="category-circle">
              <img src={beautyCircle} alt="Beauty"/>
            </div>
            <span className="category-label">Beauty</span>
          </div>
          <div className="category-item">
            <div className="category-circle">
              <img src={homeCircle} alt="Home"/>
            </div>
            <span className="category-label">Home</span>
          </div>
        </div>

        {/* NEW ARRIVALS */}
        <div className="section-header">
          <span className="section-title">New Arrivals</span>
        </div>

        <div className="products-grid">
          <div className="product-card" onClick={() => navigate('/product/1')}>
            <div className="product-img-placeholder" style={{ background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#666', fontSize: 11 }}>Image</span>
            </div>
            <div className="product-info">
              <p className="product-name">Graphic Sweatshirt</p>
              <p className="product-price">NGN 40,000</p>
              <p className="product-sold">100k+ sold</p>
            </div>
          </div>

          <div className="product-card" onClick={() => navigate('/product/2')}>
            <div className="product-img-placeholder" style={{ background: '#d4c5a9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#888', fontSize: 11 }}>Image</span>
            </div>
            <div className="product-info">
              <p className="product-name">Reading lamp</p>
              <p className="product-price">NGN 25,000</p>
              <p className="product-sold">58k+ sold</p>
            </div>
          </div>

          <div className="product-card" onClick={() => navigate('/product/3')}>
            <div className="product-img-placeholder" style={{ background: '#e8c4b8' }}>
              <span style={{ color: '#888', fontSize: 11 }}>Image</span>
            </div>
            <div className="product-info">
              <p className="product-name">Product 3</p>
              <p className="product-price">NGN 15,000</p>
              <p className="product-sold">20k+ sold</p>
            </div>
          </div>

          <div className="product-card" onClick={() => navigate('/product/4')}>
            <div className="product-img-placeholder" style={{ background: '#c8d8c8' }}>
              <span style={{ color: '#888', fontSize: 11 }}>Image</span>
            </div>
            <div className="product-info">
              <p className="product-name">Product 4</p>
              <p className="product-price">NGN 32,000</p>
              <p className="product-sold">10k+ sold</p>
            </div>
          </div>
        </div>

        <div className="home-bar"/>

        {/* BOTTOM NAV */}
        <div className="bottom-nav">
          <div className="nav-item" onClick={() => navigate('/')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="nav-label active">Home</span>
          </div>
          <div className="nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span className="nav-label">Shop</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/cart')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="nav-label">Cart</span>
          </div>
          <div className="nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="nav-label">Account</span>
          </div>
        </div>

      </div>
    </>
  );
}
