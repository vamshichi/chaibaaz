'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 70, damping: 20 });

  const [hoverType, setHoverType] = useState<'default' | 'button' | 'view'>('default');
  const [click, setClick] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e: any) => {
      const el = e.target;

      if (el.closest('[data-cursor="view"]')) {
        setHoverType('view');
      } else if (el.closest('button, a')) {
        setHoverType('button');
      } else {
        setHoverType('default');
      }
    };

    const handleClick = () => {
      setClick(true);
      setTimeout(() => setClick(false), 300);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
      {/* TRAIL GLOW */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 120,
          height: 120,
          background:
            'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* OUTER RING */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'rgba(212,175,55,0.5)',
        }}
        animate={{
          width:
            hoverType === 'view'
              ? 100
              : hoverType === 'button'
              ? 70
              : 40,
          height:
            hoverType === 'view'
              ? 100
              : hoverType === 'button'
              ? 70
              : 40,
          scale: click ? 0.8 : 1,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* INNER DOT */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: '#D4AF37',
        }}
        animate={{
          width: hoverType === 'default' ? 8 : 4,
          height: hoverType === 'default' ? 8 : 4,
          scale: click ? 0.6 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* TEXT INSIDE CURSOR */}
      <AnimatePresence>
        {hoverType !== 'default' && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center text-[10px] uppercase tracking-widest text-black"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
              width: hoverType === 'view' ? 100 : 70,
              height: hoverType === 'view' ? 100 : 70,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            {hoverType === 'view' ? 'View' : 'Open'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CLICK RIPPLE */}
      <AnimatePresence>
        {click && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full border"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
              borderColor: 'rgba(212,175,55,0.5)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 120, height: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}