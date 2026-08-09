import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Card Image Import (Apne src/assets/ folder me credit-card.png save kar lein)
import creditCardImg from '../assets/credit-card.png';

const defaultAddresses = [
  {
    id: 1,
    title: '2118 Thornridge',
    tag: 'HOME',
    fullAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    phone: '(209) 555-0104',
  },
  {
    id: 2,
    title: 'Headoffice',
    tag: 'OFFICE',
    fullAddress: '2715 Ash Dr. San Jose, South Dakota 83475',
    phone: '(704) 555-0127',
  },
];

const ShippingPage = () => {
  const navigate = useNavigate();

  // Active Step: 1 for Address, 2 for Shipping, 3 for Payment
  const [activeStep, setActiveStep] = useState(1);

  // Addresses State
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(1);

  // Modal State & Form Fields
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTag, setFormTag] = useState('HOME');
  const [formAddressStr, setFormAddressStr] = useState('');
  const [formPhone, setFormPhone] = useState('');

  // Shipping Method State
  const [selectedShipment, setSelectedShipment] = useState('free');

  // Step 3 Payment State
  const [paymentTab, setPaymentTab] = useState('credit'); // credit, paypal, paypal_credit
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [sameBilling, setSameBilling] = useState(true);

  // Open Modal for Add New
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormTitle('');
    setFormTag('HOME');
    setFormAddressStr('');
    setFormPhone('');
    setShowModal(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (e, item) => {
    e.stopPropagation();
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormTag(item.tag);
    setFormAddressStr(item.fullAddress);
    setFormPhone(item.phone);
    setShowModal(true);
  };

  // Submit Handler for both Add & Edit
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!formTitle || !formAddressStr) return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: formTitle,
                tag: formTag,
                fullAddress: formAddressStr,
                phone: formPhone || item.phone,
              }
            : item
        )
      );
    } else {
      const newObj = {
        id: Date.now(),
        title: formTitle,
        tag: formTag,
        fullAddress: formAddressStr,
        phone: formPhone || '(000) 000-0000',
      };
      setAddresses([...addresses, newObj]);
      setSelectedAddressId(newObj.id);
    }

    setShowModal(false);
  };

  // Remove Address Handler
  const handleRemoveAddress = (id) => {
    if (addresses.length <= 1) {
      alert('At least one address is required.');
      return;
    }
    const filtered = addresses.filter((item) => item.id !== id);
    setAddresses(filtered);
    if (selectedAddressId === id) {
      setSelectedAddressId(filtered[0].id);
    }
  };

  // Payment Submit Handler
  const handlePay = (e) => {
    e.preventDefault();
    alert('Payment Successful! Thank you for your order.');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Dynamic Top Steps Navigation */}
      <div style={styles.stepsHeader}>
        {activeStep === 1 && (
          <>
            <div style={styles.stepTab} onClick={() => setActiveStep(1)}>
              <div style={styles.stepIconBlack}>📍</div>
              <div>
                <div style={styles.stepSubTitle}>Step 1</div>
                <div style={styles.stepMainTitle}>Address</div>
              </div>
            </div>

            <div style={{ ...styles.stepTab, opacity: 0.4 }} onClick={() => setActiveStep(2)}>
              <div style={styles.stepIconGray}>🚚</div>
              <div>
                <div style={styles.stepSubTitle}>Step 2</div>
                <div style={styles.stepMainTitle}>Shipping</div>
              </div>
            </div>
          </>
        )}

        {(activeStep === 2 || activeStep === 3) && (
          <>
            <div
              style={{ ...styles.stepTab, opacity: activeStep === 2 ? 1 : 0.4 }}
              onClick={() => setActiveStep(2)}
            >
              <div style={activeStep === 2 ? styles.stepIconBlack : styles.stepIconGray}>🚚</div>
              <div>
                <div style={styles.stepSubTitle}>Step 2</div>
                <div style={styles.stepMainTitle}>Shipping</div>
              </div>
            </div>

            <div
              style={{ ...styles.stepTab, opacity: activeStep === 3 ? 1 : 0.4 }}
              onClick={() => setActiveStep(3)}
            >
              <div style={activeStep === 3 ? styles.stepIconBlack : styles.stepIconGray}>💳</div>
              <div>
                <div style={styles.stepSubTitle}>Step 3</div>
                <div style={styles.stepMainTitle}>Payment</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ================= STEP 1: ADDRESS SELECTION ================= */}
      {activeStep === 1 && (
        <div>
          <h3 style={styles.sectionHeading}>Select Address</h3>

          <div style={styles.cardsList}>
            {addresses.map((item) => {
              const isSelected = selectedAddressId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    ...styles.addressCard,
                    border: isSelected ? '1px solid #000' : '1px solid transparent',
                  }}
                  onClick={() => setSelectedAddressId(item.id)}
                >
                  <div style={styles.cardHeaderRow}>
                    <div style={styles.radioTitleRow}>
                      <span style={isSelected ? styles.radioSelected : styles.radioUnselected} />
                      <strong style={styles.addressTitle}>{item.title}</strong>
                      <span style={styles.tagBadge}>{item.tag}</span>
                    </div>

                    <div style={styles.actionsRow}>
                      <span
                        style={styles.iconBtn}
                        onClick={(e) => handleOpenEditModal(e, item)}
                        title="Edit Address"
                      >
                        ✏️
                      </span>
                      <span
                        style={styles.iconBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveAddress(item.id);
                        }}
                        title="Delete Address"
                      >
                        ✕
                      </span>
                    </div>
                  </div>

                  <p style={styles.addressDetails}>{item.fullAddress}</p>
                  <p style={styles.addressPhone}>{item.phone}</p>
                </div>
              );
            })}
          </div>

          <div style={styles.addAddressDivider} onClick={handleOpenAddModal}>
            <div style={styles.addIconCircle}>+</div>
          </div>
          <p style={styles.addAddressText} onClick={handleOpenAddModal}>
            Add New Address
          </p>

          <div style={styles.buttonsRow}>
            <button style={styles.backBtn} onClick={() => navigate('/cart')}>
              Back
            </button>
            <button style={styles.nextBtn} onClick={() => setActiveStep(2)}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: SHIPMENT METHOD ================= */}
      {activeStep === 2 && (
        <div>
          <h3 style={styles.sectionHeading}>Shipment Method</h3>

          <div style={styles.cardsList}>
            <div
              style={{
                ...styles.shippingCard,
                border: selectedShipment === 'free' ? '1px solid #000' : '1px solid #EAEAEA',
              }}
              onClick={() => setSelectedShipment('free')}
            >
              <div style={styles.shippingTopRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={selectedShipment === 'free' ? styles.radioSelected : styles.radioUnselected} />
                  <strong>Free</strong>
                </div>
                <span style={styles.dateText}>17 Oct, 2026</span>
              </div>
              <p style={styles.shippingSubText}>Regulary shipment</p>
            </div>

            <div
              style={{
                ...styles.shippingCard,
                border: selectedShipment === 'express' ? '1px solid #000' : '1px solid #EAEAEA',
              }}
              onClick={() => setSelectedShipment('express')}
            >
              <div style={styles.shippingTopRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={selectedShipment === 'express' ? styles.radioSelected : styles.radioUnselected} />
                  <strong>$8.50</strong>
                </div>
                <span style={styles.dateText}>1 Oct, 2026</span>
              </div>
              <p style={styles.shippingSubText}>Get your delivery as soon as possible</p>
            </div>

            <div
              style={{
                ...styles.shippingCard,
                border: selectedShipment === 'schedule' ? '1px solid #000' : '1px solid #EAEAEA',
              }}
              onClick={() => setSelectedShipment('schedule')}
            >
              <div style={styles.shippingTopRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={selectedShipment === 'schedule' ? styles.radioSelected : styles.radioUnselected} />
                  <strong style={{ color: selectedShipment === 'schedule' ? '#000' : '#888' }}>
                    Schedule
                  </strong>
                </div>
                <div style={styles.selectDateWrapper}>
                  <span>Select Date</span>
                  <span>▼</span>
                </div>
              </div>
              <p style={styles.shippingSubText}>Pick a date when you want to get your delivery</p>
            </div>
          </div>

          <div style={styles.buttonsRow}>
            <button style={styles.backBtn} onClick={() => setActiveStep(1)}>
              Back
            </button>
            <button style={styles.nextBtn} onClick={() => setActiveStep(3)}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: PAYMENT ================= */}
      {activeStep === 3 && (
        <div>
          <h3 style={styles.sectionHeading}>Payment</h3>

          {/* Payment Method Tabs */}
          <div style={styles.paymentTabsRow}>
            <span
              style={{
                ...styles.paymentTabBtn,
                borderBottom: paymentTab === 'credit' ? '2px solid #000' : 'none',
                fontWeight: paymentTab === 'credit' ? '700' : '500',
                color: paymentTab === 'credit' ? '#000' : '#888',
              }}
              onClick={() => setPaymentTab('credit')}
            >
              Credit Card
            </span>
            <span
              style={{
                ...styles.paymentTabBtn,
                borderBottom: paymentTab === 'paypal' ? '2px solid #000' : 'none',
                fontWeight: paymentTab === 'paypal' ? '700' : '500',
                color: paymentTab === 'paypal' ? '#000' : '#888',
              }}
              onClick={() => setPaymentTab('paypal')}
            >
              PayPal
            </span>
            <span
              style={{
                ...styles.paymentTabBtn,
                borderBottom: paymentTab === 'paypal_credit' ? '2px solid #000' : 'none',
                fontWeight: paymentTab === 'paypal_credit' ? '700' : '500',
                color: paymentTab === 'paypal_credit' ? '#000' : '#888',
              }}
              onClick={() => setPaymentTab('paypal_credit')}
            >
              PayPal Credit
            </span>
          </div>

          {paymentTab === 'credit' ? (
            <form onSubmit={handlePay}>
              {/* ATM Card Visual Component */}
              <div style={styles.cardPreviewContainer}>
                <img
                  src={creditCardImg}
                  alt="Credit Card"
                  style={styles.cardImage}
                  onError={(e) => {
                    // Fallback visual agar image load na ho
                    e.target.style.display = 'none';
                  }}
                />
                <div style={styles.cardOverlayDetails}>
                  <div style={styles.cardOverlayNumber}>
                    {cardNumber || '4085 9536 8475 9530'}
                  </div>
                  <div style={styles.cardOverlayHolder}>
                    {cardName || 'Cardholder Name'}
                  </div>
                </div>
              </div>

              {/* Form Input Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  style={styles.paymentInput}
                  required
                />

                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={styles.paymentInput}
                  required
                />

                <div style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Exp.Date"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    style={{ ...styles.paymentInput, flex: 1 }}
                    required
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    style={{ ...styles.paymentInput, flex: 1 }}
                    required
                  />
                </div>
              </div>

              {/* Checkbox Same as Billing Address */}
              <div
                style={styles.checkboxRow}
                onClick={() => setSameBilling(!sameBilling)}
              >
                <div style={sameBilling ? styles.checkboxChecked : styles.checkboxUnchecked}>
                  {sameBilling && '✓'}
                </div>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>Same as billing address</span>
              </div>

              {/* Buttons */}
              <div style={styles.buttonsRow}>
                <button
                  type="button"
                  style={styles.backBtn}
                  onClick={() => setActiveStep(2)}
                >
                  Back
                </button>
                <button type="submit" style={styles.nextBtn}>
                  Pay
                </button>
              </div>
            </form>
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#666' }}>
              <p>Redirecting to {paymentTab === 'paypal' ? 'PayPal' : 'PayPal Credit'} gateway...</p>
              <div style={styles.buttonsRow}>
                <button style={styles.backBtn} onClick={() => setActiveStep(2)}>
                  Back
                </button>
                <button style={styles.nextBtn} onClick={handlePay}>
                  Proceed
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal / Form for Add & Edit Address */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <form onSubmit={handleSaveAddress}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Title / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Home 2 or Apartment"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Tag</label>
                <select
                  value={formTag}
                  onChange={(e) => setFormTag(e.target.value)}
                  style={styles.input}
                >
                  <option value="HOME">HOME</option>
                  <option value="OFFICE">OFFICE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Address</label>
                <input
                  type="text"
                  placeholder="Street, City, State, ZIP"
                  value={formAddressStr}
                  onChange={(e) => setFormAddressStr(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="text"
                  placeholder="(000) 000-0000"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.saveBtn}>
                  {editingId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  stepsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '12px',
    borderBottom: '1px solid #F0F0F0',
  },
  stepTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  stepIconBlack: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#000000',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  stepIconGray: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  stepSubTitle: { fontSize: '11px', color: '#888' },
  stepMainTitle: { fontSize: '15px', fontWeight: '700', color: '#000' },
  sectionHeading: { fontSize: '18px', fontWeight: '700', color: '#1B2141', marginBottom: '20px' },
  cardsList: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' },
  addressCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  cardHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  radioTitleRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  radioSelected: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '5px solid #000',
    backgroundColor: '#FFF',
    display: 'inline-block',
  },
  radioUnselected: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid #CCC',
    backgroundColor: '#FFF',
    display: 'inline-block',
  },
  addressTitle: { fontSize: '14px', color: '#1B2141' },
  tagBadge: {
    backgroundColor: '#000',
    color: '#FFF',
    fontSize: '9px',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '700',
  },
  actionsRow: { display: 'flex', gap: '12px', color: '#666' },
  iconBtn: { cursor: 'pointer', fontSize: '13px' },
  addressDetails: { fontSize: '12px', color: '#666', lineHeight: '1.4', margin: '4px 0 6px 26px' },
  addressPhone: { fontSize: '12px', color: '#1B2141', margin: '0 0 0 26px', fontWeight: '500' },
  addAddressDivider: {
    borderTop: '1px dashed #DDD',
    position: 'relative',
    margin: '30px 0 10px 0',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  addIconCircle: {
    position: 'absolute',
    top: '-14px',
    backgroundColor: '#000',
    color: '#FFF',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  addAddressText: { textAlign: 'center', fontSize: '12px', color: '#333', cursor: 'pointer', marginBottom: '40px' },
  buttonsRow: { display: 'flex', gap: '16px', marginTop: '30px' },
  backBtn: {
    flex: 1,
    padding: '14px',
    border: '1px solid #000',
    borderRadius: '8px',
    backgroundColor: '#FFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  nextBtn: {
    flex: 1,
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#000',
    color: '#FFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  shippingCard: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
  },
  shippingTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  dateText: { fontSize: '12px', fontWeight: '600', color: '#1B2141' },
  shippingSubText: { fontSize: '11px', color: '#888', margin: '0 0 0 26px' },
  selectDateWrapper: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#888' },
  paymentTabsRow: {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px',
  },
  paymentTabBtn: {
    paddingBottom: '8px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  cardPreviewContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '24px',
    backgroundColor: '#000',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  cardOverlayDetails: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
    color: '#FFF',
    pointerEvents: 'none',
  },
  cardOverlayNumber: {
    fontSize: '18px',
    letterSpacing: '2px',
    fontWeight: '600',
    marginBottom: '8px',
    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
  },
  cardOverlayHolder: {
    fontSize: '12px',
    color: '#CCC',
    textTransform: 'uppercase',
  },
  paymentInput: {
    width: '100%',
    padding: '14px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '13px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '16px 0 24px 0',
    cursor: 'pointer',
  },
  checkboxChecked: {
    width: '18px',
    height: '18px',
    backgroundColor: '#000',
    color: '#FFF',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
  },
  checkboxUnchecked: {
    width: '18px',
    height: '18px',
    border: '1px solid #CCC',
    borderRadius: '4px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
  },
  inputGroup: { marginBottom: '12px' },
  label: { display: 'block', fontSize: '12px', marginBottom: '4px', color: '#555' },
  input: { width: '100%', padding: '10px', border: '1px solid #DDD', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' },
  cancelBtn: { flex: 1, padding: '10px', border: '1px solid #CCC', backgroundColor: '#FFF', borderRadius: '6px', cursor: 'pointer' },
  saveBtn: { flex: 1, padding: '10px', backgroundColor: '#000', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer' },
};

export default ShippingPage;