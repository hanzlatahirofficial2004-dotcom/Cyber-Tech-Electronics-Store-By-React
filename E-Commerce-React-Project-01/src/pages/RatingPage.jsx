import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProductsData } from '../data/productsData';
import { WishlistContext } from '../context/WishlistContext';

const RatingPage = () => {
  const navigate = useNavigate();
  const { toggleWishlist, isLiked } = useContext(WishlistContext);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [selectedStorage, setSelectedStorage] = useState('1TB');

  // Accordion Expand States
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Load products (Static + API)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
        const requests = categories.map((cat) =>
          fetch(`https://dummyjson.com/products/category/${cat}?limit=100`).then((res) => res.json())
        );

        const results = await Promise.all(requests);
        let apiItems = [];

        results.forEach((data) => {
          if (data.products) apiItems = [...apiItems, ...data.products];
        });

        const formattedApi = apiItems.map((item) => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          rating: item.rating || 4.8,
          brand: item.brand || 'Apple',
          image: item.thumbnail || (item.images && item.images[0]),
          images: item.images && item.images.length >= 4 ? item.images.slice(0, 4) : [item.thumbnail, item.thumbnail, item.thumbnail, item.thumbnail],
          description: item.description,
        }));

        const localItems = Array.isArray(allProductsData) ? allProductsData : [];
        setProducts([...localItems, ...formattedApi]);
      } catch (err) {
        setProducts(allProductsData || []);
      }
    };

    loadProducts();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image || (product.images && product.images[0]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Initial Selection State: "Choose your product" View
  if (!selectedProduct) {
    return (
      <div style={styles.container}>
        <div style={styles.headerRow} onClick={() => navigate(-1)}>
          <span style={styles.backArrow}>&lt;</span>
          <h2 style={styles.headerTitle}>By Rating</h2>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0 30px 0' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            Choose your product
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Select any product below to view complete details & ratings
          </p>
        </div>

        <div style={styles.gridList}>
          {products.map((item) => (
            <div
              key={item.id}
              style={styles.selectionCard}
              onClick={() => handleSelectProduct(item)}
            >
              <img src={item.image} alt={item.name} style={styles.selectionImg} />
              <h4 style={styles.selectionTitle}>{item.name}</h4>
              <div style={styles.ratingBadge}>★ {item.rating}</div>
              <p style={styles.selectionPrice}>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const liked = isLiked(selectedProduct.id);
  const productImages = selectedProduct.images || [selectedProduct.image, selectedProduct.image, selectedProduct.image, selectedProduct.image];

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.headerRow} onClick={() => setSelectedProduct(null)}>
        <span style={styles.backArrow}>&lt;</span>
        <h2 style={styles.headerTitle}>Rating & Details</h2>
      </div>

      {/* ================= SECTION 1: Product Showcase (Pic 1) ================= */}
      <div style={styles.mainImageContainer}>
        <img src={selectedImage} alt={selectedProduct.name} style={styles.mainImage} />
      </div>

      {/* Thumbnails */}
      <div style={styles.thumbnailsRow}>
        {productImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="thumb"
            style={{
              ...styles.thumbImg,
              border: selectedImage === img ? '2px solid #000' : '1px solid #E0E0E0',
            }}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <h1 style={styles.productTitle}>{selectedProduct.name}</h1>

      <div style={styles.priceRow}>
        <span style={styles.price}>${selectedProduct.price}</span>
        <span style={styles.oldPrice}>${(selectedProduct.price * 1.1).toFixed(0)}</span>
      </div>

      {/* Color Selectors */}
      <div style={styles.optionSection}>
        <p style={styles.optionLabel}>Select color :</p>
        <div style={styles.colorRow}>
          {['#000000', '#7D52A8', '#E60000', '#E5B800', '#E0E0E0'].map((colorHex, idx) => (
            <div
              key={idx}
              style={{
                ...styles.colorCircle,
                backgroundColor: colorHex,
                outline: selectedColor === colorHex ? '2px solid #000' : 'none',
              }}
              onClick={() => setSelectedColor(colorHex)}
            />
          ))}
        </div>
      </div>

      {/* Storage Selectors */}
      <div style={styles.storageRow}>
        {['128GB', '256GB', '512GB', '1TB'].map((st) => (
          <button
            key={st}
            style={{
              ...styles.storageBtn,
              border: selectedStorage === st ? '1px solid #000' : '1px solid #E0E0E0',
              fontWeight: selectedStorage === st ? '700' : '400',
            }}
            onClick={() => setSelectedStorage(st)}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Specs Grid Icons (6 Items) */}
      <div style={styles.specsGrid}>
        <div style={styles.specBox}>📱 <div><small>Screen size</small><br /><strong>6.7"</strong></div></div>
        <div style={styles.specBox}>⚙️ <div><small>CPU</small><br /><strong>Apple A16 Bionic</strong></div></div>
        <div style={styles.specBox}>⚡ <div><small>Number of Cores</small><br /><strong>6</strong></div></div>
        <div style={styles.specBox}>📷 <div><small>Main camera</small><br /><strong>48-12-12 MP</strong></div></div>
        <div style={styles.specBox}>📸 <div><small>Front-camera</small><br /><strong>12 MP</strong></div></div>
        <div style={styles.specBox}>🔋 <div><small>Battery capacity</small><br /><strong>4323 mAh</strong></div></div>
      </div>

      <p style={styles.shortDesc}>
        {selectedProduct.description ||
          'Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos in weak, as well as in bright lighting using the new system with two cameras.'}
      </p>

      {/* Action Buttons: Wishlist & Cart */}
      <button
        style={{
          ...styles.wishlistBtn,
          backgroundColor: liked ? '#000' : '#FFF',
          color: liked ? '#FFF' : '#000',
        }}
        onClick={() => toggleWishlist(selectedProduct)}
      >
        {liked ? 'Added to Wishlist' : 'Add to Wishlist'}
      </button>

      <button
        style={styles.addToCartBtn}
        onClick={() => navigate('/cart', { state: { product: selectedProduct } })}
      >
        Add to Cart
      </button>

      {/* Guarantee Cards */}
      <div style={styles.guaranteeRow}>
        <div style={styles.guaranteeCard}>
          <span style={styles.gIcon}>🚚</span>
          <strong>Free Delivery</strong>
          <small>1-2 day</small>
        </div>
        <div style={styles.guaranteeCard}>
          <span style={styles.gIcon}>🏬</span>
          <strong>In Stock</strong>
          <small>Today</small>
        </div>
        <div style={styles.guaranteeCard}>
          <span style={styles.gIcon}>🛡️</span>
          <strong>Guaranteed</strong>
          <small>1 year</small>
        </div>
      </div>

      {/* ================= SECTION 2: Details Section (Pic 2) ================= */}
      <div style={styles.sectionDivider}>
        <h3 style={styles.sectionHeading}>Details</h3>
        <p style={styles.detailsParagraph}>
          Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker.
        </p>

        <h4 style={styles.subHeading}>Screen</h4>
        <div style={styles.tableGroup}>
          <div style={styles.tableRow}><span>Screen diagonal</span><span>6.7"</span></div>
          <div style={styles.tableRow}><span>The screen resolution</span><span>2796x1290</span></div>
          <div style={styles.tableRow}><span>The screen refresh rate</span><span>120 Hz</span></div>
          <div style={styles.tableRow}><span>The pixel density</span><span>460 ppi</span></div>
          <div style={styles.tableRow}><span>Screen type</span><span>OLED</span></div>
          {showMoreDetails && (
            <>
              <div style={styles.tableRow}><span>Additionally</span><span>Dynamic Island, Always-On display, True Tone</span></div>
              <div style={styles.tableRow}><span>CPU</span><span>A16 Bionic</span></div>
              <div style={styles.tableRow}><span>Number of cores</span><span>6</span></div>
            </>
          )}
        </div>

        <button style={styles.viewMoreBtn} onClick={() => setShowMoreDetails(!showMoreDetails)}>
          {showMoreDetails ? 'View Less ▲' : 'View More ▼'}
        </button>
      </div>

      {/* ================= SECTION 3: Reviews Section (Pic 3) ================= */}
      <div style={styles.sectionDivider}>
        <div style={styles.ratingSummaryCard}>
          <span style={styles.ratingBigNumber}>4.8</span>
          <div style={styles.starsRow}>★★★★★</div>
          <small style={{ color: '#888' }}>of 125 reviews</small>
        </div>

        {/* Progress Bars */}
        <div style={styles.barsContainer}>
          <div style={styles.barLine}><span>Excellent</span><div style={styles.barTrack}><div style={{ ...styles.barFill, width: '80%' }}></div></div><span>100</span></div>
          <div style={styles.barLine}><span>Good</span><div style={styles.barTrack}><div style={{ ...styles.barFill, width: '15%' }}></div></div><span>11</span></div>
          <div style={styles.barLine}><span>Average</span><div style={styles.barTrack}><div style={{ ...styles.barFill, width: '5%' }}></div></div><span>3</span></div>
          <div style={styles.barLine}><span>Below Average</span><div style={styles.barTrack}><div style={{ ...styles.barFill, width: '2%' }}></div></div><span>2</span></div>
          <div style={styles.barLine}><span>Poor</span><div style={styles.barTrack}><div style={{ ...styles.barFill, width: '1%' }}></div></div><span>1</span></div>
        </div>

        {/* Leave Comment Field */}
        <input
          type="text"
          placeholder="Leave Comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={styles.commentInput}
        />

        {/* User Reviews List */}
        <div style={styles.reviewsList}>
          <div style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <strong>Grace Carey</strong>
              <small style={{ color: '#888' }}>24 January, 2026</small>
            </div>
            <div style={styles.starsRow}>★★★★☆</div>
            <p style={styles.reviewText}>
              I was a bit nervous to be buying a secondhand phone, but I couldn't be happier with my purchase! It was super easy to set up and the phone works and looks great.
            </p>
          </div>

          <div style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <strong>Ronald Richards</strong>
              <small style={{ color: '#888' }}>24 January, 2026</small>
            </div>
            <div style={styles.starsRow}>★★★★★</div>
            <p style={styles.reviewText}>
              This phone has 1T storage and is durable. Plus all the new iPhones look and feel super premium.
            </p>
          </div>

          <div style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <strong>Darcy King</strong>
              <small style={{ color: '#888' }}>24 January, 2026</small>
            </div>
            <div style={styles.starsRow}>★★★★☆</div>
            <p style={styles.reviewText}>I might be the only one to say this, but the camera is incredible. Love this phone!</p>
            <div style={styles.reviewImagesRow}>
              <img src={selectedProduct.image} alt="user pic" style={styles.reviewImg} />
              <img src={selectedImage} alt="user pic" style={styles.reviewImg} />
            </div>
          </div>

          {showMoreReviews && (
            <div style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <strong>John Malcolm</strong>
                <small style={{ color: '#888' }}>25 January, 2026</small>
              </div>
              <div style={styles.starsRow}>★★★★★</div>
              <p style={styles.reviewText}>
                Fast shipping, excellent packaging, and the product quality exceeded my expectations!
              </p>
            </div>
          )}
        </div>

        <button style={styles.viewMoreBtn} onClick={() => setShowMoreReviews(!showMoreReviews)}>
          {showMoreReviews ? 'View Less ▲' : 'View More ▼'}
        </button>
      </div>

      {/* ================= SECTION 4: Related Products (Pic 4) ================= */}
      <div style={styles.sectionDivider}>
        <h3 style={styles.sectionHeading}>Related Products</h3>
        <div style={styles.relatedGrid}>
          {products.slice(0, 4).map((rel) => (
            <div key={rel.id} style={styles.relatedCard}>
              <img src={rel.image} alt={rel.name} style={styles.relatedImg} />
              <h5 style={styles.relatedTitle}>{rel.name}</h5>
              <p style={styles.relatedPrice}>${rel.price}</p>
              <button
                style={styles.buyNowSmallBtn}
                onClick={() => handleSelectProduct(rel)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 5: Footer ================= */}
      <div style={styles.footer}>
        <h2 style={styles.footerLogo}>cyber</h2>
        <p style={styles.footerText}>
          We are a residential interior design firm located in Portland. Our boutique-studio offers more than.
        </p>
        <div style={styles.footerLinks}>
          <p><strong>Services:</strong> Bonus program, Gift cards, Credit and payment</p>
          <p><strong>Assistance to the buyer:</strong> Find an order, Terms of delivery, Guarantee</p>
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
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  backArrow: { fontSize: '20px', fontWeight: '600' },
  headerTitle: { fontSize: '20px', fontWeight: '700', margin: 0 },
  gridList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  selectionCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  selectionImg: { width: '100%', height: '110px', objectFit: 'contain', marginBottom: '8px' },
  selectionTitle: { fontSize: '13px', fontWeight: '600', margin: '0 0 6px 0', height: '32px', overflow: 'hidden' },
  selectionPrice: { fontSize: '15px', fontWeight: '700', margin: 0, color: '#000' },
  ratingBadge: {
    display: 'inline-block',
    backgroundColor: '#FFF8E7',
    color: '#FFB800',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  mainImageContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  mainImage: { maxHeight: '220px', objectFit: 'contain' },
  thumbnailsRow: { display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' },
  thumbImg: { width: '50px', height: '50px', borderRadius: '8px', objectFit: 'contain', padding: '4px', cursor: 'pointer' },
  productTitle: { fontSize: '22px', fontWeight: '700', marginBottom: '8px' },
  priceRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  price: { fontSize: '24px', fontWeight: '700', color: '#000' },
  oldPrice: { fontSize: '16px', textDecoration: 'line-through', color: '#999' },
  optionSection: { marginBottom: '16px' },
  optionLabel: { fontSize: '13px', fontWeight: '600', marginBottom: '8px' },
  colorRow: { display: 'flex', gap: '12px' },
  colorCircle: { width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' },
  storageRow: { display: 'flex', gap: '8px', marginBottom: '20px' },
  storageBtn: { flex: 1, padding: '10px 0', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#FFF' },
  specsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' },
  specBox: { backgroundColor: '#F9F9F9', padding: '10px 12px', borderRadius: '8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '10px' },
  shortDesc: { fontSize: '12px', color: '#666', lineHeight: '1.5', marginBottom: '20px' },
  wishlistBtn: { width: '100%', padding: '14px', border: '1px solid #000', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px' },
  addToCartBtn: { width: '100%', padding: '14px', backgroundColor: '#000', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '24px' },
  guaranteeRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '30px' },
  guaranteeCard: { backgroundColor: '#F9F9F9', padding: '12px 6px', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '11px' },
  gIcon: { fontSize: '20px', marginBottom: '4px' },
  sectionDivider: { marginTop: '30px', borderTop: '1px solid #EAEAEA', paddingTop: '20px' },
  sectionHeading: { fontSize: '18px', fontWeight: '700', marginBottom: '12px' },
  subHeading: { fontSize: '15px', fontWeight: '700', margin: '16px 0 8px 0' },
  detailsParagraph: { fontSize: '12px', color: '#666', lineHeight: '1.6' },
  tableGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' },
  tableRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid #F0F0F0', paddingBottom: '6px' },
  viewMoreBtn: { width: '100%', padding: '10px', border: '1px solid #000', borderRadius: '8px', backgroundColor: '#FFF', fontWeight: '600', cursor: 'pointer', marginTop: '16px' },
  ratingSummaryCard: { backgroundColor: '#F9F9F9', padding: '16px', borderRadius: '12px', textAlign: 'center', marginBottom: '16px' },
  ratingBigNumber: { fontSize: '36px', fontWeight: '700', display: 'block' },
  starsRow: { color: '#FFB800', fontSize: '14px', margin: '4px 0' },
  barsContainer: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' },
  barLine: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' },
  barTrack: { flex: 1, height: '6px', backgroundColor: '#E0E0E0', borderRadius: '3px', overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#FFB800' },
  commentInput: { width: '100%', padding: '12px', border: '1px solid #E0E0E0', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', outline: 'none' },
  reviewsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  reviewCard: { backgroundColor: '#F9F9F9', padding: '14px', borderRadius: '10px' },
  reviewHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' },
  reviewText: { fontSize: '12px', color: '#555', marginTop: '6px', lineHeight: '1.4' },
  reviewImagesRow: { display: 'flex', gap: '8px', marginTop: '8px' },
  reviewImg: { width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' },
  relatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
  relatedCard: { backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '8px', textAlign: 'center' },
  relatedImg: { width: '100%', height: '80px', objectFit: 'contain', marginBottom: '6px' },
  relatedTitle: { fontSize: '12px', margin: '0 0 4px 0', height: '28px', overflow: 'hidden' },
  relatedPrice: { fontSize: '14px', fontWeight: '700', margin: '0 0 8px 0' },
  buyNowSmallBtn: { width: '100%', padding: '8px', backgroundColor: '#000', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' },
  footer: { backgroundColor: '#000', color: '#FFF', padding: '30px 20px', borderRadius: '16px', marginTop: '40px' },
  footerLogo: { fontSize: '24px', fontWeight: '700', margin: '0 0 10px 0' },
  footerText: { fontSize: '12px', color: '#AAA', lineHeight: '1.5', marginBottom: '16px' },
  footerLinks: { fontSize: '11px', color: '#888', display: 'flex', flexDirection: 'column', gap: '8px' },
};

export default RatingPage;