import React from 'react';
import HeroSection from '../components/HeroSection';
import BannerGrid from '../components/BannerGrid';
import CategorySection from '../components/CategorySection';
import ProductSection from '../components/ProductSection';
import PromoBanner from '../components/PromoBanner';
import DiscountSection from '../components/DiscountSection';
import SummerSaleBanner from '../components/SummerSaleBanner';

const Home = () => {
  return (
    <>
      <HeroSection />
      <BannerGrid />
      <CategorySection />
      <ProductSection />
      <PromoBanner />
      <DiscountSection />
      <SummerSaleBanner />
    </>
  );
};

export default Home;