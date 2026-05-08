'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
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
    image: '/images/chaicart.jpeg',
  },
  {
    number: '02',
    title: 'Event Catering',
    description:
      'Premium hospitality experiences curated for grand corporate and luxury private events.',
    image: '/images/gallery-9.jpg',
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
   DESIGN TOKENS  (match logo palette)
───────────────────────────────────────────── */
const TOKEN = {
  cream:      '#F5EFE6',
  creamDark:  '#EDE3D4',
  brownDark:  '#2C1A0E',
  brownMid:   '#4A2E1A',
  gold:       '#B8964A',
  goldLight:  '#D4AF6A',
  goldPale:   '#E8D5A3',
  textBody:   '#5C3D22',
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/** Thin horizontal ornament  ·✦· */
function GoldOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span
        className="block h-px w-16"
        style={{ background: `linear-gradient(to right, transparent, ${TOKEN.gold})` }}
      />
      <span style={{ color: TOKEN.gold, fontSize: 12 }}>✦</span>
      <span
        className="block h-px w-16"
        style={{ background: `linear-gradient(to left, transparent, ${TOKEN.gold})` }}
      />
    </div>
  );
}

/** Individual card – alternating image/text layout */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      whileHover={{ y: -6 }}
      style={{
        borderRadius: 28,
        border: `1px solid rgba(184,150,74,0.22)`,
        background: '#FFFFFF',
        boxShadow: `
          0 4px 24px rgba(44,26,14,0.07),
          0 1px 3px rgba(44,26,14,0.04),
          inset 0 0 0 1px rgba(255,255,255,0.9)
        `,
        overflow: 'hidden',
        transition: 'box-shadow 0.5s ease',
      }}
      className="group relative"
    >
      {/* Hover shadow upgrade */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[28px]"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            boxShadow: `
              0 20px 60px rgba(44,26,14,0.13),
              0 4px 16px rgba(184,150,74,0.14)
            `,
          }}
        />
      </motion.div>

      {/* Grid: image + content  (order flips on even cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 400,
          direction: isEven ? 'rtl' : 'ltr',
        }}
      >
        {/* ── IMAGE HALF ── */}
        <div className="relative overflow-hidden" style={{ direction: 'ltr' }}>
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

          {/* Fade edge toward content */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isEven
                ? `linear-gradient(to left,  transparent 55%, #FFFFFF 100%)`
                : `linear-gradient(to right, transparent 55%, #FFFFFF 100%)`,
            }}
          />

          {/* Large ghost number */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 130,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.18)',
              lineHeight: 1,
            }}
          >
            {/* {service.number} */}
          </div>
        </div>

        {/* ── CONTENT HALF ── */}
        <div
          className="relative flex flex-col justify-center"
          style={{
            padding: '52px 52px',
            direction: 'ltr',
            background: '#FFFFFF',
          }}
        >
          {/* Corner accent */}
          <div
            className="absolute pointer-events-none"
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
              letterSpacing: '0.5em',
              color: TOKEN.gold,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Signature Experience
          </p>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2.2rem, 3.2vw, 3.4rem)',
              lineHeight: 0.92,
              color: TOKEN.brownDark,
              marginBottom: 24,
            }}
          >
            {service.title}
          </h3>

          {/* Gold divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 48, height: 1, background: TOKEN.gold }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: TOKEN.gold }} />
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.78,
              color: TOKEN.textBody,
              maxWidth: 300,
              marginBottom: 36,
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
            }}
          >
            Enquire Now
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
      {/* Noise texture overlay */}
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
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '96px 24px 64px',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            letterSpacing: '0.55em',
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
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            lineHeight: 0.9,
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
          <GoldOrnament className="mt-8" />
        </motion.div>
      </div>

      {/* Brand badge */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#FFFFFF',
            border: `1px solid rgba(184,150,74,0.22)`,
            borderRadius: 100,
            padding: '9px 24px',
            boxShadow: '0 2px 12px rgba(44,26,14,0.06)',
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: TOKEN.gold }} />
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 8.5,
              letterSpacing: '0.35em',
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
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 32px 80px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>

      {/* ── FOOTER SIGNATURE ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '40px 24px 72px',
        }}
      >
        <GoldOrnament className="mb-6" />
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.15rem',
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