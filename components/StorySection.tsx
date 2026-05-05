"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 28,
    damping: 32,
  });

  const textY = useTransform(progress, [0, 1], [60, -30]);
  const imageScale = useTransform(progress, [0, 1], [1.08, 1.18]);
  const imageY = useTransform(progress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative bg-[#0b0b0b] py-48 md:py-56 overflow-hidden"
    >

      {/* ───────── BACKGROUND LIGHT (SOFTER) ───────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.05), transparent 65%)",
        }}
      />

      {/* ───────── GRAIN (SUBTLE) ───────── */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay bg-[url('/noise.png')]" />

      {/* ───────── CONTENT ───────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-24 items-center">

        {/* ───────── LEFT: TEXT ───────── */}
        <motion.div style={{ y: textY }} className="max-w-xl">

          {/* EYEBROW */}
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/50 mb-10">
            About Chaibaaz
          </p>

          {/* HEADLINE */}
          <h2
            className="text-white font-light leading-[1.15] mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              letterSpacing: "0.02em",
            }}
          >
            Where tradition meets
            <br />
            <span className="text-[#D4AF37] italic">
              refined experiences
            </span>
          </h2>

          {/* STORY */}
          <div className="space-y-14">

            {/* BLOCK 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-5">
                What we do
              </p>

              <p className="text-white/65 leading-relaxed text-[15px]">
                Chaibaaz provides luxury chai catering experiences for weddings,
                corporate events, private soirées, grand openings, and cultural
                celebrations across the Greater Toronto Area.
              </p>
            </motion.div>

            {/* BLOCK 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-5">
                Our journey
              </p>

              <p className="text-white/65 leading-relaxed text-[15px]">
                Since 2024, Chaibaaz has been redefining chai experiences through
                a blend of tradition, elegance, and modern hospitality.
              </p>
            </motion.div>

          </div>

          {/* DIVIDER */}
          <div className="mt-16 w-24 h-px bg-[#D4AF37]/30" />
        </motion.div>

        {/* ───────── RIGHT: IMAGE ───────── */}
        <motion.div
          className="relative h-[520px] rounded-3xl overflow-hidden"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/images/chai-cart.jpg"
            alt="Chaibaaz Experience"
            fill
            className="object-cover"
          />

          {/* SOFTER OVERLAY */}
          <div className="absolute inset-0 bg-black/25" />

          {/* GOLD LIGHT (REFINED) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 60% 40%, rgba(212,175,55,0.12), transparent 70%)",
            }}
          />

          {/* EDGE SOFTENING */}
          <div className="absolute inset-0 ring-1 ring-white/5 rounded-3xl" />
        </motion.div>

      </div>

      {/* ───────── BOTTOM FADE ───────── */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}