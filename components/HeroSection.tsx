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
  "/gallery/event.jpg",
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
    <motion.div
      // FIX: wider padding so text never touches screen edges on mobile
      className="absolute w-full max-w-5xl px-6 sm:px-10"
      style={{ opacity, y }}
    >
      {/* FIX: tighter tracking on mobile to prevent overflow */}
      <p className="mb-4 sm:mb-6 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.5em] text-white/70">
        Chaibaaz Luxury Experiences
      </p>

      <h1
        className="text-white font-light leading-[0.92]"
        style={{
          // FIX: lower floor (2rem) so heading fits on 320px screens;
          // use 10vw so it grows smoothly from mobile → desktop
          fontSize: "clamp(2.2rem, 10vw, 8rem)",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {item.title}
      </h1>

      <div className="flex justify-center mt-6 mb-6 sm:mt-8 sm:mb-8">
        <div className="w-16 sm:w-24 h-px bg-[#C9A46A]/70" />
      </div>

      {/* FIX: tighter tracking on mobile */}
      <p className="text-white/65 tracking-[0.18em] sm:tracking-[0.35em] text-[10px] sm:text-xs uppercase">
        {item.subtitle}
      </p>
    </motion.div>
  );
}

function CtaPanel({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.85, 1], [0, 1]);
  const y = useTransform(progress, [0.85, 1], [50, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute flex flex-col items-center px-6"
    >
      {/* FIX: tighter tracking on mobile */}
      <p className="text-white/60 mb-6 sm:mb-8 tracking-[0.25em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] uppercase">
        Your moment awaits
      </p>
      <a href="/#booking">
        <motion.button
          // FIX: slightly smaller padding on mobile so button doesn't overflow
          className="px-7 py-3 sm:px-10 sm:py-4 rounded-full text-[#2A160D] tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-xs uppercase overflow-hidden relative"
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
        <div className="absolute inset-0 flex items-center justify-center text-center px-0">
          {STORY.map((item, i) => (
            <StoryPanel key={i} item={item} index={i} progress={progress} />
          ))}
          <CtaPanel progress={progress} />
        </div>

        {/* ── Chai Steam Effect ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">

          {/* CENTER STEAM
              FIX: spread calculated as a fraction of viewport width (vw) rather
              than fixed px, so it never overflows on narrow screens.
              We keep the same count but clamp x offsets to ±30vw max.           */}
          {[...Array(12)].map((_, i) => {
            // spread particles ±22vw around center; on 375px that's ±82px
            const xBase = -22 + (i / 11) * 44; // vw units, –22 → +22
            return (
              <motion.div
                key={i}
                className="absolute bottom-0 left-1/2"
                initial={{
                  x: `${xBase}vw`,
                  y: 0,
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  y: "-110vh",
                  x: [
                    `${xBase}vw`,
                    `${xBase - 3}vw`,
                    `${xBase + 4}vw`,
                    `${xBase - 2}vw`,
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
                  // FIX: vw-based sizing so steam scales with screen
                  width: `clamp(60px, ${8 + i * 0.6}vw, 160px)`,
                  height: `clamp(160px, ${20 + i * 1.5}vw, 340px)`,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 35%, transparent 75%)",
                  filter: "blur(14px)",
                  mixBlendMode: "screen",
                }}
              />
            );
          })}

          {/* LEFT STEAM — FIX: use % position instead of left-[28%] class (already %) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`left-${i}`}
              className="absolute bottom-0"
              initial={{ x: i * 12, opacity: 0 }}
              animate={{
                y: "-90vh",
                x: [i * 12, i * 22, i * 8],
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
                left: "20%",
                width: "clamp(60px, 12vw, 140px)",
                height: "clamp(140px, 22vw, 240px)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 72%)",
                filter: "blur(16px)",
              }}
            />
          ))}

          {/* RIGHT STEAM */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`right-${i}`}
              className="absolute bottom-0"
              initial={{ x: -i * 12, opacity: 0 }}
              animate={{
                y: "-92vh",
                x: [-i * 12, -i * 22, -i * 8],
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
                right: "20%",
                width: "clamp(60px, 12vw, 140px)",
                height: "clamp(140px, 22vw, 240px)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 72%)",
                filter: "blur(16px)",
              }}
            />
          ))}

          {/* GOLDEN HEAT GLOW */}
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
              // FIX: vw-based so glow doesn't overflow on mobile
              width: "clamp(200px, 70vw, 500px)",
              height: "clamp(80px, 14vw, 180px)",
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