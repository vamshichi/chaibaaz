'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    number: '01',
    title: 'Luxury Chai Cart',
    description:
      'Elegant live chai stations crafted for weddings, soirées, and unforgettable celebrations.',
    image: '/gallery/cart.jpg',
  },
  {
    number: '02',
    title: 'Event Catering',
    description:
      'Premium hospitality experiences curated for grand corporate and luxury private events.',
    image: '/gallery/event.png',
  },
  {
    number: '03',
    title: 'Custom Blends',
    description:
      'Signature handcrafted chai blends designed exclusively for your guests.',
    image: '/images/whyimage.jpeg',
  },
  {
    number: '04',
    title: 'Private Workshops',
    description:
      'Immersive chai artistry workshops blending culture, flavor, and luxury hospitality.',
    image: '/images/workshops.jpg',
  },
];

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const TOKEN = {
  cream:     '#F5EFE6',
  brownDark: '#2C1A0E',
  brownMid:  '#4A2E1A',
  gold:      '#B8964A',
  goldLight: '#D4AF6A',
  textBody:  '#5C3D22',
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function GoldOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span
        className="block h-px w-12 sm:w-16"
        style={{ background: `linear-gradient(to right, transparent, ${TOKEN.gold})` }}
      />
      <span style={{ color: TOKEN.gold, fontSize: 12 }}>✦</span>
      <span
        className="block h-px w-12 sm:w-16"
        style={{ background: `linear-gradient(to left, transparent, ${TOKEN.gold})` }}
      />
    </div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      whileHover={{ y: -4 }}
      style={{
        borderRadius: 24,
        border: `1px solid rgba(184,150,74,0.22)`,
        background: '#FFFFFF',
        boxShadow: `
          0 4px 24px rgba(44,26,14,0.07),
          0 1px 3px rgba(44,26,14,0.04),
          inset 0 0 0 1px rgba(255,255,255,0.9)
        `,
        overflow: 'hidden',
      }}
      className="group relative"
    >
      {/*
        Layout:
        • Mobile  → flex-col: image (fixed height) on top, content below — ALWAYS
        • Desktop → 2-col grid, alternating image/content order via CSS order
      */}
      <div className="flex flex-col md:grid md:grid-cols-2" style={{ minHeight: 'auto' }}>

        {/* ── IMAGE ──
            On mobile: order-1 (always on top)
            On desktop: order flips via isEven                              */}
        <div
          className={`relative overflow-hidden
            h-56 sm:h-64 md:h-auto
            ${isEven ? 'md:order-2' : 'md:order-1'}
          `}
          style={{ minHeight: 0 }}
        >
          {/* Force a concrete height on desktop via pseudo-element trick */}
          <div className="hidden md:block" style={{ paddingBottom: '75%' }} />

          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>

          {/* Fade toward content — hidden on mobile (full-width image) */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background: isEven
                ? `linear-gradient(to left,  transparent 55%, #FFFFFF 100%)`
                : `linear-gradient(to right, transparent 55%, #FFFFFF 100%)`,
            }}
          />
        </div>

        {/* ── CONTENT ── */}
        <div
          className={`relative flex flex-col justify-center
            px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-14
            ${isEven ? 'md:order-1' : 'md:order-2'}
          `}
          style={{ background: '#FFFFFF' }}
        >
          {/* Corner accent — desktop only */}
          <div
            className="absolute pointer-events-none hidden md:block"
            style={{
              top: 28,
              ...(isEven
                ? { left: 28, borderLeft: `1px solid rgba(184,150,74,0.28)`, borderRadius: '6px 0 0 0' }
                : { right: 28, borderRight: `1px solid rgba(184,150,74,0.28)`, borderRadius: '0 6px 0 0' }),
              width: 40,
              height: 40,
              borderTop: `1px solid rgba(184,150,74,0.28)`,
            }}
          />

          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 9,
              letterSpacing: '0.4em',
              color: TOKEN.gold,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Signature Experience
          </p>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              // FIX: floor raised so it reads well on mobile
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              lineHeight: 0.95,
              color: TOKEN.brownDark,
              marginBottom: 20,
            }}
          >
            {service.title}
          </h3>

          {/* Gold divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 40, height: 1, background: TOKEN.gold }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: TOKEN.gold }} />
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.75,
              color: TOKEN.textBody,
              maxWidth: 320,
              marginBottom: 32,
            }}
          >
            {service.description}
          </p>

          {/* CTA */}
          <motion.button
            whileHover="hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: "'Cinzel', serif",
              fontSize: 9,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: TOKEN.gold,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            <a href="#contact" >
            Enquire Now
            </a>
            <motion.span
              variants={{ hover: { width: 40 } }}
              style={{
                display: 'block',
                width: 28,
                height: 1,
                background: TOKEN.gold,
                position: 'relative',
              }}
              transition={{ duration: 0.3 }}
            >
              <span
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -3,
                  width: 6,
                  height: 6,
                  borderTop: `1px solid ${TOKEN.gold}`,
                  borderRight: `1px solid ${TOKEN.gold}`,
                  transform: 'rotate(45deg)',
                  display: 'block',
                }}
              />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export function ServicePanels() {
  return (
    <section
      id="services"
      style={{
        background: TOKEN.cream,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          opacity: 0.45,
          zIndex: 1,
        }}
      />

      {/* ── HEADER ── */}
      <div
        className="relative z-10 text-center px-5 sm:px-8"
        style={{ padding: '72px 20px 52px' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            // FIX: tighter tracking on mobile
            letterSpacing: 'clamp(0.2em, 0.55em, 0.55em)',
            color: TOKEN.gold,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Signature Offerings
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            // FIX: floor dropped for mobile so it fits in one line
            fontSize: 'clamp(2.6rem, 8vw, 7rem)',
            lineHeight: 0.92,
            color: TOKEN.brownDark,
          }}
        >
          Crafted for
          <br />
          <em style={{ fontStyle: 'italic', color: TOKEN.gold }}>
            timeless gatherings
          </em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <GoldOrnament className="mt-7" />
        </motion.div>
      </div>

      {/* Brand badge */}
      <div className="relative z-10 flex justify-center mb-10 px-4">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#FFFFFF',
            border: `1px solid rgba(184,150,74,0.22)`,
            borderRadius: 100,
            // FIX: smaller horizontal padding on mobile
            padding: '8px 16px',
            boxShadow: '0 2px 12px rgba(44,26,14,0.06)',
            // FIX: allow wrapping on very small screens
            flexWrap: 'wrap',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: TOKEN.gold }} />
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 8.5,
              // FIX: tighter tracking so it fits narrow screens
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: TOKEN.brownMid,
            }}
          >
            Chaibaaz · Luxury Hospitality
          </span>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: TOKEN.gold }} />
        </div>
      </div>

      {/* ── SERVICE CARDS ── */}
      <div
        className="relative z-10"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          // FIX: tighter side padding on mobile, comfortable on desktop
          padding: '0 16px 64px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>

      {/* ── FOOTER SIGNATURE ── */}
      <div
        className="relative z-10 text-center"
        style={{ padding: '32px 24px 60px' }}
      >
        <GoldOrnament className="mb-5" />
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: TOKEN.brownMid,
            letterSpacing: '0.08em',
          }}
        >
          Sip · Chill · Repeat
        </p>
      </div>
    </section>
  );
}