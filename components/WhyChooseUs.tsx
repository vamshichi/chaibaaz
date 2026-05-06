"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const FEATURES = [
  {
    number: "01",
    title: "Luxury Presentation",
    description:
      "Elegant chai stations designed to elevate the atmosphere of premium events and celebrations.",
  },
  {
    number: "02",
    title: "Authentic Craftsmanship",
    description:
      "Traditional chai recipes blended with modern sophistication and curated hospitality.",
  },
  {
    number: "03",
    title: "Memorable Experiences",
    description:
      "Every serving becomes part of the event story — immersive, warm, and unforgettable.",
  },
];

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

  const opacity = useTransform(
    progress,
    [0.05, 0.2, 0.85, 1],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [0.05, 0.2, 0.85, 1],
    prefersReduced
      ? [0, 0, 0, 0]
      : [60, 0, 0, -40]
  );

  return (
    <section
      id="services"
      ref={ref}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0F0A07]
        py-36
        md:py-44
      "
    >

      {/* ───────────────── CINEMATIC BG ───────────────── */}

{/* MAIN IMAGE */}
<div
  className="absolute inset-0 bg-cover bg-center scale-105"
  style={{
    backgroundImage: "url('/images/whyimage.png')",
  }}
/>

{/* DARK CINEMATIC OVERLAY */}
<div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(to bottom, rgba(20,10,5,0.78), rgba(20,10,5,0.82))",
  }}
/>

{/* GOLD LIGHT */}
<div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at center, rgba(201,164,106,0.18), transparent 60%)",
  }}
/>

{/* LUXURY VIGNETTE */}
<div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
  }}
/>

{/* NOISE TEXTURE */}
<div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light bg-[url('/noise.png')]" />

      {/* ───────────────── MAIN CONTENT ───────────────── */}

      <motion.div
        style={{ opacity, y }}
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-20
        "
      >

        {/* TOP LABEL */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            text-center
            text-[10px]
            uppercase
            tracking-[0.5em]
            text-[#B88B4A]
            mb-8
          "
        >
          Why Choose Chaibaaz
        </motion.p>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="
            text-center
            text-[#F6F0E7]
            font-light
            leading-[1]
            mb-10
          "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
          }}
        >
          More than chai.
          <br />

          <span className="italic text-[#B88B4A]">
            A luxury hospitality ritual.
          </span>
        </motion.h2>

        {/* DIVIDER */}
        <div className="flex justify-center items-center gap-4 mb-20">
          <div className="w-16 h-px bg-[#C9A46A]" />
          <div className="w-2 h-2 rounded-full bg-[#C9A46A]" />
          <div className="w-16 h-px bg-[#C9A46A]" />
        </div>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="
            max-w-3xl
            mx-auto
            text-center
            text-[#E7D8C7]
            leading-relaxed
            text-[17px]
            md:text-[18px]
            mb-24
          "
        >
          Chaibaaz transforms traditional chai into an elevated luxury
          experience — blending authentic flavors, refined presentation,
          and immersive hospitality designed for unforgettable events.
        </motion.p>

        {/* ───────────────── FEATURE CARDS ───────────────── */}

        <div className="grid md:grid-cols-3 gap-8">

          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                p-10
                bg-black/45
                backdrop-blur-2xl
                border
                border-[#C9A46A]/20
                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
              "
            >

              {/* GOLD LIGHT */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(201,164,106,0.18), transparent 60%)",
                }}
              />

              {/* NUMBER */}
              <p
                className="
                  text-[#C9A46A]
                  text-sm
                  tracking-[0.35em]
                  mb-10
                "
              >
                {feature.number}
              </p>

              {/* TITLE */}
              <h3
  className="
    text-[#F8F3EC]
    text-4xl
    mb-6
    leading-tight
    drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]
  "
  style={{
    fontFamily: "'Cormorant Garamond', serif",
  }}
>
  {feature.title}
</h3>

              {/* TEXT */}
              <p
  className="
    text-[#E7D8C7]
    leading-relaxed
    text-[15px]
    drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]
  "
>
  {feature.description}
</p>

              {/* BOTTOM LINE */}
              <div className="mt-10 flex items-center gap-3">
                <div className="w-10 h-px bg-[#C9A46A]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A46A]" />
              </div>

            </motion.div>
          ))}

        </div>

        {/* ───────────────── BOTTOM QUOTE ───────────────── */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-28"
        >

          <p
            className="
              text-[#B88B4A]
              italic
              text-lg
              tracking-wide
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Crafted to impress. Designed to be remembered.
          </p>

        </motion.div>

      </motion.div>

    

    </section>
  );
}