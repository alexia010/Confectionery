import React from 'react';

import { MainLayout } from '../layouts/MainLayout';
import { HeroSection } from '../sections/home/HeroSection';
import { SpecialitiesSection } from '../sections/home/SpecialitiesSection';
import { ProductsSection } from '../sections/home/ProductsSection';
import { TestimonialsSection } from '../sections/home/TestimonialsSection';
import { StatsSection } from '../sections/home/StatsSection';


const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <SpecialitiesSection />
      <ProductsSection />
      <StatsSection />
      <TestimonialsSection />
    </MainLayout>
  );
};
export default Home;