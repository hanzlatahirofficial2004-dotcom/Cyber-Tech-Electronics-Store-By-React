import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { allProductsData } from '../data/productsData';

const Products = () => {
  const navigate = useNavigate();
  const { toggleWishlist, isLiked } = useContext(WishlistContext);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(1);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  // Fetch Real Tech Data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Tech categories array from DummyJSON API
        const categories = [
          'smartphones',
          'laptops',
          'tablets',
          'mobile-accessories'
        ];

        // Fetching all tech categories concurrently
        const requests = categories.map((cat) =>
          fetch(`https://dummyjson.com/products/category/${cat}?limit=100`).then((res) =>
            res.json()
          )
        );

        const results = await Promise.all(requests);

        // Combine all items into a single array
        let combinedTechProducts = [];
        results.forEach((data) => {
          if (data.products) {
            combinedTechProducts = [...combinedTechProducts, ...data.products];
          }
        });

        // Map API response to required UI structure
        const formattedProducts = combinedTechProducts.map((item) => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          rating: item.rating,
          category: item.category,
          brand: item.brand || 'Cyber',
          image: item.thumbnail || item.images[0],
          description: item.description,
        }));

       const localData = Array.isArray(allProductsData) ? allProductsData : [];
        setProducts([...localData, ...formattedProducts]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination Logic
  const itemsPerPage = isMobile ? 8 : 12;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: '16px', color: '#666', fontSize: '15px' }}>Loading real products from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centerContainer}>
        <p style={{ color: '#d32f2f', fontSize: '16px', fontWeight: '500' }}>Error: {error}</p>
        <button style={styles.retryBtn} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Top Controls Area */}
      <div style={styles.topBar}>
        <button style={styles.filterBtn} onClick={() => navigate('/filters')}>
          <span>Filters</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>

        <button style={styles.filterBtn} onClick={() => navigate('/rating')}>
          <span>By rating</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      <p style={styles.resultCount}>
        Products Result : <strong style={{ color: '#000' }}>{products.length}</strong>
      </p>

      {/* Product Grid */}
      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        }}
      >
        {currentProducts.map((product) => {
          const liked = isLiked(product.id);
          return (
            <div
              key={product.id}
              style={styles.card}
              onClick={() => navigate(`/item-details/${product.id}`)}
            >
              <div
                style={styles.heartWrapper}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={liked ? '#000000' : 'none'}
                  stroke={liked ? '#000000' : '#909090'}
                  strokeWidth="1.5"
                  style={{ transition: 'all 0.2s ease' }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <div style={styles.imageBox}>
                <img src={product.image} alt={product.name} style={styles.image} />
              </div>

              <h3 style={styles.title}>{product.name}</h3>
              <p style={styles.price}>${product.price}</p>

              <button
                style={styles.buyBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/item-details/${product.id}`);
                }}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>

      {/* Dynamic Pagination Bar */}
      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <button
            style={{ ...styles.arrowBtn, opacity: currentPage === 1 ? 0.3 : 1 }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
            <button
              key={pageNum}
              style={currentPage === pageNum ? styles.activePageBtn : styles.pageBtn}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            style={{ ...styles.arrowBtn, opacity: currentPage === totalPages ? 0.3 : 1 }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '24px 20px 60px 20px',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  },
  centerContainer: {
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #F3F3F3',
    borderTop: '4px solid #000000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  retryBtn: {
    marginTop: '12px',
    padding: '8px 16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  topBar: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  filterBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#000000',
    cursor: 'pointer',
  },
  resultCount: {
    fontSize: '15px',
    color: '#8B8B8B',
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gap: '16px',
    width: '100%',
  },
  card: {
    backgroundColor: '#F6F6F6',
    borderRadius: '9px',
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    cursor: 'pointer',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '100%',
  },
  heartWrapper: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    cursor: 'pointer',
    zIndex: 10,
  },
  imageBox: {
    width: '100%',
    height: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    marginTop: '12px',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  title: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#000000',
    margin: '0 0 10px 0',
    lineHeight: '1.3',
    minHeight: '34px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  price: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#000000',
    margin: '0 0 14px 0',
  },
  buyBtn: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    border: 'none',
    width: '100%',
    padding: '10px 0',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  arrowBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
  },
  pageBtn: {
    width: '36px',
    height: '36px',
    backgroundColor: '#F4F4F4',
    border: 'none',
    borderRadius: '8px',
    color: '#000000',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePageBtn: {
    width: '36px',
    height: '36px',
    backgroundColor: '#000000',
    border: 'none',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Products;