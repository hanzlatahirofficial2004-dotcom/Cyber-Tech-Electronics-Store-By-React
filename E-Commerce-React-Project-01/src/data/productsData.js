import iphoneImg from '../assets/product-iphone.png';
import cameraImg from '../assets/product-camera.png';
import watchImg from '../assets/product-watch.png';
import airpodsImg from '../assets/product-airpods.png';
import samsungWatchImg from '../assets/product-samsung-watch.png';
import foldImg from '../assets/product-fold.png';
import budsImg from '../assets/product-buds.png';
import ipadImg from '../assets/product-ipad.png';

// Discount Section Images
import discountIphoneGoldImg from '../assets/discount-iphone-gold.png';
import discountAirpodsImg from '../assets/discount-airpods.png';
import discountWatchImg from '../assets/discount-watch.png';
import discountIphoneSilverImg from '../assets/discount-iphone-silver.png';

import bannerAirpodsImg from '../assets/airpods.png';
import visionImg from '../assets/vision-pro.png';
import ps5Img from '../assets/ps5.png';
import macbookImg from '../assets/macbook.png';

export const productsData = [
  {
    id: '1',
    name: 'Apple iPhone 14 Pro Max 128GB Deep...',
    price: 900,
    image: iphoneImg,
    category: 'New Arrival',
    description: 'The ultimate iPhone with Dynamic Island, 48MP Main camera, and All-Day Battery Life.',
  },
  {
    id: '2',
    name: 'Blackmagic Pocket Cinema Camera 6k',
    price: 2535,
    image: cameraImg,
    category: 'New Arrival',
    description: 'Next generation handheld 6K digital film camera with Super 35 sensor and dual native ISO.',
  },
  {
    id: '3',
    name: 'Apple Watch Series 9 GPS 41mm Starl...',
    price: 399,
    image: watchImg,
    category: 'New Arrival',
    description: 'Smarter, brighter, and more powerful smartwatch with Double Tap gesture.',
  },
  {
    id: '4',
    name: 'AirPods Max Silver',
    price: 549,
    image: airpodsImg,
    category: 'New Arrival',
    description: 'High-fidelity audio with Active Noise Cancellation and Transparency mode.',
  },
  {
    id: '5',
    name: 'Samsung Galaxy Watch6 Classic 4...',
    price: 369,
    image: samsungWatchImg,
    category: 'Bestseller',
    description: 'Classic style with rotating bezel and comprehensive wellness monitoring.',
  },
  {
    id: '6',
    name: 'Galaxy Z Fold5 Unlocked | 256G...',
    price: 1799,
    image: foldImg,
    category: 'Bestseller',
    description: 'Massive screen experience in a foldable design engineered for multitasking.',
  },
  {
    id: '7',
    name: 'Galaxy Buds FE Graphite',
    price: 99.99,
    image: budsImg,
    category: 'Featured Products',
    description: 'Compact and ergonomic wireless earbuds with powerful Active Noise Canceling.',
  },
  {
    id: '8',
    name: "Apple iPad 9 10.2'' 64GB Wi-Fi Silver...",
    price: 398,
    image: ipadImg,
    category: 'Featured Products',
    description: 'Powerful A13 Bionic chip, Center Stage camera, and Retina display.',
  },
];

export const discountProductsData = [
  {
    id: '9',
    name: 'Apple iPhone 14 Pro 512GB Gold (MQ2...',
    price: 900,
    image: discountIphoneGoldImg,
    category: 'Discounts',
    description: 'Pro performance with 512GB storage in stunning Gold color.',
  },
  {
    id: '10',
    name: 'AirPods Max Silver',
    price: 2535,
    image: discountAirpodsImg,
    category: 'Discounts',
    description: 'High-fidelity audio with Active Noise Cancellation and Transparency mode.',
  },
  {
    id: '11',
    name: 'Apple Watch Series 9 GPS 41mm Starl...',
    price: 399,
    image: discountWatchImg,
    category: 'Discounts',
    description: 'Smarter, brighter, and more powerful smartwatch with Double Tap gesture.',
  },
  {
    id: '12',
    name: 'Apple iPhone 14 Pro 1TB Gold (MQ2V3)',
    price: 549,
    image: discountIphoneSilverImg,
    category: 'Discounts',
    description: 'Ultimate 1TB capacity iPhone for professional creators.',
  },
];

export const bannerProductsData = [
  {
    id: '13',
    name: 'Apple AirPods Max',
    price: 549,
    image: bannerAirpodsImg,
    category: 'Featured Grid',
    description: 'Computational audio. Listen, it is powerful.',
  },
  {
    id: '14',
    name: 'Apple Vision Pro',
    price: 3499,
    image: visionImg,
    category: 'Featured Grid',
    description: 'An immersive way to experience entertainment.',
  },
  {
    id: '15',
    name: 'Playstation 5',
    price: 499,
    image: ps5Img,
    category: 'Featured Grid',
    description: 'Incredibly powerful CPUs, GPUs, and SSD with integrated I/O.',
  },
  {
    id: '16',
    name: 'Macbook Air',
    price: 1199,
    image: macbookImg,
    category: 'Featured Grid',
    description: 'The new 15-inch MacBook Air with Liquid Retina display.',
  },
];

export const allProductsData = [
  ...productsData,
  ...discountProductsData,
  ...bannerProductsData,
];