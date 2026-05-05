'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

const galleryData = [
  {
    image: "/images/gallery-1.jpg",
    title: "Luxury Wedding Setup",
    description:
      "Elegant chai experiences crafted for unforgettable wedding celebrations.",
    features: [
      "Premium décor styling",
      "Traditional chai service",
      "Guest-focused experience",
    ],
  },
  {
    image: "/images/gallery-2.jpg",
    title: "Corporate Experience",
    description:
      "Professional chai catering designed for high-end corporate gatherings.",
    features: [
      "Executive presentation",
      "Quick service flow",
      "Brand-aligned setup",
    ],
  },
  {
    image: "/images/gallery-3.jpg",
    title: "Private Celebrations",
    description:
      "Intimate chai moments tailored for exclusive private events.",
    features: [
      "Customized menu",
      "Luxury ambiance",
      "Personalized service",
    ],
  },
  {
    image: "/images/gallery-4.jpg",
    title: "Cultural Events",
    description:
      "Authentic chai experiences rooted in tradition and heritage.",
    features: [
      "Cultural presentation",
      "Authentic recipes",
      "Traditional aesthetics",
    ],
  },
];

export default function GalleryStorytelling() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 30,
  });

  return (
    <section ref={ref} className="relative h-[400vh] bg-black">

      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ───────── BACKGROUND IMAGES ───────── */}
        {galleryData.map((item, index) => {
          const start = index / galleryData.length;
          const end = start + 1 / galleryData.length;

          const opacity = useTransform(
            progress,
            [start, start + 0.1, end - 0.1, end],
            [0, 1, 1, 0]
          );

          const scale = useTransform(progress, [start, end], [1.1, 1.25]);

          return (
            <motion.div
              key={index}
              className="absolute inset-0"
              style={{ opacity, scale }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </motion.div>
          );
        })}

        {/* ───────── OVERLAY ───────── */}
        <div className="absolute inset-0 bg-black/60" />

        {/* ───────── CONTENT ───────── */}
        <div className="absolute inset-0 flex items-center px-6 md:px-16">

          {galleryData.map((item, index) => {
            const start = index / galleryData.length;
            const end = start + 1 / galleryData.length;

            const opacity = useTransform(
              progress,
              [start, start + 0.1, end - 0.1, end],
              [0, 1, 1, 0]
            );

            const y = useTransform(
              progress,
              [start, end],
              [80, -40]
            );

            return (
              <motion.div
                key={index}
                style={{ opacity, y }}
                className="absolute max-w-xl"
              >
                {/* EYEBROW */}
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]/60 mb-6">
                  Experience
                </p>

                {/* TITLE */}
                <h2
                  className="text-white font-light mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  }}
                >
                  {item.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-white/70 mb-8 leading-relaxed">
                  {item.description}
                </p>

                {/* FEATURES */}
                <ul className="space-y-4">
                  {item.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/60 text-sm"
                    >
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#D4AF37]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}

        </div>

        {/* ───────── SCROLL INDICATOR ───────── */}
        {/* <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-16 bg-white/30" />
        </motion.div> */}

      </div>
    </section>
  );
}