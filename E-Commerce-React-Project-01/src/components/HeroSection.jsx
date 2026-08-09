import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-iphone.png';

const HeroSection = () => {
  // 1. Hook declaration yahan aayegi
  const navigate = useNavigate();

  return (
    <section style={styles.heroContainer}>
      <div style={styles.textContent}>
        <p style={styles.subtitle}>Pro.Beyond.</p>
        
        <h1 style={styles.titleWrapper}>
          <span style={styles.titleThin}>IPhone 14</span>
          <span style={styles.titleBold}>Pro</span>
        </h1>
        
        <p style={styles.description}>
          Created to change everything for the<br />better. For everyone
        </p>
        
        {/* 2. Button onClick event yahan update hoga */}
        <button 
          style={styles.button}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </button>
      </div>
      
      <div style={styles.imageWrapper}>
        <img src={heroImg} alt="iPhone 14 Pro" style={styles.image} />
      </div>
    </section>
  );
};

const styles = {
  heroContainer: {
    backgroundColor: '#211C24',
    color: '#ffffff',
    padding: '48px 24px 0px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  textContent: {
    maxWidth: '360px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    color: '#909090',
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: '0.2px',
    marginBottom: '8px',
    opacity: 0.8,
  },
  titleWrapper: {
    margin: '0',
    padding: '0',
    lineHeight: '1.05',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleThin: {
    fontSize: '62px',
    fontWeight: '100',
    letterSpacing: '-1px',
    color: '#ffffff',
  },
  titleBold: {
    fontSize: '76px',
    fontWeight: '600',
    letterSpacing: '-1px',
    color: '#ffffff',
    marginTop: '-8px',
  },
  description: {
    color: '#909090',
    fontSize: '16px',
    lineHeight: '1.4',
    fontWeight: '400',
    margin: '16px 0 28px 0',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1.5px solid #ffffff',
    padding: '14px 48px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '320px',
    marginTop: '32px',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
};

export default HeroSection;