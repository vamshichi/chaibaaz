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

  const textY = useTransform(progress, [0, 1], [50, -20]);
  const imageScale = useTransform(progress, [0, 1], [1.02, 1.08]);
  const imageY = useTransform(progress, [0, 1], ["0%", "-4%"]);

  return (
    <section
      id="experience"
      ref={ref}
      className="
        relative
        overflow-hidden
        py-24 md:py-40 lg:py-52
        bg-[#F6F0E7]
      "
    >

      {/* ── LUXURY BACKGROUND ── */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #F6F0E7 0%, #EFE6D8 45%, #F3E8D8 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(201,164,106,0.10), transparent 60%)",
        }}
      />

      <div className="absolute inset-0 opacity-[0.025] mix-blend-multiply bg-[url('/noise.png')]" />

      {/* ── CONTENT ── */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT TEXT ── */}

          <motion.div
            style={{ y: textY }}
            className="max-w-2xl"
          >

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="
                text-[10px]
                uppercase
                tracking-[0.5em]
                text-[#C9A46A]
                mb-6 md:mb-8
              "
            >
              About Chaibaaz
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="
                text-[#2A160D]
                font-light
                leading-[1.05]
                mb-8 md:mb-12
              "
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                /* FIX: tighter clamp so it doesn't overflow on small screens */
                fontSize: "clamp(2.4rem, 5vw, 5.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Crafted for
              <br />
              <span className="italic text-[#B88B4A]">
                unforgettable gatherings
              </span>
            </motion.h2>

            <div className="flex items-center gap-4 mb-10 md:mb-14">
              <div className="w-16 h-px bg-[#C9A46A]" />
              <div className="w-2 h-2 rounded-full bg-[#C9A46A]" />
              <div className="w-16 h-px bg-[#C9A46A]" />
            </div>

            <div className="space-y-8 md:space-y-12">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#B88B4A] mb-3 md:mb-4">
                  What we create
                </p>
                <p className="text-[#5B4636] leading-relaxed text-[15px] md:text-[17px]">
                  Chaibaaz curates luxury chai catering experiences
                  for weddings, private celebrations, corporate
                  soirees, concerts, and premium cultural gatherings,
                  blending timeless hospitality with elevated design.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#B88B4A] mb-3 md:mb-4">
                  Our philosophy
                </p>
                <p className="text-[#5B4636] leading-relaxed text-[15px] md:text-[17px]">
                  Every experience is designed with warmth,
                  elegance, and intention transforming
                  traditional chai into a refined luxury ritual.
                </p>
              </motion.div>

            </div>

            {/* <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 10px 40px rgba(201,164,106,0.22)",
              }}
              whileTap={{ scale: 0.98 }}
              className="
                mt-10 md:mt-14
                px-7 md:px-8
                py-3.5 md:py-4
                rounded-full
                text-[#F6F0E7]
                uppercase
                tracking-[0.25em]
                text-xs
              "
              style={{
                background:
                  "linear-gradient(135deg, #2A160D 0%, #5B4636 100%)",
              }}
            >
              Explore Experience
            </motion.button> */}

          </motion.div>

          {/* ── RIGHT IMAGE ──
              FIX: Added pb-10 sm:pb-0 so the floating card that extends
              -bottom-10 is not clipped when stacked on mobile.
              Also changed overflow from implicit to explicit on wrapper.
          ── */}

          <motion.div
            className="relative pb-10 sm:pb-12 lg:pb-0"
            style={{
              scale: imageScale,
              y: imageY,
            }}
          >

            {/* MAIN IMAGE CARD
                FIX: h-[420px] on mobile, scales up to 650px on desktop */}
            <div
              className="
                relative
                h-[420px] sm:h-[520px] lg:h-[650px]
                rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem]
                overflow-hidden
                shadow-[0_30px_80px_rgba(42,22,13,0.12)]
              "
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/gallery/g6.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-[#2A160D]/10" />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 70% 30%, rgba(201,164,106,0.20), transparent 65%)",
                }}
              />

              {/* INNER BORDER — match rounded corners */}
              <div className="absolute inset-0 ring-1 ring-white/40 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem]" />
            </div>

            {/* FLOATING CARD
                FIX 1: -bottom-10 kept, but parent now has pb-10 to show it
                FIX 2: -left-4 sm:-left-10 so it doesn't overflow on tiny screens
                FIX 3: Responsive text sizes and padding
            */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="
                absolute
                -bottom-10
                -left-4 sm:-left-10
                bg-white/70
                backdrop-blur-xl
                border border-white/40
                rounded-2xl sm:rounded-3xl
                px-5 sm:px-8
                py-4 sm:py-6
                shadow-2xl
              "
            >
              <p
                className="
                  text-[9px] sm:text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-[#B88B4A]
                  mb-1 sm:mb-2
                "
              >
                Since 2024
              </p>

              <h3
                className="text-[#2A160D] text-lg sm:text-2xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Luxury Chai
                <br />
                Experiences
              </h3>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* ── BOTTOM TRANSITION ── */}

      <div
        className="absolute bottom-0 left-0 w-full h-40"
        style={{
          background:
            "linear-gradient(to top, rgba(239,230,216,1), transparent)",
        }}
      />

    </section>
  );
}