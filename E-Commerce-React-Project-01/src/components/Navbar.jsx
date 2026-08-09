import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Wishlist option added in navLinks
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Cart', path: '/cart' },
    { name: 'Shipping', path: '/shipping' },
    { name: 'Payment', path: '/payment' },
  ];

  return (
    <nav style={styles.navContainer}>
      <div style={styles.navHeader}>
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logo}>cyber</div>
        </Link>
        
        {/* Hamburger / Close Icon */}
        <div style={styles.menuIcon} onClick={toggleMenu}>
          {isOpen ? (
            <span style={styles.closeIcon}>✕</span>
          ) : (
            <>
              <span style={styles.bar}></span>
              <span style={styles.bar}></span>
              <span style={styles.bar}></span>
            </>
          )}
        </div>
      </div>

      {/* Floating Card Dropdown Menu */}
      {isOpen && (
        <div style={styles.dropdownMenu}>
          <ul style={styles.navList}>
            {navLinks.map((item, index) => (
              <li 
                key={index} 
                style={{
                  ...styles.navItem,
                  borderBottom: index === navLinks.length - 1 ? 'none' : '1px solid #f0f0f0',
                }}
              >
                <Link 
                  to={item.path} 
                  style={styles.navLink}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e5e5',
    position: 'relative',
    zIndex: 1000,
  },
  navHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
  },
  logoLink: {
    textDecoration: 'none',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
  },
  menuIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    width: '28px',
    height: '28px',
  },
  closeIcon: {
    fontSize: '22px',
    fontWeight: '300',
    color: '#000000',
  },
  bar: {
    width: '24px',
    height: '2px',
    backgroundColor: '#000000',
    borderRadius: '2px',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: '15px',
    width: '225px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.25)',
    padding: '20px 0',
    zIndex: 1001,
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    padding: '0 16px',
    textAlign: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#111111',
    fontSize: '16px',
    fontWeight: '500',
    display: 'block',
    padding: '12px 8px',
    transition: 'color 0.2s ease',
  },
};

export default Navbar;