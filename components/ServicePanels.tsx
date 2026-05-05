'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function ServicePanels() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  const services = [
    {
      title: 'Chai Cart',
      description: 'Mobile luxury chai service for your event',
      image: '/images/chai-cart.jpg',
    },
    {
      title: 'Event Catering',
      description: 'Full catering service for large events',
      image: '/images/event-catering.jpg',
    },
    {
      title: 'Custom Blends',
      description: 'Bespoke chai blends tailored to you',
      image: '/images/custom-blends.jpg',
    },
    {
      title: 'Workshops',
      description: 'Learn the art of chai making',
      image: '/images/workshops.jpg',
    },
  ];

  return (
    <section className="bg-white">

      {/* ───────── HEADER (NO OVERLAP NOW) ───────── */}
      <div className="text-center pt-28 pb-16 px-6">
        <h2 className="text-5xl md:text-6xl font-light text-black">
          Our <span className="text-[#D4AF37]">Services</span>
        </h2>
        <p className="text-black/60 mt-4 max-w-xl mx-auto">
          Crafted chai experiences designed for elegance, scale, and unforgettable moments
        </p>
      </div>

      {/* ───────── SCROLL SECTION ───────── */}
      <div ref={containerRef} className="relative h-[260vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">

          <motion.div
            style={{ x }}
            className="flex gap-20 px-[10vw]"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="min-w-[60vw] h-[70vh] relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                {/* IMAGE */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/30" />

                {/* CONTENT */}
                <div className="absolute bottom-12 left-12 text-white max-w-md">
                  <h3 className="text-3xl font-light mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}