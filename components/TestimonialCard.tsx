'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  rating: number;
  image: string;
}

export function TestimonialCard({
  quote,
  author,
  title,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="flex flex-col items-center text-center max-w-3xl mx-auto py-12"
    >
      {/* Stars */}
      <div className="flex gap-2 mb-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
          >
            <Star
              className={`w-5 h-5 ${
                i < rating ? 'fill-accent text-accent' : 'text-border'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.p 
        className="text-2xl md:text-3xl text-foreground mb-12 leading-relaxed italic font-light tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        &quot;{quote}&quot;
      </motion.p>

      {/* Avatar */}
      <motion.img
        src={image}
        alt={author}
        className="w-20 h-20 rounded-full object-cover mb-6 border border-accent"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      />

      {/* Author Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h4 className="text-lg font-light text-foreground tracking-wide">{author}</h4>
        <p className="text-secondary text-sm font-light tracking-wide">{title}</p>
      </motion.div>
    </motion.div>
  );
}
