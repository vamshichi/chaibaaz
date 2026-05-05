'use client';

import { motion } from 'framer-motion';

export default function TextReveal({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <div className="overflow-hidden">
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-2">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: i * 0.08,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}