'use client';

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

// ───────────────── BACKGROUND IMAGES ─────────────────
const BACKGROUNDS = [
  "/images/chai-cart.jpg",
  "/images/custom-blends.jpg",
  "/images/event-catering.jpg",
];

// ───────────────── TEXT STORY ─────────────────
const STORY = [
  {
    title: "Luxury Chai",
    subtitle: "An experience beyond taste",
    range: [0, 0.2],
  },
  {
    title: "Crafted Moments",
    subtitle: "Designed for timeless gatherings",
    range: [0.3, 0.5],
  },
  {
    title: "Elevate Every Event",
    subtitle: "Where elegance meets tradition",
    range: [0.6, 0.8],
  },
];

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 30,
  });

  // ── Mouse parallax light ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const glowX = useTransform(mouseX, [0, 1], ["-5%", "5%"]);
  const glowY = useTransform(mouseY, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="relative h-[350vh]">

      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ───────── CINEMATIC BACKGROUND ───────── */}
        <div className="absolute inset-0">

          {BACKGROUNDS.map((src, index) => {
            const start = index / BACKGROUNDS.length;
            const end = start + 1 / BACKGROUNDS.length;

            const opacity = useTransform(
              progress,
              [start, start + 0.15, end - 0.15, end],
              [0, 1, 1, 0]
            );

            const scale = useTransform(progress, [start, end], [1.1, 1.25]);
            const blur = useTransform(progress, [start, end], ["0px", "10px"]);

            return (
              <motion.div
                key={index}
                className="absolute inset-0"
                style={{ opacity, scale, filter: blur }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        {/* ───────── LIGHT GLOW ───────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: glowX, y: glowY }}
        >
          <div
            className="absolute"
            style={{
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              height: "700px",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.2), transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>

        {/* ───────── OVERLAYS ───────── */}
        <div className="absolute inset-0 bg-black/60" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {/* ───────── TEXT STORY ───────── */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">

          {STORY.map((item, i) => {
            const opacity = useTransform(
              progress,
              [item.range[0], item.range[0] + 0.1, item.range[1] - 0.1, item.range[1]],
              [0, 1, 1, 0]
            );

            const y = useTransform(
              progress,
              item.range,
              [60, 0]
            );

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ opacity, y }}
              >
                <h1
                  className="text-white font-light"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 7rem)",
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {item.title}
                </h1>

                <p className="mt-6 text-white/60 tracking-widest text-xs uppercase">
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}

          {/* ───────── FINAL CTA ───────── */}
          <motion.div
            style={{
              opacity: useTransform(progress, [0.85, 1], [0, 1]),
              y: useTransform(progress, [0.85, 1], [40, 0]),
            }}
            className="absolute flex flex-col items-center"
          >
            <p className="text-white/60 mb-6 tracking-[0.4em] text-xs uppercase">
              Your moment awaits
            </p>

            <button className="px-10 py-4 bg-white text-black rounded-full tracking-widest text-sm hover:scale-105 transition">
              Book Experience
            </button>
          </motion.div>

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