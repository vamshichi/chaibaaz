'use client';

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const BACKGROUNDS = [
  "/images/herobg-1.png",
  "/images/chai-cart.jpg",
  "/images/gallery-9.jpg",
];

const STORY = [
  {
    title: "Luxury Chai",
    subtitle: "An experience beyond taste",
    range: [0, 0.2] as [number, number],
  },
  {
    title: "Crafted Moments",
    subtitle: "Designed for timeless gatherings",
    range: [0.3, 0.5] as [number, number],
  },
  {
    title: "Elevate Every Event",
    subtitle: "Where elegance meets tradition",
    range: [0.6, 0.8] as [number, number],
  },
];

// ─── FIX 1: Extract each background into its own component so hooks
//     are called at the top level of a component, not inside .map() ───

function BgImage({
  src,
  index,
  progress,
}: {
  src: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const total = BACKGROUNDS.length;
  const start = index / total;
  const end = start + 1 / total;

  const opacity =
    index === 0
      ? useTransform(progress, [0, 0.1, 0.2], [1, 1, 0])
      : useTransform(
        progress,
        [start, start + 0.1, end - 0.1, end],
        [0, 1, 1, 0]
      );

  const scale = useTransform(progress, [start, end], [1.05, 1.15]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity, scale }}>
      <Image
        src={src}
        alt=""
        fill
        priority={index === 0}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#120B07]/45" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(18,11,7,0.62))",
        }}
      />
    </motion.div>
  );
}

// ─── FIX 1 (cont): Same pattern for each story text panel ───

function StoryPanel({
  item,
  index,
  progress,
}: {
  item: (typeof STORY)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity =
    index === 0
      ? useTransform(
        progress,
        [0, item.range[1] - 0.05, item.range[1]],
        [1, 1, 0]
      )
      : useTransform(
        progress,
        [item.range[0], item.range[0] + 0.08, item.range[1] - 0.08, item.range[1]],
        [0, 1, 1, 0]
      );

  const y =
    index === 0
      ? useTransform(progress, [0, item.range[1]], [0, 0])
      : useTransform(progress, item.range, [50, 0]);

  return (
    <motion.div className="absolute max-w-5xl" style={{ opacity, y }}>
      <p className="mb-6 text-[10px] uppercase tracking-[0.5em] text-white/70">
        Chaibaaz Luxury Experiences
      </p>
      <h1
        className="text-white font-light leading-[0.92]"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 8rem)",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {item.title}
      </h1>
      <div className="flex justify-center mt-8 mb-8">
        <div className="w-24 h-px bg-[#C9A46A]/70" />
      </div>
      <p className="text-white/65 tracking-[0.35em] text-xs uppercase">
        {item.subtitle}
      </p>
    </motion.div>
  );
}

// ─── FIX 1 (cont): CTA panel ───

function CtaPanel({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.85, 1], [0, 1]);
  const y = useTransform(progress, [0.85, 1], [50, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute flex flex-col items-center"
    >
      <p className="text-white/60 mb-8 tracking-[0.4em] text-[10px] uppercase">
        Your moment awaits
      </p>
      <a href="/#booking">
      <motion.button
        className="px-10 py-4 rounded-full text-[#2A160D] tracking-[0.25em] text-xs uppercase overflow-hidden relative"
        style={{
          background:
            "linear-gradient(135deg, #C9A46A 0%, #F0D6A2 50%, #B88B4A 100%)",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px rgba(201,164,106,0.35)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        Book Experience
      </motion.button>
      </a>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───

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

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[350vh] bg-[#0A0604] isolate"
      style={{
        background:
          "radial-gradient(circle at center, #1A120D 0%, #0A0604 70%)",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Background Images ── */}
        <div className="absolute inset-0">
          {BACKGROUNDS.map((src, index) => (
            <BgImage key={index} src={src} index={index} progress={progress} />
          ))}
        </div>

        {/* ── Cinematic Vignette ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(10,6,4,0.88) 100%)",
          }}
        />

        {/* ── Hero Content ── */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          {STORY.map((item, i) => (
            <StoryPanel key={i} item={item} index={i} progress={progress} />
          ))}
          <CtaPanel progress={progress} />
        </div>

        {/* ── FIX 2: Chai Steam Effect — opacity boosted, blur reduced ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">

          {/* CENTER STEAM — was max 0.18 opacity, now 0.45; blur 30px → 18px */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 left-1/2"
              initial={{
                x: -200 + i * 35,
                y: 0,
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                y: -900,
                x: [
                  -200 + i * 35,
                  -170 + i * 30,
                  -220 + i * 40,
                  -180 + i * 35,
                ],
                opacity: [0, 0.7, 0.45, 0],
                scale: [0.7, 1.1, 1.4, 1.8],
                rotate: [-8, 6, -5, 10],
              }}
              transition={{
                duration: 10 + i * 0.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.4,
              }}
              style={{
                width: `${120 + i * 8}px`,
                height: `${260 + i * 20}px`,
                borderRadius: "50%",
                background:
  "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 35%, transparent 75%)",
                filter: "blur(14px)",
                mixBlendMode: "screen",
              }}
            />
          ))}

          {/* LEFT STEAM — opacity 0.1 → 0.28; blur 26px → 16px */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`left-${i}`}
              className="absolute bottom-0 left-[28%]"
              initial={{ x: i * 20, opacity: 0 }}
              animate={{
                y: -700,
                x: [i * 20, i * 35, i * 10],
                opacity: [0, 0.28, 0],
                scale: [0.8, 1.3, 1.7],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.2,
              }}
              style={{
                width: "140px",
                height: "240px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 72%)",
                filter: "blur(16px)",
              }}
            />
          ))}

          {/* RIGHT STEAM — opacity 0.1 → 0.28; blur 24px → 16px */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`right-${i}`}
              className="absolute bottom-0 right-[28%]"
              initial={{ x: -i * 20, opacity: 0 }}
              animate={{
                y: -720,
                x: [-i * 20, -i * 35, -i * 10],
                opacity: [0, 0.28, 0],
                scale: [0.8, 1.3, 1.7],
              }}
              transition={{
                duration: 9 + i,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.1,
              }}
              style={{
                width: "140px",
                height: "240px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 72%)",
                filter: "blur(16px)",
              }}
            />
          ))}

          {/* GOLDEN HEAT GLOW — unchanged, looks good */}
          <motion.div
            animate={{
              opacity: [0.2, 0.38, 0.2],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "500px",
              height: "180px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,164,106,0.38) 0%, transparent 72%)",
              filter: "blur(40px)",
            }}
          />
        </div>

      </div>
    </section>
  );
}