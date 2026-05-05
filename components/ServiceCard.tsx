'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  details: string;
  image: string;
  index: number;
}

export function ServiceCard({
  title,
  description,
  details,
  image,
  index,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = ['#D4AF37', '#C9A961', '#8D6E63', '#5D4037'];
  const accentColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.15, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-96 rounded-sm overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        animate={{
          opacity: isHovered ? 0.65 : 0.5,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Border Accent */}
      <motion.div
        className="absolute inset-0 border rounded-sm"
        style={{ borderColor: accentColor }}
        animate={{
          boxShadow: isHovered
            ? `0 0 30px ${accentColor}30, inset 0 0 30px ${accentColor}15`
            : 'none',
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
        <motion.div
          animate={{
            y: isHovered ? -24 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">{title}</h3>
          <p className="text-white/75 text-sm leading-relaxed font-light tracking-wide">{description}</p>
        </motion.div>

        {/* Details - appear on hover */}
        <motion.p
          className="text-white/80 text-xs absolute bottom-8 left-8 right-8 leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 24,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {details}
        </motion.p>
      </div>
    </motion.div>
  );
}
