'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (matches Chaibaaz logo palette)
───────────────────────────────────────────── */
const TOKEN = {
  cream:     '#F5EFE6',
  creamDark: '#EDE3D4',
  brownDark: '#2C1A0E',
  brownMid:  '#4A2E1A',
  gold:      '#B8964A',
  goldLight: '#D4AF6A',
  textBody:  '#5C3D22',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const GALLERY = [
  {
    image: '/gallery/event.jpg',
    index: '01',
    label: 'Weddings',
    title: 'Luxury\nWedding Setup',
    description:
      'Elegant chai experiences crafted for unforgettable wedding celebrations, where every cup tells a story of love and tradition.',
    features: [
      'Premium decor styling',
      'Traditional chai service',
      'Guest-focused experience',
    ],
  },
  {
    image: '/gallery/g13.png',
    index: '02',
    label: 'Corporate',
    title: 'Corporate\nExperience',
    description:
      'Professional chai catering designed for high-end corporate gatherings that leave a lasting impression on every guest.',
    features: [
      'Executive presentation',
      'Quick service flow',
      'Brand-aligned setup',
    ],
  },
  {
    image: '/images/gallery-8.jpg',
    index: '03',
    label: 'Private',
    title: 'Private\nCelebrations',
    description:
      'Intimate chai moments tailored for exclusive private events, where luxury meets the warmth of a handcrafted cup.',
    features: [
      'Customised menu',
      'Luxury ambiance',
      'Personalised service',
    ],
  },
  // {
  //   image: '/gallery/event.jpg',
  //   index: '04',
  //   label: 'Cultural',
  //   title: 'Cultural\nEvents',
  //   description:
  //     'Authentic chai experiences rooted in tradition and heritage, honouring the art of chai-making across generations.',
  //   features: [
  //     'Cultural presentation',
  //     'Authentic recipes',
  //     'Traditional aesthetics',
  //   ],
  // },
] as const;

const COUNT = GALLERY.length;

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function range(index: number): [number, number] {
  return [index / COUNT, (index + 1) / COUNT];
}

/* ─────────────────────────────────────────────
   BACKGROUND SLIDE
───────────────────────────────────────────── */
function BgSlide({
  item,
  index,
  progress,
}: {
  item: (typeof GALLERY)[number];
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const [start, end] = range(index);

  const opacity = useTransform(
    progress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0],
  );

  const scale = useTransform(progress, [start, end], [1.08, 1.22]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, scale, willChange: 'opacity, transform' }}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="100vw"
        className="object-cover"
        priority={index === 0}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CONTENT PANEL
───────────────────────────────────────────── */
function ContentPanel({
  item,
  index,
  progress,
}: {
  item: (typeof GALLERY)[number];
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const [start, end] = range(index);

  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0],
  );

  const y = useTransform(progress, [start, end], [72, -48]);

  const titleLines = item.title.split('\n');

  return (
    <motion.div
      style={{ opacity, y, willChange: 'opacity, transform' }}
      className="absolute inset-0 flex items-end md:items-center px-6 pb-24 md:pb-0 md:px-20 lg:px-28"
    >
      <div className="max-w-lg w-full">

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 9,
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              color: TOKEN.goldLight,
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              display: 'block',
              width: 32,
              height: 1,
              background: TOKEN.gold,
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 9,
              letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            {item.index}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
            lineHeight: 0.92,
            color: '#FFFFFF',
            marginBottom: 28,
          }}
        >
          {titleLines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 1
                ? <em style={{ fontStyle: 'italic', color: TOKEN.goldLight }}>{line}</em>
                : line}
            </span>
          ))}
        </h2>

        {/* Gold divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <div style={{ width: 48, height: 1, background: TOKEN.gold }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: TOKEN.gold }} />
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.68)',
            marginBottom: 32,
          }}
        >
          {item.description}
        </p>

        {/* Features */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {item.features.map((feature, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                letterSpacing: '0.05em',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: TOKEN.gold,
                  flexShrink: 0,
                }}
              />
              {feature}
            </li>
          ))}
        </ul>

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS INDICATOR  (right side dots)
───────────────────────────────────────────── */
function ProgressDots({ progress }: { progress: ReturnType<typeof useSpring> }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: 32,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        zIndex: 20,
      }}
    >
      {GALLERY.map((item, i) => {
        const [start, end] = range(i);
        // Each dot brightens when its panel is active
        const dotOpacity = useTransform(
          progress,
          [start, start + 0.08, end - 0.08, end],
          [0.25, 1, 1, 0.25],
        );
        const dotScale = useTransform(
          progress,
          [start, start + 0.08, end - 0.08, end],
          [1, 1.5, 1.5, 1],
        );
        return (
          <motion.div
            key={i}
            style={{ opacity: dotOpacity, scale: dotScale }}
            title={item.label}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: TOKEN.goldLight,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL COUNTER  (bottom centre)
───────────────────────────────────────────── */
function ScrollCounter({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const displayIndex = useTransform(progress, [0, 1], [1, COUNT]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {/* Animated scroll line */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
      >
        <div style={{ width: 1, height: 40, background: `rgba(255,255,255,0.25)` }} />
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: TOKEN.goldLight,
          }}
        />
      </motion.div>

      {/* Index label */}
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 8,
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          marginTop: 4,
        }}
      >
        Scroll
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CINEMATIC VIGNETTE + OVERLAYS
───────────────────────────────────────────── */
function Overlays() {
  return (
    <>
      {/* Base dark scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(15,8,3,0.52)', zIndex: 2 }}
      />

      {/* Left content gradient  */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(15,8,3,0.72) 0%, rgba(15,8,3,0.30) 55%, transparent 100%)',
          zIndex: 3,
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(15,8,3,0.6) 0%, transparent 50%)',
          zIndex: 3,
        }}
      />

      {/* Noise texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.55,
          zIndex: 4,
        }}
      />

      {/* Brand badge — top right */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          right: 28,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          border: `1px solid rgba(184,150,74,0.25)`,
          borderRadius: 100,
          padding: '8px 20px',
        }}
      >
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: TOKEN.goldLight }} />
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 8,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          Chaibaaz
        </span>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: TOKEN.goldLight }} />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function GalleryStorytelling() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 18,
    damping: 32,
    mass: 0.6,
  });

  return (
    <section
      ref={ref}
      id="gallery"
      style={{ position: 'relative', height: `${COUNT * 100}vh` }}
      aria-label="Gallery storytelling"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: '#0F0803' }}
      >

        {/* ── BACKGROUND IMAGES ── */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {GALLERY.map((item, i) => (
            <BgSlide key={i} item={item} index={i} progress={progress} />
          ))}
        </div>

        {/* ── CINEMATIC OVERLAYS ── */}
        <Overlays />

        {/* ── CONTENT PANELS ── */}
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          {GALLERY.map((item, i) => (
            <ContentPanel key={i} item={item} index={i} progress={progress} />
          ))}
        </div>

        {/* ── RIGHT SIDE DOTS ── */}
        <ProgressDots progress={progress} />

        {/* ── SCROLL INDICATOR ── */}
        {/* <ScrollCounter progress={progress} /> */}

      </div>
    </section>
  );
}