"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Magnetic from "./Magnetic";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// ─────────────────────────────────────────────
// Easing presets (luxury feel)
// ─────────────────────────────────────────────
const EASE_LUXURY = [0.25, 0.1, 0.25, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Animated gold underline that expands from center on hover */
function NavLinkItem({ label, href }: NavLink) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className="relative group flex flex-col items-center gap-0.5 cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2, ease: EASE_LUXURY }}
    >
      <span
        className="
          text-[13px] font-light tracking-[0.2em] uppercase
          text-stone-200/80 group-hover:text-amber-100
          transition-colors duration-300
          select-none
        "
        style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontWeight: 300, letterSpacing: "0.22em" }}
      >
        {label}
      </span>

      {/* Gold underline — expands from center */}
      <motion.span
        className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        style={{ width: "100%", originX: 0.5 }}
      />

      {/* Subtle glow on hover */}
      {hovered && (
        <motion.span
          className="absolute inset-0 rounded-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "radial-gradient(ellipse at center, rgba(251,191,36,0.08) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      )}
    </motion.a>
  );
}

/** Hamburger → X icon */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-[18px] flex flex-col justify-between cursor-pointer">
      <motion.span
        className="block h-px bg-amber-200/90 origin-center"
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_LUXURY }}
      />
      <motion.span
        className="block h-px bg-amber-200/90 origin-center"
        animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: EASE_LUXURY }}
      />
      <motion.span
        className="block h-px bg-amber-200/90 origin-center"
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_LUXURY }}
      />
    </div>
  );
}

/** Full-screen mobile overlay */
function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: EASE_OUT_EXPO },
    },
    exit: {
      opacity: 0,
      y: -16,
      filter: "blur(4px)",
      transition: { duration: 0.3, ease: EASE_LUXURY },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_LUXURY }}
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(20,10,5,0.97) 0%, rgba(8,4,2,0.99) 100%)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Decorative grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
            }}
          />

          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          {/* Decorative radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(180,130,30,0.06) 0%, transparent 65%)",
            }}
          />

          {/* Nav links */}
          <motion.nav
            className="flex flex-col items-center gap-10 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                variants={itemVariants}
                onClick={onClose}
                className="group relative"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25 }}
              >
                <span
                  className="
                    block text-5xl sm:text-6xl font-light tracking-[0.12em] uppercase
                    text-stone-100/80 group-hover:text-amber-200
                    transition-colors duration-400
                  "
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Playfair Display', 'Georgia', serif",
                    fontWeight: 300,
                  }}
                >
                  {link.label}
                </span>
                {/* Hover underline */}
                <span
                  className="
                    block h-px mt-1
                    bg-gradient-to-r from-transparent via-amber-400/80 to-transparent
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-500 origin-center
                  "
                />
              </motion.a>
            ))}

            {/* Mobile CTA */}
            <motion.div variants={itemVariants} className="mt-6">
              <a
                href="/book"
                onClick={onClose}
                className="
                  inline-block px-10 py-3.5
                  rounded-full
                  text-sm tracking-[0.2em] uppercase font-medium
                  text-stone-900
                  transition-all duration-400
                  hover:shadow-[0_0_32px_rgba(212,175,55,0.45)]
                  hover:scale-105 active:scale-100
                "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  background: "linear-gradient(135deg, #D4AF37 0%, #F5D06E 45%, #C9922A 100%)",
                  letterSpacing: "0.18em",
                }}
              >
                Book Experience
              </a>
            </motion.div>
          </motion.nav>

          {/* Bottom tagline */}
          <motion.p
            className="absolute bottom-12 text-stone-500 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Crafted with intention
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Main Navbar
// ─────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrollY(y);
    setScrolled(y > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Very subtle vertical parallax on logo
  const logoParallax = prefersReduced ? 0 : Math.min(scrollY * 0.015, 6);

  return (
    <>
      {/* ── Navbar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
      >
        {/* Top accent line — always visible, fades slightly on scroll */}
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"
          animate={{ opacity: scrolled ? 0.4 : 0.8 }}
          transition={{ duration: 0.5 }}
        />

        {/* Main bar */}
        <motion.div
          className="relative px-6 sm:px-10 lg:px-16"
          animate={{
            backgroundColor: scrolled
              ? "rgba(6, 4, 2, 0.45)"
              : "rgba(0, 0, 0, 0)",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
            borderBottomColor: scrolled
              ? "rgba(180, 140, 30, 0.18)"
              : "rgba(0,0,0,0)",
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            boxShadow: scrolled
              ? "0 4px 40px rgba(0,0,0,0.35), 0 1px 0 rgba(212,175,55,0.08) inset"
              : "none",
          }}
          transition={{ duration: 0.55, ease: EASE_LUXURY }}
          style={{ WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)" }}
        >
          <div className="flex items-center justify-between h-[72px] lg:h-20">

            {/* ── Logo ── */}
            <motion.a
              href="/"
              className="relative flex-shrink-0 cursor-pointer"
              style={{ transform: `translateY(${logoParallax}px)` }}
              whileHover={{ filter: "drop-shadow(0 0 14px rgba(212,175,55,0.55))" }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.3 }}
              >
                <span
                  className="text-[28px] sm:text-[32px] tracking-[0.06em] select-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Playfair Display', 'Georgia', serif",
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg, #C9922A 0%, #F0CC6E 35%, #D4AF37 60%, #A87828 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.07em",
                    fontStyle: "italic",
                  }}
                >
                  Chaibaaz
                </span>
                <span
                  className="block text-[8px] tracking-[0.45em] uppercase text-amber-200/40 -mt-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.48em",
                    fontStyle: "normal",
                    fontWeight: 300,
                  }}
                >
                  Inc &nbsp;·&nbsp; Luxury Chai
                </span>
              </motion.div>
            </motion.a>

            {/* ── Desktop Nav ── */}
            <motion.nav
              className="hidden lg:flex items-center gap-10 xl:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {NAV_LINKS.map((link) => (
                <NavLinkItem key={link.label} {...link} />
              ))}
            </motion.nav>

            {/* ── Desktop CTA ── */}
            <Magnetic>
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.6 }}
            >
              <motion.a
                href="/book"
                className="
                  relative inline-flex items-center
                  px-7 py-2.5 rounded-full
                  text-[11px] tracking-[0.22em] uppercase font-semibold
                  text-stone-900
                  cursor-pointer
                  overflow-hidden
                  select-none
                "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  background: "linear-gradient(135deg, #D4AF37 0%, #F5D06E 50%, #C9922A 100%)",
                  letterSpacing: "0.2em",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 0 28px rgba(212,175,55,0.50), 0 4px 20px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE_LUXURY }}
              >
                {/* Shimmer effect */}
                <motion.span
                  className="absolute inset-0 opacity-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  whileHover={{
                    opacity: 1,
                    backgroundPositionX: ["200%", "-100%"],
                  }}
                  transition={{ duration: 0.7, ease: "linear" }}
                />
                Book Experience
              </motion.a>
            </motion.div>
            </Magnetic>

            {/* ── Mobile Hamburger ── */}
            <motion.button
              className="lg:hidden flex items-center justify-center w-10 h-10 focus:outline-none z-50"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.9 }}
            >
              <HamburgerIcon open={mobileOpen} />
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}