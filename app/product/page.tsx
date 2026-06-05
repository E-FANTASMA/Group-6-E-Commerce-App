// app/product/page.tsx
import React from "react";
import styles from "./product.module.css";
import Image from "next/image";
import rectangleImage from './Rectangle-36.png';

export default function ProductPage() {
  return (
    <main className={styles.container}>
      {/* Top Breadcrumb */}
      <div className={styles.backLink}>← Back to Electronics</div>

      <div className={styles.productGrid}>
        {/* Left: Image */}
        <div className={styles.imageSide}>
          <div className={styles.mainImagePlaceholder}>
            <Image src={rectangleImage} width={500} height={500} alt="JBL" />
          </div>
        </div>

        {/* Right: Details */}
        <div className={styles.infoSide}>
          <span className={styles.category}>ELECTRONICS</span>
          <h1>JBL Headphones</h1>
          <h2 className={styles.price}>
            ₦ 80,000 <span className={styles.stars}>★★★★★</span>
          </h2>

          <p className={styles.description}>
            Experience powerful bass, crystal-clear sound, and all-day comfort
            with these premium JBL wireless headphones...
          </p>

          {/* Color Selectors */}
          <div className={styles.colorSection}>
            <p>Color</p>
            <div className={styles.colorOptions}>
              <div className={`${styles.circle} ${styles.purple}`}></div>
              <div className={`${styles.circle} ${styles.blue}`}></div>
              <div className={`${styles.circle} ${styles.black}`}></div>
              <div className={`${styles.circle} ${styles.beige}`}></div>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className={styles.actions}>
            <div className={styles.quantityPicker}>
              <button>-</button> <span>1</span> <button>+</button>
            </div>
            <button className={styles.addToCartBtn}>Add to Cart</button>
            <button className={styles.cartIconBtn}>🛒</button>
          </div>
        </div>
      </div>
    </main>
  );
}
