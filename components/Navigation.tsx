"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Magnetic from "./Magnetic";

// ─────────────────────────────────────────────
// LANDING PAGE NAV LINKS
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#booking" },
];

// ─────────────────────────────────────────────
// EASING
// ─────────────────────────────────────────────
const EASE_LUXURY = [0.25, 0.1, 0.25, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────
// SMOOTH SCROLL
// ─────────────────────────────────────────────
const scrollToSection = (href: string) => {
  const element = document.querySelector(href);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// ─────────────────────────────────────────────
// NAV LINK ITEM
// ─────────────────────────────────────────────
function NavLinkItem({
  label,
  href,
  scrolled,
}: {
  label: string;
  href: string;
  scrolled: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={() => scrollToSection(href)}
      className="relative group flex flex-col items-center gap-0.5 cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2, ease: EASE_LUXURY }}
    >
      <span
        className={`
          text-[13px]
          font-light
          tracking-[0.2em]
          uppercase
          transition-colors
          duration-300
          select-none
          ${
            scrolled
              ? "text-[#3B2416]/80"
              : "text-white/90"
          }
          group-hover:text-[#C9A46A]
        `}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
        }}
      >
        {label}
      </span>

      {/* UNDERLINE */}
      <motion.span
        className="h-px bg-gradient-to-r from-transparent via-[#C9A46A] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        style={{
          width: "100%",
          originX: 0.5,
        }}
      />

      {/* GLOW */}
      {hovered && (
        <motion.span
          className="absolute inset-0 rounded-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,164,106,0.08) 0%, transparent 70%)",
            filter: "blur(4px)",
          }}
        />
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────
// HAMBURGER
// ─────────────────────────────────────────────
function HamburgerIcon({
  open,
  scrolled,
}: {
  open: boolean;
  scrolled: boolean;
}) {
  return (
    <div className="relative w-6 h-[18px] flex flex-col justify-between cursor-pointer">

      <motion.span
        className={`
          block
          h-px
          ${scrolled ? "bg-[#3B2416]" : "bg-white"}
        `}
        animate={
          open
            ? { rotate: 45, y: 9 }
            : { rotate: 0, y: 0 }
        }
      />

      <motion.span
        className={`
          block
          h-px
          ${scrolled ? "bg-[#3B2416]" : "bg-white"}
        `}
        animate={
          open
            ? { opacity: 0 }
            : { opacity: 1 }
        }
      />

      <motion.span
        className={`
          block
          h-px
          ${scrolled ? "bg-[#3B2416]" : "bg-white"}
        `}
        animate={
          open
            ? { rotate: -45, y: -9 }
            : { rotate: 0, y: 0 }
        }
      />

    </div>
  );
}

// ─────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────
function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background:
              "linear-gradient(135deg, #F6F0E7 0%, #EFE6D8 100%)",
            backdropFilter: "blur(20px)",
          }}
        >

          <div className="flex flex-col items-center gap-10">

            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => {
                  scrollToSection(link.href);
                  onClose();
                }}
                className="
                  text-4xl
                  uppercase
                  tracking-[0.15em]
                  text-[#2A160D]
                  hover:text-[#C9A46A]
                  transition-colors
                "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
              </motion.button>
            ))}

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// MAIN NAVBAR
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
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const logoParallax = prefersReduced
    ? 0
    : Math.min(scrollY * 0.015, 6);

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: EASE_OUT_EXPO,
        }}
      >

        {/* GOLD LINE */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A46A]/60 to-transparent" />

        {/* MAIN BAR */}
        <motion.div
          className="relative px-6 sm:px-10 lg:px-16"
          animate={{
            backgroundColor: scrolled
              ? "rgba(246,240,231,0.78)"
              : "rgba(246,240,231,0)",

            backdropFilter: scrolled
              ? "blur(24px)"
              : "blur(0px)",

            borderBottomColor: scrolled
              ? "rgba(201,164,106,0.15)"
              : "rgba(0,0,0,0)",

            borderBottomWidth: "1px",

            boxShadow: scrolled
              ? "0 4px 30px rgba(0,0,0,0.04)"
              : "none",
          }}
          transition={{
            duration: 0.5,
            ease: EASE_LUXURY,
          }}
        >

          <div className="flex items-center justify-between h-[78px]">

            {/* LOGO */}
            <motion.button
              onClick={() => scrollToSection("#home")}
              className="relative flex-shrink-0"
              style={{
                transform: `translateY(${logoParallax}px)`,
              }}
              whileHover={{
                scale: 1.02,
                filter:
                  "drop-shadow(0 0 20px rgba(201,164,106,0.3))",
              }}
            >

              <div className="relative">

                <Image
                  src={
                    scrolled
                      ? "/chai-logo.png"
                      : "/chai-logo-white.png"
                  }
                  alt="Chaibaaz"
                  width={240}
                  height={90}
                  priority
                  className="
                    w-[150px]
                    sm:w-[180px]
                    lg:w-[220px]
                    h-12
                    object-contain
                  "
                />

                {/* GOLD GLOW */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,164,106,0.10), transparent 70%)",
                    filter: "blur(18px)",
                  }}
                />

              </div>

            </motion.button>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-10">

              {NAV_LINKS.map((link) => (
                <NavLinkItem
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  scrolled={scrolled}
                />
              ))}

            </nav>

            {/* CTA */}
            <Magnetic>
              <a href="/#booking">
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="
                  hidden
                  lg:flex
                  items-center
                  px-7 py-3
                  rounded-full
                  text-[11px]
                  tracking-[0.2em]
                  uppercase
                  overflow-hidden
                "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",

                  color: scrolled
                    ? "#ffffff"
                    : "#ffffff",

                  background: scrolled
                    ? "linear-gradient(135deg, #2A160D 0%, #5B4636 100%)"
                    : "rgba(255,255,255,0.12)",

                  border: scrolled
                    ? "none"
                    : "1px solid rgba(255,255,255,0.25)",

                  backdropFilter: "blur(20px)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 0 30px rgba(201,164,106,0.25)",
                }}
              >
                Book Experience
              </motion.button>
              </a>
            </Magnetic>

            {/* MOBILE BUTTON */}
            <motion.button
              className="
                lg:hidden
                flex
                items-center
                justify-center
                w-10
                h-10
              "
              onClick={() =>
                setMobileOpen((prev) => !prev)
              }
              whileTap={{ scale: 0.9 }}
            >
              <HamburgerIcon
                open={mobileOpen}
                scrolled={scrolled}
              />
            </motion.button>

          </div>

        </motion.div>

      </motion.header>

      {/* MOBILE MENU */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}