'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Magnetic from './Magnetic';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const TOKEN = {
  cream: '#F6F0E7',
  creamMid: '#EFE6D8',
  brownDark: '#2A160D',
  brownMid: '#5B4636',
  brownSoft: '#7A6A5A',
  gold: '#C9A46A',
  goldMid: '#B88B4A',
};

/* ─────────────────────────────────────────────
   STAT ITEM
───────────────────────────────────────────── */
function StatItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 9,
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: TOKEN.goldMid,
          marginBottom: 10,
        }}
      >
        {label}
      </p>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '1.2rem',
          color: TOKEN.brownDark,
          lineHeight: 1.3,
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CIRCULAR CTA BUTTON
───────────────────────────────────────────── */
function CircularButton() {
  return (
    <Magnetic>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 18,
        }}
        aria-label="Inquire about a Chaibaaz experience"
        style={{
          position: 'relative',
          width: 320,
          height: 320,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {/* OUTER GOLD RING */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'conic-gradient(from 180deg, transparent, rgba(201,164,106,0.28), transparent)',
            filter: 'blur(1px)',
          }}
        />

        {/* RING */}
        <div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            border: `1px solid rgba(201,164,106,0.35)`,
          }}
        />

        {/* INNER RING */}
        <div
          style={{
            position: 'absolute',
            inset: 28,
            borderRadius: '50%',
            border: `1px solid rgba(201,164,106,0.18)`,
          }}
        />

        {/* GLASS CENTER */}
        <div
          style={{
            position: 'absolute',
            inset: 46,
            borderRadius: '50%',
            background: `
              linear-gradient(
                145deg,
                rgba(255,255,255,0.58),
                rgba(255,255,255,0.22)
              )
            `,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.28)',
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.4),
              0 25px 80px rgba(42,22,13,0.12)
            `,
          }}
        />

        {/* GOLD AMBIENT GLOW */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,164,106,0.18), transparent 65%)',
            filter: 'blur(40px)',
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 9,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: TOKEN.goldMid,
              marginBottom: 18,
            }}
          >
            Reserve Experience
          </p>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2.6rem, 5vw, 4rem)',
              lineHeight: 1,
              color: TOKEN.brownDark,
            }}
          >
            Inquire
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 22,
            }}
          >
            <div
              style={{
                width: 58,
                height: 1,
                background: TOKEN.gold,
              }}
            />
          </div>
        </div>
      </motion.button>
    </Magnetic>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function FinalCTA() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, {
    once: true,
    margin: '-80px 0px',
  });

  const rightInView = useInView(rightRef, {
    once: true,
    margin: '-80px 0px',
  });

  const footInView = useInView(footRef, {
    once: true,
    margin: '-40px 0px',
  });

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '180px 24px',
        backgroundColor: TOKEN.cream,

        backgroundImage: `
          linear-gradient(
            rgba(246,240,231,0.88),
            rgba(239,230,216,0.92)
          ),
          url('/images/luxury-paper-texture.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* PREMIUM CLASSIC OVERLAY */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(
              circle at top left,
              rgba(201,164,106,0.16),
              transparent 32%
            ),

            radial-gradient(
              circle at bottom right,
              rgba(184,139,74,0.14),
              transparent 38%
            ),

            linear-gradient(
              135deg,
              rgba(255,255,255,0.45),
              transparent 40%,
              rgba(42,22,13,0.03) 100%
            )
          `,
          mixBlendMode: 'multiply',
        }}
      />

      {/* VINTAGE GRAIN */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: `
            radial-gradient(
              rgba(42,22,13,0.15) 0.7px,
              transparent 0.7px
            )
          `,
          backgroundSize: '7px 7px',
        }}
      />

      {/* VIGNETTE */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 180px rgba(42,22,13,0.10)',
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        {/* TOP RULE */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 100,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 980,
              height: 1,
              background:
                'linear-gradient(to right, transparent, rgba(201,164,106,0.5), transparent)',
            }}
          />
        </div>

        {/* GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 100,
            alignItems: 'center',
          }}
        >
          {/* LEFT */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 40 }}
            animate={
              leftInView
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              maxWidth: 580,
            }}
          >
            {/* EYEBROW */}
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 9,
                letterSpacing: '0.52em',
                textTransform: 'uppercase',
                color: TOKEN.goldMid,
                marginBottom: 28,
              }}
            >
              Chaibaaz Luxury Experience
            </p>

            {/* HEADING */}
            <h2
              id="cta-heading"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                lineHeight: 0.92,
                color: TOKEN.brownDark,
                marginBottom: 36,
              }}
            >
              Let's create
              <em
                style={{
                  fontStyle: 'italic',
                  color: TOKEN.goldMid,
                  display: 'block',
                }}
              >
                something unforgettable
              </em>
            </h2>

            {/* DIVIDER */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 36,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 1,
                  background: TOKEN.gold,
                }}
              />

              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: TOKEN.gold,
                }}
              />

              <div
                style={{
                  width: 60,
                  height: 1,
                  background: TOKEN.gold,
                }}
              />
            </div>

            {/* BODY */}
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.9,
                color: TOKEN.brownMid,
                maxWidth: 500,
              }}
            >
              Every gathering deserves a signature
              experience. From intimate celebrations
              to grand luxury events, Chaibaaz crafts
              immersive chai hospitality designed to
              leave a lasting impression on every
              guest.
            </p>

            {/* STATS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 40,
                marginTop: 56,
              }}
            >
              <StatItem
                label="Experiences"
                value="Weddings · Events · Luxury Gatherings"
              />

              <StatItem
                label="Hospitality"
                value="Crafted with warmth & elegance"
              />
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              rightInView
                ? { opacity: 1, scale: 1 }
                : {}
            }
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularButton />
          </motion.div>
        </div>

        {/* FOOTER */}
        <motion.div
          ref={footRef}
          initial={{ opacity: 0 }}
          animate={
            footInView
              ? { opacity: 1 }
              : {}
          }
          transition={{
            duration: 1,
            delay: 0.15,
          }}
          style={{
            textAlign: 'center',
            marginTop: 120,
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 8.5,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: TOKEN.brownSoft,
            }}
          >
            Premium Chai Catering · Luxury Hospitality
            · Chaibaaz
          </p>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 180,
          background: `linear-gradient(to top, ${TOKEN.creamMid}, transparent)`,
        }}
      />
    </section>
  );
}