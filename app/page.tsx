'use client';

import { useEffect, useState } from 'react';

import Preloader  from '@/components/Preloader';
import CustomCursor  from '@/components/CustomCursor';
import Navigation  from '@/components/Navigation';
import HeroSection  from '@/components/HeroSection';
import  StorySection  from '@/components/StorySection';
import { ServicePanels } from '@/components/ServicePanels';
import GallerySection  from '@/components/GallerySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import BookingSection  from '@/components/BookingSection';
import { Footer } from '@/components/Footer';
import FinalCTA from '@/components/finalCTA';
import WhyChooseUs from '@/components/WhyChooseUs';
import { FadeDivider } from '@/components/FadeDivider';
import Gallery from '@/components/MainGallery';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // match your preloader animation duration

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      
      <Navigation />

      <main>
        <section id="home">
          <HeroSection />
        </section>

        {/* <FadeDivider variant="darkToLight" /> */}

        <StorySection />

        {/* <FadeDivider variant="lightToDark" /> */}

        <WhyChooseUs />

        {/* <FadeDivider variant="darkToLight" /> */}

        <section id="services">
          <ServicePanels />
        </section>
        
        <section id="gallery">
        <Gallery />
        </section>
        
          <GallerySection />
      
        
        {/* <FadeDivider variant="lightToDark" /> */}

        <section id="testimonials">
          <TestimonialsSection />
        </section>

        <BookingSection />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}