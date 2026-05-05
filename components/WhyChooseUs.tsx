"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 30,
  });

  const opacity = useTransform(progress, [0.1, 0.3, 0.8, 0.95], [0, 1, 1, 0]);

  const y = useTransform(
    progress,
    [0.1, 0.3, 0.8, 0.95],
    prefersReduced ? [0, 0, 0, 0] : [60, 0, 0, -40]
  );

  return (
    <section
      ref={ref}
      className="relative h-[180vh] bg-[#0b0b0b]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">

        {/* ───────── BACKGROUND LIGHT ───────── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(212,175,55,0.06), transparent 60%)",
          }}
        />

        {/* GRAIN */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay bg-[url('/noise.png')]" />

        {/* ───────── CONTENT ───────── */}
        <motion.div
          style={{ opacity, y }}
          className="relative z-10 text-center max-w-3xl"
        >

          {/* EYEBROW */}
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/60 mb-10">
            Why Choose Us
          </p>

          {/* HEADLINE */}
          <h2
            className="text-white font-light leading-[1.1] mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              letterSpacing: "0.03em",
            }}
          >
            More than chai.
            <br />
            <span className="text-[#D4AF37] italic">
              A refined experience.
            </span>
          </h2>

          {/* DIVIDER */}
          <div className="flex justify-center items-center gap-4 my-10">
            <div className="h-px w-16 bg-[#D4AF37]/40" />
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            <div className="h-px w-16 bg-[#D4AF37]/40" />
          </div>

          {/* CONTENT */}
          <p
            className="text-white/65 leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              letterSpacing: "0.05em",
            }}
          >
            We don’t just serve chai — we create a curated luxury experience
            that becomes a centerpiece at events. Our setup elevates the ambiance
            while delivering authentic, premium-quality chai.
          </p>

          {/* SUB HIGHLIGHT */}
          <p className="mt-8 text-[#D4AF37]/70 italic text-sm tracking-wide">
            Crafted to impress. Designed to be remembered.
          </p>

        </motion.div>

        {/* ───────── SCROLL INDICATOR ───────── */}
        {/* <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-14 bg-white/20" />
        </motion.div> */}

      </div>
    </section>
  );
}