import React from 'react';
import { useNavigate } from 'react-router-dom';
import ipadBannerImg from '../assets/ipad-banner.png';

const PromoBanner = () => {
  const navigate = useNavigate();

  return (
    <section style={styles.bannerContainer}>
      <div style={styles.contentWrapper}>
        {/* Banner Image */}
        <div style={styles.imageBox}>
          <img src={ipadBannerImg} alt="iPad Pro" style={styles.image} />
        </div>

        {/* Text Content */}
        <div style={styles.textBox}>
          <h2 style={styles.title}>Ipad Pro</h2>
          
          <p style={styles.description}>
            iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
          </p>

          <button 
            style={styles.button}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </button>

          {/* Carousel Indicator Dots */}
          <div style={styles.dotsContainer}>
            <span style={{ ...styles.dot, ...styles.activeDot }}></span>
            <span style={styles.dot}></span>
            <span style={styles.dot}></span>
            <span style={styles.dot}></span>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  bannerContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    padding: '48px 24px 32px 24px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  contentWrapper: {
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  imageBox: {
    width: '100%',
    maxWidth: '540px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  textBox: {
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '44px',
    fontWeight: '300',
    color: '#000000',
    margin: '0 0 12px 0',
    letterSpacing: '-0.5px',
  },
  description: {
    fontSize: '14px',
    color: '#909090',
    lineHeight: '1.5',
    fontWeight: '400',
    margin: '0 0 28px 0',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#000000',
    border: '1.5px solid #000000',
    padding: '12px 48px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '36px',
    transition: 'all 0.3s ease',
  },
  dotsContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#D9D9D9',
    display: 'inline-block',
  },
  activeDot: {
    backgroundColor: '#000000',
  },
};

export default PromoBanner;