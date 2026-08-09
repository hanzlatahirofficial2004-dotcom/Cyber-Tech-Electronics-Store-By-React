import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer style={styles.footerContainer}>
      <div
        style={{
          ...styles.contentWrapper,
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}
      >
        {/* Brand Info Column */}
        <div style={styles.brandColumn}>
          <h2 style={styles.logo}>cyber</h2>
          <p style={styles.description}>
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p>
        </div>

        {/* Services Column */}
        <div style={styles.column}>
          <h3 style={styles.columnHeading}>Services</h3>
          <ul style={styles.list}>
            <li><a href="#bonus" style={styles.link}>Bonus program</a></li>
            <li><a href="#gift" style={styles.link}>Gift cards</a></li>
            <li><a href="#credit" style={styles.link}>Credit and payment</a></li>
            <li><a href="#contracts" style={styles.link}>Service contracts</a></li>
            <li><a href="#noncash" style={styles.link}>Non-cash account</a></li>
            <li><a href="#payment" style={styles.link}>Payment</a></li>
          </ul>
        </div>

        {/* Assistance Column */}
        <div style={styles.column}>
          <h3 style={styles.columnHeading}>Assistance to the buyer</h3>
          <ul style={styles.list}>
            <li><a href="#order" style={styles.link}>Find an order</a></li>
            <li><a href="#delivery" style={styles.link}>Terms of delivery</a></li>
            <li><a href="#exchange" style={styles.link}>Exchange and return of goods</a></li>
            <li><a href="#guarantee" style={styles.link}>Guarantee</a></li>
            <li><a href="#faq" style={styles.link}>Frequently asked questions</a></li>
            <li><a href="#terms" style={styles.link}>Terms of use of the site</a></li>
          </ul>
        </div>
      </div>

      {/* Social Icons Row */}
      <div style={styles.socialRow}>
        {/* Twitter / X Icon */}
        <a href="#twitter" style={styles.socialIcon} aria-label="Twitter">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        {/* Facebook Icon */}
        <a href="#facebook" style={styles.socialIcon} aria-label="Facebook">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
          </svg>
        </a>

        {/* TikTok Icon */}
        <a href="#tiktok" style={styles.socialIcon} aria-label="TikTok">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.05.82.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.12z"/>
          </svg>
        </a>

        {/* Instagram Icon */}
        <a href="#instagram" style={styles.socialIcon} aria-label="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    backgroundColor: '#181818',
    color: '#FFFFFF',
    padding: '80px 32px 48px 32px',
    fontFamily: "'Inter', sans-serif",
    width: '100%',
    boxSizing: 'border-box',
  },
  contentWrapper: {
    maxWidth: '1120px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '48px',
    flexWrap: 'wrap',
  },
  brandColumn: {
    maxWidth: '380px',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '-1px',
    margin: '0 0 16px 0',
    color: '#FFFFFF', // Logo color fixed to white
  },
  description: {
    color: '#909090',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#FFFFFF',
    margin: '0 0 20px 0',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    color: '#909090',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s ease',
  },
  socialRow: {
    maxWidth: '1120px',
    margin: '48px auto 0 auto',
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    alignItems: 'center',
  },
  socialIcon: {
    color: '#FFFFFF',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    transition: 'opacity 0.2s ease',
  },
};

export default Footer;