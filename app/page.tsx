// app/page.tsx
import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import promoBannerImg from './public-domain-vectors-1ejSq5XU890-unsplash 1.png'

export default function Home() {
  const bestPicks = [
    { id: 1, name: 'JBL Headphones', price: '₦ 80,000', desc: 'Comfort, High-quality sounds' },
    { id: 2, name: 'Face Cleanser', price: '₦ 20,000', desc: 'With natural ingredients for daily use' },
    { id: 3, name: 'Yoga Mat(Non-Slip)', price: '₦ 6,500', desc: 'Cushioned mat for yoga, workouts' },
    { id: 4, name: 'Travel Backpack', price: '₦ 35,000', desc: 'Waterproof, Spacial and durable bag' },
  ];

  return (
    <div className={styles.valeContainer}>
      {/* Top Banner Info */}
      <div className={styles.topBanner}>
        <span>📞 +234-802-331-5387</span>
        <span>Get a 20% Coupon today! | <a href="#">Shop Now</a></span>
        <span>Eng ▾ | Location ▾</span>
      </div>

      {/* Main Navigation */}
      <header className={styles.navbar}>
        <div className={styles.logo}>Vale</div>
        <div className={styles.tagline}>Find comfort in every choice</div>
        <div className={styles.searchBarContainer}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
          <button className={styles.searchBtn}>🔍</button>
        </div>
        <div className={styles.navIcons}>
          <span>Account 👤</span>
          <span>Cart 🛒</span>
        </div>
      </header>

      {/* Categories Sub-Nav */}
      <nav className={styles.subNav}>
        <button className={styles.categoriesBtn}>Categories ▾</button>
        <a href="#">Deals %</a>
        <a href="#">Best-Selling Items 👍</a>
        <a href="#">5-Star Rated</a>
        <a href="#">New In</a>
      </nav>

      {/* Promo Banner Section */}
      <section className={styles.promoBanner}>
        <div className={styles.promoTextSide}>
          <h1>Get a 20%<br />Coupon</h1>
          <button className={styles.seeMoreBtn}>See more</button>
        </div>
        <div className={styles.promoImageSide}>
          <Image src={promoBannerImg} alt="Promo Banner" width={400} height={200} priority />
        </div>
      </section>

      {/* Best Picks Section */}
      <section className={styles.bestPicksSection}>
        <h2 className={styles.sectionTitle}>Best Picks</h2>
        
        <div className={styles.productGrid}>
          {bestPicks.map((item) => (
            
            <div key={item.id} className={styles.productCard}>
              

                <span>[ Image for {item.name} ]</span>
              
              <div className={styles.productInfo}>
                <div className={styles.productHeader}>
                  <span className={styles.productName}>{item.name}</span>
                  <span className={styles.productPrice}>{item.price}</span>
                </div>
                <p className={styles.productDesc}>{item.desc}</p>
                <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                <div className={styles.cardButtons}>
                  <button className={styles.addBtn}>Add to cart</button>
                  <button className={styles.buyBtn}>Buy now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}