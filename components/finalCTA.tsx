'use client';

import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

export default function FinalCTA() {
  return (
    <section className="bg-white py-40 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE — TEXT */}
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37]/70 mb-6">
            Chaibaaz Experience
          </p>

          <h2
            className="text-black font-light leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              letterSpacing: "0.03em",
            }}
          >
            Let’s Elevate
            <br />
            <span className="text-[#D4AF37] italic">
              Your Event
            </span>
          </h2>

          <p className="text-black/60 mt-6 max-w-md leading-relaxed">
            Every gathering deserves a signature touch. Let us craft
            an experience your guests will remember long after the last sip.
          </p>

          {/* LINE */}
          <div className="mt-10 w-20 h-px bg-[#D4AF37]/40" />
        </div>

        {/* RIGHT SIDE — CTA */}
        <div className="flex justify-center md:justify-end">

          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="relative w-56 h-56 rounded-full flex items-center justify-center group"
              style={{
                border: "1px solid rgba(212,175,55,0.4)",
              }}
            >
              {/* INNER CIRCLE */}
              <div className="absolute inset-4 rounded-full border border-[#D4AF37]/30" />

              {/* TEXT */}
              <span className="text-black text-sm tracking-[0.2em] uppercase">
                Inquire
              </span>

              {/* HOVER GOLD FILL */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#D4AF37]"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.08 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </Magnetic>

        </div>
      </div>

      {/* FOOTER NOTE */}
      {/* <div className="text-center mt-24">
        <p className="text-xs tracking-[0.3em] uppercase text-black/30">
          Premium Chai Catering · India
        </p>
      </div> */}
    </section>
  );
}