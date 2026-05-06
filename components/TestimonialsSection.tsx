'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Chaibaaz transformed our wedding reception into a truly unforgettable experience. The presentation, hospitality, and chai were beyond exceptional.",
      author: "Priya & Arjun",
      title: "Luxury Wedding Clients",
    },
    {
      quote:
        "From ambiance to service quality, every detail felt elevated and premium. Our guests are still talking about the chai experience.",
      author: "Marcus Johnson",
      title: "Corporate Event Director",
    },
    {
      quote:
        "The craftsmanship behind every cup was incredible. Chaibaaz brought warmth, elegance, and authenticity to our celebration.",
      author: "Sarah Chen",
      title: "Private Celebration Host",
    },
    {
      quote:
        "A refined hospitality experience unlike anything we’ve seen before. Beautifully curated and thoughtfully delivered.",
      author: "Robert & Elizabeth",
      title: "Anniversary Celebration",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      className="
        relative
        overflow-hidden
        py-40
        md:py-52
        px-6
        bg-[#F6F0E7]
      "
    >

      {/* ───────────────── BACKGROUND ───────────────── */}

      {/* SOFT GRADIENT */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #F6F0E7 0%, #EFE6D8 45%, #F3E7D7 100%)",
        }}
      />

      {/* GOLD GLOW */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(201,164,106,0.14), transparent 60%)",
        }}
      />

      {/* TEXTURE */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-multiply bg-[url('/noise.png')]" />

      {/* ───────────────── CONTENT ───────────────── */}

      <div className="relative z-10">

        {/* HEADER */}
        <div className="text-center mb-28">

          {/* LABEL */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              text-[10px]
              uppercase
              tracking-[0.5em]
              text-[#B88B4A]
              mb-6
            "
          >
            Client Experiences
          </motion.p>

          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="
              text-[#2A160D]
              font-light
              leading-[1]
              mb-8
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 6vw, 6rem)",
            }}
          >
            What our guests
            <br />

            <span className="italic text-[#B88B4A]">
              remember most
            </span>
          </motion.h2>

          {/* DIVIDER */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-16 h-px bg-[#C9A46A]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A46A]" />
            <div className="w-16 h-px bg-[#C9A46A]" />
          </div>

        </div>

        {/* ───────────────── TESTIMONIAL CARD ───────────────── */}

        <div className="max-w-5xl mx-auto relative">

          {/* GLASS CARD */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              bg-white/45
              backdrop-blur-2xl
              border
              border-white/40
              px-8
              md:px-20
              py-16
              md:py-24
              shadow-[0_25px_80px_rgba(42,22,13,0.08)]
            "
          >

            {/* GOLD LIGHT */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(201,164,106,0.14), transparent 50%)",
              }}
            />

            {/* QUOTE ICON */}
            <div className="absolute top-10 left-10 opacity-10">
              <p
                className="
                  text-[#B88B4A]
                  leading-none
                "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "8rem",
                }}
              >
                “
              </p>
            </div>

            {/* TESTIMONIAL CONTENT */}
            <AnimatePresence mode="wait">

              <motion.div
                key={currentIndex}
                initial={{
                  opacity: 0,
                  y: 40,
                  filter: 'blur(10px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  filter: 'blur(10px)',
                }}
                transition={{
                  duration: 0.9,
                  ease: 'easeOut',
                }}
                className="
                  relative
                  z-10
                  text-center
                "
              >

                {/* QUOTE */}
                <p
                  className="
                    text-[#2A160D]
                    font-light
                    leading-relaxed
                    max-w-4xl
                    mx-auto
                    mb-14
                  "
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.9rem, 3vw, 3rem)",
                    letterSpacing: "0.01em",
                  }}
                >
                  “{testimonials[currentIndex].quote}”
                </p>

                {/* DIVIDER */}
                <div className="flex justify-center items-center gap-4 mb-10">
                  <div className="h-px w-14 bg-[#C9A46A]" />
                  <div className="w-2 h-2 rounded-full bg-[#C9A46A]" />
                  <div className="h-px w-14 bg-[#C9A46A]" />
                </div>

                {/* AUTHOR */}
                <div className="space-y-3">

                  <p
                    className="
                      text-[#2A160D]
                      text-xl
                    "
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {testimonials[currentIndex].author}
                  </p>

                  <p
                    className="
                      text-[#5B4636]
                      text-[11px]
                      uppercase
                      tracking-[0.35em]
                    "
                  >
                    {testimonials[currentIndex].title}
                  </p>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

          {/* ───────────────── NAVIGATION ───────────────── */}

          <div className="flex justify-center gap-5 mt-14">

            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative"
              >

                <motion.div
                  animate={{
                    width: index === currentIndex ? 60 : 28,
                    opacity: index === currentIndex ? 1 : 0.35,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="
                    h-[2px]
                    rounded-full
                    bg-[#C9A46A]
                  "
                />

              </button>
            ))}

          </div>

        </div>

      </div>

      {/* ───────────────── BOTTOM FADE ───────────────── */}

      <div
        className="absolute bottom-0 left-0 w-full h-40"
        style={{
          background:
            "linear-gradient(to top, #EFE6D8, transparent)",
        }}
      />

    </section>
  );
}