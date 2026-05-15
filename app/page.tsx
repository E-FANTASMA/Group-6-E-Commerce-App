// app/page.tsx
import React from 'react';
import styles from './page.module.css'; 

export default function Home() {
  const bestPicks = [
    { id: 1, name: 'JBL Headphones', price: '₦ 80,000', desc: 'Comfort, High-quality sounds', rating: 5 },
    { id: 2, name: 'Face Cleanser', price: '₦ 20,000', desc: 'With natural ingredients for daily use', rating: 5 },
    { id: 3, name: 'Yoga Mat(Non-Slip)', price: '₦ 6,500', desc: 'Cushioned mat for yoga, workouts', rating: 5 },
    { id: 4, name: 'Travel Backpack', price: '₦ 35,000', desc: 'Waterproof, Spacial and durable bag', rating: 5 },
  ];

  return (
    <div className={styles['vale-container']}>
      {/* Top Banner Info */}
      <div className={styles['top-banner']}>
        <span>+234-802-331-5387</span>
        <span>Get a 20% Coupon today! | Shop Now</span>
        <span>Eng | Location</span>
      </div>

      {/* Navigation */}
      <header className={styles['navbar']}>
        <div className={styles['logo']}>Vale</div>
        <div className={styles['tagline']}>Find comfort in every choice</div>
        <div className={styles['search-bar']}>
          <input type="text" placeholder="Search" />
          <button className={styles['search-btn']}>🔍</button>
        </div>
        <div className={styles['nav-icons']}>
          <span>Account 👤</span>
          <span>Cart 🛒</span>
        </div>
      </header>

      <nav className={styles['categories-nav']}>
        <button className={styles['cat-btn']}>Categories ∨</button>
        <div className={styles['nav-links']}>
          <span>Deals %</span>
          <span>Best-Selling Items 👍</span>
          <span>5-Star Rated</span>
          <span>New In</span>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className={styles['hero-banner']}>
        <img 
  src="/hero-banner.png" 
  alt="Description of the image" 
  className="hero-img"/>
        <div className={styles['hero-content']}>
          <h1>Get a 20% Coupon</h1>
          <button className={styles['see-more']}>See more</button>
        </div>
        <div className={styles['hero-illustration']}>
          <div className={styles['hand-icon']}>💵 🛍️</div>
        </div>
      </section>

      {/* Best Picks Section */}
      <main className={styles['best-picks']}>
        <h2 className={styles['section-title']}>Best Picks</h2>
        <div className={styles['product-grid']}>
          {bestPicks.map(item => (
            <div key={item.id} className={styles['product-card']}>
              <div className={styles['image-placeholder']}></div>
              <div className={styles['product-info']}>
                <h3>{item.name} <span className={styles['price']}>{item.price}</span></h3>
                <p>{item.desc}</p>
                <div className={styles['rating']}>{'★'.repeat(item.rating)}</div>
                <div className={styles['card-actions']}>
                  <button className={styles['add-btn']}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}