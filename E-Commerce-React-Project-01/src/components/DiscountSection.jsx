import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { discountProductsData } from '../data/productsData';

const DiscountSection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Discounts up to -50%</h2>

      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        }}
      >
        {discountProductsData.map((product) => (
          <div
            key={product.id}
            style={styles.card}
            onClick={() => navigate(`/item-details/${product.id}`)}
          >
            <div style={styles.heartWrapper}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#909090" strokeWidth="1.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <div style={styles.imageBox}>
              <img src={product.image} alt={product.name} style={styles.image} />
            </div>

            <h3 style={styles.title}>{product.name}</h3>
            <p style={styles.price}>${product.price}</p>

            <button
              style={styles.buyBtn}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/item-details/${product.id}`);
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '40px 32px',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#000000',
    marginBottom: '32px',
  },
  grid: {
    display: 'grid',
    gap: '24px',
    width: '100%',
  },
  card: {
    backgroundColor: '#F6F6F6',
    borderRadius: '9px',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    cursor: 'pointer',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '100%',
  },
  heartWrapper: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    cursor: 'pointer',
  },
  imageBox: {
    width: '100%',
    height: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    marginTop: '16px',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  title: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#000000',
    margin: '0 0 12px 0',
    lineHeight: '1.3',
    minHeight: '36px',
  },
  price: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#000000',
    margin: '0 0 16px 0',
  },
  buyBtn: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    border: 'none',
    width: '100%',
    padding: '12px 0',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

export default DiscountSection;