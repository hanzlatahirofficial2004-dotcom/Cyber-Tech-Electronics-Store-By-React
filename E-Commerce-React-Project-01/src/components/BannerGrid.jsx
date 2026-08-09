import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import airpodsImg from '../assets/airpods.png';
import visionImg from '../assets/vision-pro.png';
import ps5Img from '../assets/ps5.png';
import macbookImg from '../assets/macbook.png';

const BannerGrid = () => {
  // 1. Hook declaration yahan aayegi
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const banners = [
    {
      id: 1,
      titleLight: 'Apple AirPods ',
      titleBold: 'Max',
      description: 'Computational audio. Listen, it’s powerful',
      bgColor: '#EDEDED',
      textColor: '#000000',
      subtextColor: '#656565',
      image: airpodsImg,
      hasButton: false,
    },
    {
      id: 2,
      titleLight: 'Apple Vision ',
      titleBold: 'Pro',
      description: 'An immersive way to experience entertainment',
      bgColor: '#353535',
      textColor: '#FFFFFF',
      subtextColor: '#909090',
      image: visionImg,
      hasButton: false,
    },
    {
      id: 3,
      titleLight: 'Playstation ',
      titleBold: '5',
      description: 'Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.',
      bgColor: '#FFFFFF',
      textColor: '#000000',
      subtextColor: '#656565',
      image: ps5Img,
      hasButton: false,
    },
    {
      id: 4,
      titleLight: 'Macbook ',
      titleBold: 'Air',
      description: 'The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.',
      bgColor: '#EDEDED',
      textColor: '#000000',
      subtextColor: '#656565',
      image: macbookImg,
      hasButton: true,
      buttonText: 'Shop Now',
    },
  ];

  return (
    <section
      style={{
        ...styles.gridContainer,
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {banners.map((item) => (
        <div
          key={item.id}
          style={{
            ...styles.card,
            backgroundColor: item.bgColor,
            width: isMobile ? '100%' : '25%',
          }}
        >
          <div style={styles.imageBox}>
            <img src={item.image} alt={item.titleBold} style={styles.image} />
          </div>

          <div style={styles.contentBox}>
            <h2 style={{ ...styles.title, color: item.textColor }}>
              <span style={styles.titleLight}>{item.titleLight}</span>
              <span style={styles.titleBold}>{item.titleBold}</span>
            </h2>

            <p style={{ ...styles.description, color: item.subtextColor }}>
              {item.description}
            </p>

            {/* 2. Button onClick event yahan update hoga */}
            {item.hasButton && (
              <button 
                style={styles.button}
                onClick={() => navigate('/products')}
              >
                {item.buttonText}
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

const styles = {
  gridContainer: {
    display: 'flex',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '36px 20px',
    textAlign: 'center',
    boxSizing: 'border-box',
    minHeight: '380px',
  },
  imageBox: {
    width: '100%',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 10px 0',
    lineHeight: '1.2',
    fontFamily: "'Inter', sans-serif",
  },
  titleLight: {
    fontWeight: '300',
  },
  titleBold: {
    fontWeight: '700',
  },
  description: {
    fontSize: '13px',
    lineHeight: '1.4',
    margin: '0 0 16px 0',
    maxWidth: '240px',
  },
  button: {
    backgroundColor: 'transparent',
    color: '#000000',
    border: '1.5px solid #000000',
    padding: '10px 28px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
};

export default BannerGrid;