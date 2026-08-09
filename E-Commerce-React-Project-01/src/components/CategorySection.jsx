import React, { useState, useEffect } from 'react';

// Category Icons Imports (Double Extension handled)
import phoneIcon from '../assets/cat-phones.png';
import watchIcon from '../assets/cat-watches.png';
import cameraIcon from '../assets/cat-cameras.png';
import headphoneIcon from '../assets/cat-headphones.png';
import computerIcon from '../assets/cat-computers.png';
import gamingIcon from '../assets/cat-gaming.png';

const CategorySection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 1, title: 'Phones', icon: phoneIcon },
    { id: 2, title: 'Smart Watches', icon: watchIcon },
    { id: 3, title: 'Cameras', icon: cameraIcon },
    { id: 4, title: 'Headphones', icon: headphoneIcon },
    { id: 5, title: 'Computers', icon: computerIcon },
    { id: 6, title: 'Gaming', icon: gamingIcon },
  ];

  return (
    <section style={styles.sectionContainer}>
      {/* Header with Title and Nav Arrows */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Browse By Category</h2>
        <div style={styles.arrowsContainer}>
          <button style={styles.arrowBtn}>&lt;</button>
          <button style={styles.arrowBtn}>&gt;</button>
        </div>
      </div>

      {/* Categories Grid / Row */}
      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
        }}
      >
        {categories.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.iconWrapper}>
              <img src={item.icon} alt={item.title} style={styles.icon} />
            </div>
            <p style={styles.cardTitle}>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  sectionContainer: {
    width: '100%',
    maxWidth: '100%', // Full width setup
    margin: '0 auto',
    padding: '60px 32px', // Side padding balance
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#000000',
    margin: 0,
  },
  arrowsContainer: {
    display: 'flex',
    gap: '12px',
  },
  arrowBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '22px',
    fontWeight: '400',
    cursor: 'pointer',
    color: '#000000',
    padding: '0 8px',
  },
  grid: {
    display: 'grid',
    gap: '24px', // Cards ke darmiyan exact equal space
    width: '100%',
  },
  card: {
    backgroundColor: '#EDEDED',
    borderRadius: '12px',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  icon: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#000000',
    margin: 0,
    textAlign: 'center',
  },
};

export default CategorySection;