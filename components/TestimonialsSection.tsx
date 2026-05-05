'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Chaibaaz transformed our wedding reception. The chai was absolutely exquisite and the service was impeccable.",
      author: "Priya & Arjun",
      title: "Wedding Clients",
    },
    {
      quote:
        "We booked the chai cart for our corporate event and it was a massive hit. Premium quality from start to finish.",
      author: "Marcus Johnson",
      title: "Event Manager",
    },
    {
      quote:
        "The custom blend workshop was unforgettable. We learned so much and the chai was incredible.",
      author: "Sarah Chen",
      title: "Workshop Attendee",
    },
    {
      quote:
        "For our anniversary celebration, Chaibaaz provided the perfect touch of luxury.",
      author: "Robert & Elizabeth",
      title: "Anniversary Celebration",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="bg-white py-40 px-6">

      {/* HEADER */}
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-6xl font-light text-black">
          What Our Clients <span className="text-[#D4AF37] italic">Say</span>
        </h2>
        <p className="text-black/60 mt-4">
          Experiences remembered long after the last sip
        </p>
      </div>

      {/* TESTIMONIAL */}
      <div className="max-w-4xl mx-auto text-center relative">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-10"
          >
            {/* QUOTE */}
            <p
              className="text-black font-light leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                letterSpacing: "0.02em",
              }}
            >
              “{testimonials[currentIndex].quote}”
            </p>

            {/* DIVIDER */}
            <div className="flex justify-center items-center gap-4">
              <div className="h-px w-12 bg-[#D4AF37]/40" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <div className="h-px w-12 bg-[#D4AF37]/40" />
            </div>

            {/* AUTHOR */}
            <div className="space-y-2">
              <p className="text-black font-medium">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-black/50 text-sm tracking-wide">
                {testimonials[currentIndex].title}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MINIMAL NAV */}
        <div className="flex justify-center gap-6 mt-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="group"
            >
              <div
                className={`h-[2px] w-10 transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-[#D4AF37]'
                    : 'bg-black/20 group-hover:bg-[#D4AF37]/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}