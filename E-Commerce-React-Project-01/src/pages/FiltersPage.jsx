import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProductsData } from '../data/productsData';

const FiltersPage = () => {
  const navigate = useNavigate();

  // Accordion Toggle States
  const [openSections, setOpenSections] = useState({
    price: true,
    brand: true,
    memory: true,
    protection: false,
    screenDiagonal: false,
    screenType: false,
    battery: false,
  });

  // Price State
  const [minPrice, setMinPrice] = useState(1290);
  const [maxPrice, setMaxPrice] = useState(12090);

  // Search Input States inside accordions
  const [brandSearch, setBrandSearch] = useState('');
  const [memorySearch, setMemorySearch] = useState('');
  const [protectionSearch, setProtectionSearch] = useState('');
  const [diagonalSearch, setDiagonalSearch] = useState('');
  const [screenTypeSearch, setScreenTypeSearch] = useState('');
  const [batterySearch, setBatterySearch] = useState('');

  // Selected Checkboxes States
  const [selectedBrands, setSelectedBrands] = useState(['Apple']);
  const [selectedMemory, setSelectedMemory] = useState([]);
  const [selectedProtection, setSelectedProtection] = useState([]);
  const [selectedDiagonal, setSelectedDiagonal] = useState([]);
  const [selectedScreenType, setSelectedScreenType] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState([]);

  // Data States for Local Filtering
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Data Options
  const brandsList = [
    { name: 'Apple', count: 110 },
    { name: 'Samsung', count: 125 },
    { name: 'Xiaomi', count: 68 },
    { name: 'Poco', count: 44 },
    { name: 'OPPO', count: 36 },
    { name: 'Honor', count: 10 },
    { name: 'Motorola', count: 34 },
    { name: 'Nokia', count: 22 },
    { name: 'Realme', count: 18 },
  ];

  const memoryList = [
    { name: '16GB', count: 65 },
    { name: '32GB', count: 128 },
    { name: '64GB', count: 48 },
    { name: '128GB', count: 150 },
    { name: '256GB', count: 24 },
    { name: '512GB', count: 8 },
  ];

  const protectionList = [
    { name: 'IP67 Waterproof', count: 42 },
    { name: 'IP68 Dust/Water', count: 85 },
    { name: 'Gorilla Glass Victus', count: 60 },
    { name: 'Gorilla Glass 5', count: 30 },
  ];

  const diagonalList = [
    { name: '5.5" to 6.0"', count: 15 },
    { name: '6.1" to 6.5"', count: 95 },
    { name: '6.6" to 6.9"', count: 70 },
  ];

  const screenTypeList = [
    { name: 'OLED', count: 88 },
    { name: 'Super AMOLED', count: 104 },
    { name: 'IPS LCD', count: 45 },
    { name: 'Retina Display', count: 32 },
  ];

  const batteryList = [
    { name: '3000 - 4000 mAh', count: 20 },
    { name: '4000 - 5000 mAh', count: 112 },
    { name: '5000 - 6000 mAh', count: 45 },
  ];

  // Fetch products for filtering without affecting original styles
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
          brand: item.brand || 'Apple',
          image: item.thumbnail || (item.images && item.images[0]),
        }));

        const localItems = Array.isArray(allProductsData) ? allProductsData : [];
        setAllProducts([...localItems, ...formattedApi]);
      } catch (err) {
        setAllProducts(allProductsData || []);
      }
    };

    loadProducts();
  }, []);

  // Helper toggle accordion section
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper toggle checkbox selections
  const handleCheckboxChange = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  // Handle Apply Click -> Shows filtered products on this same page
  // Guaranteed Random 3-4 Products on Every Apply Click
  const handleApplyFilters = () => {
    if (!allProducts || allProducts.length === 0) return;

    // 1. Array ko randomize / shuffle karein
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

    // 2. Randomly decide karein ke 3 render karne hain ya 4
    const count = Math.floor(Math.random() * 2) + 3; // Returns 3 or 4

    // 3. Pehle 3 ya 4 items pick kar lein
    const randomProducts = shuffled.slice(0, count);

    setFilteredProducts(randomProducts);
    setShowResults(true);
  };

  return (
    <div style={styles.container}>
      {/* Header Back Button */}
      <div style={styles.headerRow} onClick={() => navigate(-1)}>
        <span style={styles.backArrow}>&lt;</span>
        <h2 style={styles.headerTitle}>Filters</h2>
      </div>

      {/* 1. Price Accordion */}
      <div style={styles.accordionGroup}>
        <div style={styles.accordionHeader} onClick={() => toggleSection('price')}>
          <span style={styles.sectionTitle}>Price</span>
          <span>{openSections.price ? '▲' : '▼'}</span>
        </div>

        {openSections.price && (
          <div style={styles.accordionContent}>
            <div style={styles.priceInputRow}>
              <div style={styles.priceBox}>
                <label style={styles.priceLabel}>From</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  style={styles.priceInput}
                />
              </div>
              <span style={styles.priceDivider}>—</span>
              <div style={styles.priceBox}>
                <label style={styles.priceLabel}>To</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={styles.priceInput}
                />
              </div>
            </div>

            {/* Price Slider Bar */}
            <div style={styles.sliderContainer}>
              <input
                type="range"
                min="0"
                max="20000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                style={styles.rangeInput}
              />
              <input
                type="range"
                min="0"
                max="20000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={styles.rangeInput}
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Brand Accordion */}
      <div style={styles.accordionGroup}>
        <div style={styles.accordionHeader} onClick={() => toggleSection('brand')}>
          <span style={styles.sectionTitle}>Brand</span>
          <span>{openSections.brand ? '▲' : '▼'}</span>
        </div>

        {openSections.brand && (
          <div style={styles.accordionContent}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.listContainer}>
              {brandsList
                .filter((b) => b.name.toLowerCase().includes(brandSearch.toLowerCase()))
                .map((brand) => (
                  <label key={brand.name} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => handleCheckboxChange(brand.name, selectedBrands, setSelectedBrands)}
                      style={styles.checkbox}
                    />
                    <span style={styles.itemText}>{brand.name}</span>
                    <span style={styles.itemCount}>{brand.count}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Built-in Memory Accordion */}
      <div style={styles.accordionGroup}>
        <div style={styles.accordionHeader} onClick={() => toggleSection('memory')}>
          <span style={styles.sectionTitle}>Built-in memory</span>
          <span>{openSections.memory ? '▲' : '▼'}</span>
        </div>

        {openSections.memory && (
          <div style={styles.accordionContent}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={memorySearch}
                onChange={(e) => setMemorySearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.listContainer}>
              {memoryList
                .filter((m) => m.name.toLowerCase().includes(memorySearch.toLowerCase()))
                .map((mem) => (
                  <label key={mem.name} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedMemory.includes(mem.name)}
                      onChange={() => handleCheckboxChange(mem.name, selectedMemory, setSelectedMemory)}
                      style={styles.checkbox}
                    />
                    <span style={styles.itemText}>{mem.name}</span>
                    <span style={styles.itemCount}>{mem.count}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Protection Class Accordion */}
      <div style={styles.accordionGroup}>
        <div style={styles.accordionHeader} onClick={() => toggleSection('protection')}>
          <span style={styles.sectionTitle}>Protection class</span>
          <span>{openSections.protection ? '▲' : '▼'}</span>
        </div>

        {openSections.protection && (
          <div style={styles.accordionContent}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={protectionSearch}
                onChange={(e) => setProtectionSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.listContainer}>
              {protectionList
                .filter((p) => p.name.toLowerCase().includes(protectionSearch.toLowerCase()))
                .map((item) => (
                  <label key={item.name} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedProtection.includes(item.name)}
                      onChange={() => handleCheckboxChange(item.name, selectedProtection, setSelectedProtection)}
                      style={styles.checkbox}
                    />
                    <span style={styles.itemText}>{item.name}</span>
                    <span style={styles.itemCount}>{item.count}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Screen Diagonal Accordion */}
      <div style={styles.accordionGroup}>
        <div style={styles.accordionHeader} onClick={() => toggleSection('screenDiagonal')}>
          <span style={styles.sectionTitle}>Screen diagonal</span>
          <span>{openSections.screenDiagonal ? '▲' : '▼'}</span>
        </div>

        {openSections.screenDiagonal && (
          <div style={styles.accordionContent}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={diagonalSearch}
                onChange={(e) => setDiagonalSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.listContainer}>
              {diagonalList
                .filter((d) => d.name.toLowerCase().includes(diagonalSearch.toLowerCase()))
                .map((item) => (
                  <label key={item.name} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedDiagonal.includes(item.name)}
                      onChange={() => handleCheckboxChange(item.name, selectedDiagonal, setSelectedDiagonal)}
                      style={styles.checkbox}
                    />
                    <span style={styles.itemText}>{item.name}</span>
                    <span style={styles.itemCount}>{item.count}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. Screen Type Accordion */}
      <div style={styles.accordionGroup}>
        <div style={styles.accordionHeader} onClick={() => toggleSection('screenType')}>
          <span style={styles.sectionTitle}>Screen type</span>
          <span>{openSections.screenType ? '▲' : '▼'}</span>
        </div>

        {openSections.screenType && (
          <div style={styles.accordionContent}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={screenTypeSearch}
                onChange={(e) => setScreenTypeSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.listContainer}>
              {screenTypeList
                .filter((s) => s.name.toLowerCase().includes(screenTypeSearch.toLowerCase()))
                .map((item) => (
                  <label key={item.name} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedScreenType.includes(item.name)}
                      onChange={() => handleCheckboxChange(item.name, selectedScreenType, setSelectedScreenType)}
                      style={styles.checkbox}
                    />
                    <span style={styles.itemText}>{item.name}</span>
                    <span style={styles.itemCount}>{item.count}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 7. Battery Capacity Accordion */}
      <div style={styles.accordionGroup}>
        <div style={styles.accordionHeader} onClick={() => toggleSection('battery')}>
          <span style={styles.sectionTitle}>Battery capacity</span>
          <span>{openSections.battery ? '▲' : '▼'}</span>
        </div>

        {openSections.battery && (
          <div style={styles.accordionContent}>
            <div style={styles.searchBox}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={batterySearch}
                onChange={(e) => setBatterySearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.listContainer}>
              {batteryList
                .filter((b) => b.name.toLowerCase().includes(batterySearch.toLowerCase()))
                .map((item) => (
                  <label key={item.name} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedBattery.includes(item.name)}
                      onChange={() => handleCheckboxChange(item.name, selectedBattery, setSelectedBattery)}
                      style={styles.checkbox}
                    />
                    <span style={styles.itemText}>{item.name}</span>
                    <span style={styles.itemCount}>{item.count}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Apply Button */}
      <button style={styles.applyBtn} onClick={handleApplyFilters}>
        Apply
      </button>

      {/* Dynamic Products Render Section inside Filter Page */}
      {showResults && (
        <div style={{ marginTop: '30px', borderTop: '1px solid #ECECEC', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
            Products Result ({filteredProducts.length})
          </h3>

          {filteredProducts.length === 0 ? (
            <p style={{ color: '#888', fontSize: '14px', textAlign: 'center' }}>
              No products found matching your selected filters.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/item/${product.id}`)}
                  style={{
                    backgroundColor: '#F9F9F9',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'contain',
                      marginBottom: '8px',
                    }}
                  />
                  <h4
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      margin: '0 0 4px 0',
                      height: '32px',
                      overflow: 'hidden',
                    }}
                  >
                    {product.name}
                  </h4>
                  <p style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#000' }}>
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px 16px 60px 16px',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    cursor: 'pointer',
  },
  backArrow: {
    fontSize: '20px',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
  },
  accordionGroup: {
    borderBottom: '1px solid #ECECEC',
    paddingBottom: '16px',
    marginBottom: '16px',
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 0',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#000000',
  },
  accordionContent: {
    marginTop: '12px',
  },
  priceInputRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '16px',
  },
  priceBox: {
    flex: 1,
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '6px 12px',
  },
  priceLabel: {
    display: 'block',
    fontSize: '11px',
    color: '#888',
    marginBottom: '2px',
  },
  priceInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    fontWeight: '600',
  },
  priceDivider: {
    color: '#888',
  },
  sliderContainer: {
    position: 'relative',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  rangeInput: {
    width: '100%',
    accentColor: '#000000',
    cursor: 'pointer',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: '8px',
    padding: '8px 12px',
    marginBottom: '12px',
  },
  searchIcon: {
    fontSize: '14px',
    marginRight: '8px',
    color: '#888',
  },
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
  },
  listContainer: {
    maxHeight: '220px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '14px',
  },
  checkbox: {
    marginRight: '10px',
    width: '16px',
    height: '16px',
    accentColor: '#000000',
  },
  itemText: {
    flex: 1,
    fontWeight: '500',
    color: '#000000',
  },
  itemCount: {
    color: '#888888',
    fontSize: '12px',
  },
  applyBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default FiltersPage;