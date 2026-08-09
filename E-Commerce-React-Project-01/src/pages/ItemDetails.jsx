import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { allProductsData } from '../data/productsData';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Context Hooks
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isLiked } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // 1. First check in local static products data
      const localItem = allProductsData.find((p) => p.id.toString() === id.toString());

      if (localItem) {
        setProduct(localItem);
        setSelectedImage(localItem.image);
        setLoading(false);
        return;
      }

      // 2. If not found locally, fetch from API
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();

        if (data && data.id) {
          const formatted = {
            id: data.id.toString(),
            name: data.title,
            price: data.price,
            rating: data.rating || 4.5,
            image: data.thumbnail,
            images: data.images || [data.thumbnail],
            description: data.description,
          };
          setProduct(formatted);
          setSelectedImage(formatted.image);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
        <h3>Loading product details...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
        <h3>Product Not Found!</h3>
        <button
          onClick={() => navigate('/products')}
          style={{
            marginTop: '12px',
            padding: '10px 20px',
            backgroundColor: '#000',
            color: '#FFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Handle Add to Cart Click
  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  const liked = isLiked(product.id);
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div style={styles.container}>
      {/* Top Header Navigation */}
      <div style={styles.headerRow} onClick={() => navigate(-1)}>
        <span style={styles.backArrow}>&lt;</span>
        <h2 style={styles.headerTitle}>Details</h2>
      </div>

      {/* Main Product Image Display */}
      <div style={styles.mainImageContainer}>
        <img src={selectedImage} alt={product.name} style={styles.mainImage} />
      </div>

      {/* Image Thumbnails */}
      {productImages.length > 1 && (
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
      )}

      {/* Product Information */}
      <h1 style={styles.title}>{product.name}</h1>
      <div style={styles.priceRow}>
        <span style={styles.price}>${product.price}</span>
        <span style={styles.ratingBadge}>★ {product.rating}</span>
      </div>

      <p style={styles.description}>
        {product.description ||
          'High quality product with premium durability and features. Enjoy maximum performance and seamless integration.'}
      </p>

      {/* Action Buttons */}
      <div style={styles.actionButtonsGroup}>
        <button
          style={{
            ...styles.wishlistBtn,
            backgroundColor: liked ? '#000' : '#FFF',
            color: liked ? '#FFF' : '#000',
          }}
          onClick={() => toggleWishlist(product)}
        >
          {liked ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>

        <button style={styles.addToCartBtn} onClick={handleAddToCart}>
          Add to Cart
        </button>
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
  title: { fontSize: '22px', fontWeight: '700', marginBottom: '8px' },
  priceRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  price: { fontSize: '24px', fontWeight: '700', color: '#000' },
  ratingBadge: {
    backgroundColor: '#FFF8E7',
    color: '#FFB800',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '700',
  },
  description: { fontSize: '13px', color: '#666', lineHeight: '1.5', marginBottom: '24px' },
  actionButtonsGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  wishlistBtn: {
    width: '100%',
    padding: '14px',
    border: '1px solid #000',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  addToCartBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#000',
    color: '#FFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default ItemDetails;