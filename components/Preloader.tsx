'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 3600);

    return () => clearTimeout(timer);
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-background z-[9999] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ pointerEvents: isComplete ? 'none' : 'auto' }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chai%20logo-gMmE5bBu1j9Y6S6xgsvaI50VFSrLuN.png"
            alt="Chaibaaz Logo"
            className="h-32 object-contain"
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="flex gap-2 text-sm tracking-widest text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {['SIP', 'CHILL', 'REPEAT'].map((word, idx) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8 + idx * 0.2,
                duration: 0.7,
              }}
            >
              {word}
              {idx < 2 && <span className="mx-1">|</span>}
            </motion.span>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-40 h-1 bg-border rounded-full overflow-hidden mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
