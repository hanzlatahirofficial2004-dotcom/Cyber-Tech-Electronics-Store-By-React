import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const [promoCode, setPromoCode] = useState('');
  const [bonusCard, setBonusCard] = useState('');

  // Dynamic Calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const tax = cartItems.length > 0 ? 50 : 0;
  const shipping = cartItems.length > 0 ? 29 : 0;
  const grandTotal = subtotal + tax + shipping;

  // Checkout click par Shipping Page par route karne ke liye handler
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/shipping');
    }
  };

  return (
    <div style={styles.container}>
      {/* Page Title */}
      <h2 style={styles.pageTitle}>Shopping Cart</h2>

      {/* SECTION 1: Product Items List (Pic 1) */}
      <div style={styles.itemsListSection}>
        {cartItems.length === 0 ? (
          <div style={styles.emptyCartBox}>
            <p style={{ color: '#666', fontSize: '15px' }}>Your shopping cart is empty.</p>
            <button style={styles.continueBtn} onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} style={styles.cartItemRow}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />

              <div style={styles.itemInfo}>
                <h4 style={styles.itemName}>{item.name}</h4>
                <span style={styles.itemSku}>#{item.id.toString().padStart(12, '251395')}</span>

                <div style={styles.quantityControls}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    –
                  </button>
                  <span style={styles.qtyValue}>{item.quantity}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={styles.priceAndRemove}>
                <span style={styles.itemPrice}>${Number(item.price) * item.quantity}</span>
                <span
                  style={styles.removeIcon}
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SECTION 2: Order Summary (Pic 2) */}
      <div style={styles.summaryCard}>
        <h3 style={styles.summaryHeading}>Order Summary</h3>

        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Discount code / Promo code</label>
          <input
            type="text"
            placeholder="Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            style={styles.textInput}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Your bonus card number</label>
          <div style={styles.bonusInputWrapper}>
            <input
              type="text"
              placeholder="Enter Card Number"
              value={bonusCard}
              onChange={(e) => setBonusCard(e.target.value)}
              style={styles.textInputFlex}
            />
            <button style={styles.applyBtn}>Apply</button>
          </div>
        </div>

        {/* Calculation Rows */}
        <div style={styles.calcRow}>
          <span>Subtotal</span>
          <strong>${subtotal}</strong>
        </div>

        <div style={styles.calcRow}>
          <span style={{ color: '#777' }}>Estimated Tax</span>
          <span>${tax}</span>
        </div>

        <div style={styles.calcRow}>
          <span style={{ color: '#777' }}>Estimated shipping & Handling</span>
          <span>${shipping}</span>
        </div>

        <div style={{ ...styles.calcRow, marginTop: '16px', borderTop: '1px solid #E0E0E0', paddingTop: '16px' }}>
          <strong>Total</strong>
          <strong style={{ fontSize: '18px' }}>${grandTotal}</strong>
        </div>

        <button
          style={{
            ...styles.checkoutBtn,
            opacity: cartItems.length === 0 ? 0.6 : 1,
            cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
          }}
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>

      {/* SECTION 3: Footer (Pic 3) */}
      <div style={styles.footer}>
        <h2 style={styles.footerLogo}>cyber</h2>
        <p style={styles.footerText}>
          We are a residential interior design firm located in Portland. Our boutique-studio offers more than
        </p>

        <div style={styles.footerSection}>
          <h4 style={styles.footerSubTitle}>Services</h4>
          <span style={styles.footerLink}>Bonus program</span>
          <span style={styles.footerLink}>Gift cards</span>
          <span style={styles.footerLink}>Credit and payment</span>
          <span style={styles.footerLink}>Service contracts</span>
          <span style={styles.footerLink}>Non-cash account</span>
          <span style={styles.footerLink}>Payment</span>
        </div>

        <div style={styles.footerSection}>
          <h4 style={styles.footerSubTitle}>Assistance to the buyer</h4>
          <span style={styles.footerLink}>Find an order</span>
          <span style={styles.footerLink}>Terms of delivery</span>
          <span style={styles.footerLink}>Exchange and return of goods</span>
          <span style={styles.footerLink}>Guarantee</span>
          <span style={styles.footerLink}>Frequently asked questions</span>
          <span style={styles.footerLink}>Terms of use of the site</span>
        </div>

        <div style={styles.socialIconsRow}>
          <span>🐦</span>
          <span>📘</span>
          <span>🎵</span>
          <span>📷</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px 16px 40px 16px',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '24px',
  },
  itemsListSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px',
  },
  cartItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #F0F0F0',
    paddingBottom: '20px',
  },
  itemImage: {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    backgroundColor: '#F8F8F8',
    borderRadius: '10px',
    padding: '6px',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: '13px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    lineHeight: '1.3',
  },
  itemSku: {
    fontSize: '11px',
    color: '#999',
    display: 'block',
    marginBottom: '8px',
  },
  quantityControls: {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid #E0E0E0',
    borderRadius: '6px',
    padding: '2px 8px',
    gap: '12px',
  },
  qtyBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '16px',
    cursor: 'pointer',
  },
  qtyValue: {
    fontSize: '13px',
    fontWeight: '600',
  },
  priceAndRemove: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  itemPrice: {
    fontSize: '16px',
    fontWeight: '700',
  },
  removeIcon: {
    cursor: 'pointer',
    color: '#999',
    fontSize: '14px',
  },
  emptyCartBox: {
    textAlign: 'center',
    padding: '40px 0',
  },
  continueBtn: {
    marginTop: '12px',
    padding: '10px 20px',
    backgroundColor: '#000',
    color: '#FFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  summaryCard: {
    border: '1px solid #E0E0E0',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '40px',
  },
  summaryHeading: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  inputLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#666',
    marginBottom: '6px',
  },
  textInput: {
    width: '100%',
    padding: '12px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  bonusInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    paddingRight: '6px',
  },
  textInputFlex: {
    flex: 1,
    padding: '12px',
    border: 'none',
    outline: 'none',
    fontSize: '13px',
  },
  applyBtn: {
    padding: '8px 16px',
    backgroundColor: '#FFF',
    border: '1px solid #000',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
  },
  calcRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    marginBottom: '10px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#000',
    color: '#FFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '20px',
  },
  footer: {
    backgroundColor: '#181313',
    color: '#FFFFFF',
    padding: '30px 20px',
    borderRadius: '16px',
    textAlign: 'center',
  },
  footerLogo: {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 10px 0',
  },
  footerText: {
    fontSize: '12px',
    color: '#A0A0A0',
    lineHeight: '1.5',
    marginBottom: '24px',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  },
  footerSubTitle: {
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  footerLink: {
    fontSize: '12px',
    color: '#B0B0B0',
  },
  socialIconsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '18px',
    marginTop: '20px',
  },
};

export default CartPage;