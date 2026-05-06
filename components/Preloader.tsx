'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>

      {!isComplete && (

        <motion.div
          className="
            fixed
            inset-0
            z-[99999]
            overflow-hidden
            flex
            items-center
            justify-center
            bg-[#0B0705]
          "
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(10px)',
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          {/* ───────────────── VIDEO BACKGROUND ───────────────── */}

<video
  autoPlay
  muted
  loop
  playsInline
  className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    opacity-[0.45]
    scale-[1.02]
  "
>
  <source
    src="/videos/chai-cart.mp4"
    type="video/mp4"
  />
</video>

{/* DARK CINEMATIC OVERLAY */}


{/* GOLD LIGHT */}
<div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at 50% 40%, rgba(201,164,106,0.16), transparent 45%)",
  }}
/>

{/* CINEMATIC VIGNETTE */}
<div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.92) 100%)",
  }}
/>

{/* NOISE */}
<div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />
         
          {/* ───────────────── CONTENT ───────────────── */}

          <div className="relative z-20 flex flex-col items-center">

            {/* LOGO */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >

              {/* GOLD GLOW */}
              <div
                className="
                  absolute
                  inset-0
                  scale-150
                "
                style={{
                  background:
                    "radial-gradient(circle, rgba(201,164,106,0.18), transparent 70%)",
                  filter: 'blur(35px)',
                }}
              />

              <Image
                src="/chai-logo-white.png"
                alt="Chaibaaz"
                width={320}
                height={120}
                priority
                className="
                  relative
                  z-10
                  object-contain
                  w-[220px]
                  md:w-[300px]
                  h-auto
                "
              />

            </motion.div>

            {/* DIVIDER */}
            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                delay: 0.7,
                duration: 1,
                ease: 'easeOut',
              }}
              className="
                mt-10
                w-32
                h-px
                bg-gradient-to-r
                from-transparent
                via-[#C9A46A]
                to-transparent
              "
            />

            {/* TAGLINE */}
            <motion.div
              className="
                flex
                items-center
                gap-3
                mt-8
                text-white/70
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.9,
                duration: 1,
              }}
            >

              {['SIP', 'CHILL', 'REPEAT'].map((word, idx) => (
                <motion.div
                  key={word}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 1 + idx * 0.2,
                    duration: 0.7,
                  }}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <span
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.45em]
                    "
                  >
                    {word}
                  </span>

                  {idx < 2 && (
                    <span className="text-[#C9A46A]/70">
                      ✦
                    </span>
                  )}

                </motion.div>
              ))}

            </motion.div>

            {/* PROGRESS BAR */}
            <motion.div
              className="
                relative
                mt-14
                w-52
                h-[2px]
                overflow-hidden
                bg-white/10
                rounded-full
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
                duration: 1,
              }}
            >

              {/* GLOW */}
              <div
                className="
                  absolute
                  inset-0
                "
                style={{
                  background:
                    "radial-gradient(circle, rgba(201,164,106,0.18), transparent 70%)",
                  filter: 'blur(8px)',
                }}
              />

              {/* FILL */}
              <motion.div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  rounded-full
                "
                style={{
                  background:
                    "linear-gradient(90deg, #8A5B22 0%, #E2C48D 50%, #C9A46A 100%)",
                }}
                initial={{
                  width: 0,
                }}
                animate={{
                  width: '100%',
                }}
                transition={{
                  duration: 3.5,
                  ease: 'easeInOut',
                }}
              />

            </motion.div>

            {/* LOADING TEXT */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.2,
                duration: 1,
              }}
              className="
                mt-6
                text-[10px]
                uppercase
                tracking-[0.45em]
                text-white/35
              "
            >
              Crafting luxury experiences
            </motion.p>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}