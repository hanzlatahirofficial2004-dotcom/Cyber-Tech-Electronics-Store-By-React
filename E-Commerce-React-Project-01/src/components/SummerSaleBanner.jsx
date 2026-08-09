import React from 'react';
import { useNavigate } from 'react-router-dom';

import foldImg from '../assets/summer-fold.png';
import macbookImg from '../assets/summer-macbook.png';
import iphoneImg from '../assets/summer-iphone.png';
import watchImg from '../assets/summer-watch.png';

const SummerSaleBanner = () => {
  const navigate = useNavigate();

  return (
    <section style={styles.bannerContainer}>
      {/* Floating Product Images */}
      <img src={foldImg} alt="Foldable Phone" style={styles.foldImg} />
      <img src={macbookImg} alt="MacBook" style={styles.macbookImg} />
      <img src={iphoneImg} alt="iPhone 14 Pro" style={styles.iphoneImg} />
      <img src={watchImg} alt="Apple Watch" style={styles.watchImg} />

      {/* Main Center Content */}
      <div style={styles.contentBox}>
        <h2 style={styles.title}>
          <span style={styles.titleThin}>Big Summer </span>
          <span style={styles.titleBold}>Sale</span>
        </h2>

        <p style={styles.description}>
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>

        <button
          style={styles.button}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

const styles = {
  bannerContainer: {
    width: '100%',
    backgroundColor: '#2E2E2E',
    backgroundImage: 'radial-gradient(circle at center, #3A3A3A 0%, #1A1A1A 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '120px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
    minHeight: '440px',
  },
  foldImg: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    maxHeight: '440px',
    objectFit: 'contain',
    pointerEvents: 'none',
  },
  macbookImg: {
    position: 'absolute',
    top: '0',
    left: '0',
    maxWidth: '280px',
    height: 'auto',
    pointerEvents: 'none',
  },
  iphoneImg: {
    position: 'absolute',
    top: '0',
    right: '0',
    maxWidth: '260px',
    height: 'auto',
    pointerEvents: 'none',
  },
  watchImg: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    maxWidth: '200px',
    height: 'auto',
    pointerEvents: 'none',
  },
  contentBox: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '480px',
  },
  title: {
    fontSize: '52px',
    color: '#FFFFFF',
    margin: '0 0 16px 0',
    lineHeight: '1.1',
    letterSpacing: '-1px',
  },
  titleThin: {
    fontWeight: '200',
  },
  titleBold: {
    fontWeight: '700',
  },
  description: {
    color: '#909090',
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 32px 0',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    border: '1.5px solid #FFFFFF',
    padding: '14px 48px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default SummerSaleBanner;