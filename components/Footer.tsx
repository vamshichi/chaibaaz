'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/chaibaaz.ca?igsh=MWdmZm8wdmllYXdyYQ==', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Services', href: '/#services' },
    { label: 'Gallery', href: '/#gallery' },
  ];

  const services = [
    'Weddings',
    'Corporate Events',
    'Private Celebrations',
    'Cultural Gatherings',
    'Luxury Galas',
    'Concerts & Festivals',
    'Milestone Events',
    'Intimate Gatherings',
  ];

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#0B0705]
        text-white
      "
    >
      {/* ───────────────── BACKGROUND ───────────────── */}

      {/* GOLD LIGHT */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(201,164,106,0.10), transparent 40%)',
        }}
      />

      {/* SECOND LIGHT */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 80% 70%, rgba(184,139,74,0.08), transparent 45%)',
        }}
      />

      {/* SMOKE */}
      <motion.div
        animate={{
          x: [-30, 40, -30],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          top-[-20%]
          left-[-10%]
          w-[700px]
          h-[700px]
          rounded-full
        "
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* TEXTURE */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />

      {/* ───────────────── CONTENT ───────────────── */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-24 lg:pt-28 pb-12">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-[1.4fr_1.6fr_1fr] gap-16 xl:gap-24 pb-20 items-start">

          {/* ───────────────── BRAND ───────────────── */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            {/* LOGO */}
            <div className="relative mb-8">

              <Image
                src="/chai-logo-white.png"
                alt="Chaibaaz"
                width={220}
                height={80}
                className="object-contain"
              />

              {/* GOLD GLOW */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle, rgba(201,164,106,0.12), transparent 70%)',
                  filter: 'blur(25px)',
                }}
              />

            </div>

            {/* DESCRIPTION */}
            <p
              className="
                text-white/60
                leading-[1.9]
                max-w-md
                text-[15px]
              "
            >
              Chaibaaz crafts refined chai hospitality
              for weddings, celebrations, corporate
              events, and memorable gatherings.
            </p>

            {/* MINI DIVIDER */}
            <div className="flex items-center gap-3 mt-10">
              <div className="w-12 h-px bg-[#C9A46A]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A46A]" />
            </div>

          </motion.div>

         {/* ───────────────── LINKS ───────────────── */}

<div className="grid grid-cols-2 gap-16">

  {/* NAVIGATION */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
    viewport={{ once: true }}
  >

    <p
      className="
        text-[10px]
        uppercase
        tracking-[0.45em]
        text-[#C9A46A]
        mb-8
      "
    >
      Navigation
    </p>

    <ul className="space-y-5">

      {quickLinks.map((link) => (
        <li key={link.label}>

          <a
            href={link.href}
            className="
              text-white/60
              hover:text-white
              transition-colors
              duration-300
            "
          >

            <span
              className="text-[16px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {link.label}
            </span>

          </a>

        </li>
      ))}

    </ul>

  </motion.div>

  {/* OCCASIONS */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    viewport={{ once: true }}
  >

    <p
      className="
        text-[10px]
        uppercase
        tracking-[0.45em]
        text-[#C9A46A]
        mb-8
      "
    >
      Occasions
    </p>

    <ul className="space-y-4">

      {services.map((service) => (
        <li
          key={service}
          className="
            text-white/60
            hover:text-white
            transition-colors
            duration-300
          "
        >

          <span
            className="text-[16px] leading-[1.7]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {service}
          </span>

        </li>
      ))}

    </ul>

  </motion.div>

</div>

          {/* ───────────────── CONTACT ───────────────── */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.45em]
                text-[#C9A46A]
                mb-8
              "
            >
              Contact
            </p>

            <div className="space-y-7">

              {/* PHONE */}
              <a
                href="tel:+14167298787"
                className="
                  flex
                  items-start
                  gap-4
                  text-white/60
                  hover:text-white
                  transition-colors
                "
              >

                <Phone className="w-4 h-4 mt-1 text-[#C9A46A]" />

                <div>

                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35 mb-2">
                    Phone
                  </p>

                  <p
                    className="text-[16px]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    +1 (416) 729-8787
                  </p>

                </div>

              </a>

              {/* EMAIL */}
              <a
                href="mailto:info@chaibaaz.com"
                className="
                  flex
                  items-start
                  gap-4
                  text-white/60
                  hover:text-white
                  transition-colors
                "
              >

                <Mail className="w-4 h-4 mt-1 text-[#C9A46A]" />

                <div>

                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35 mb-2">
                    Email
                  </p>

                  <p
                    className="text-[16px]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    info@chaibaaz.com
                  </p>

                </div>

              </a>

              {/* LOCATION */}
              <div
                className="
                  flex
                  items-start
                  gap-4
                  text-white/60
                "
              >

                <MapPin className="w-4 h-4 mt-1 text-[#C9A46A]" />

                <div>

                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35 mb-2">
                    Location
                  </p>

                  <p
                    className="text-[16px]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    Toronto · Canada
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

        {/* ───────────────── DIVIDER ───────────────── */}

        <div className="relative py-10">

          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A46A]/30 to-transparent" />

        </div>

        {/* ───────────────── BOTTOM ───────────────── */}

        <motion.div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-8
          "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >

          {/* COPYRIGHT */}
          <p
            className="
              text-white/35
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-center
            "
          >
            © {currentYear} Chaibaaz · Crafted with elegance
          </p>

          {/* SOCIAL */}
          <div className="flex items-center gap-5">

            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{
                  scale: 1.08,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  relative
                  w-11
                  h-11
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                  text-white/60
                  hover:text-[#C9A46A]
                  hover:border-[#C9A46A]/40
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    opacity-0
                    hover:opacity-100
                    transition-opacity
                    duration-300
                  "
                  style={{
                    background:
                      'radial-gradient(circle, rgba(201,164,106,0.18), transparent 70%)',
                  }}
                />

                <social.icon className="w-4 h-4 relative z-10" />

              </motion.a>
            ))}

          </div>

          {/* LEGAL */}
          <div className="flex items-center gap-8">

            <a
              href="/privacy-policy"
              className="
                text-white/35
                hover:text-[#C9A46A]
                transition-colors
                text-[11px]
                uppercase
                tracking-[0.25em]
              "
            >
              Privacy Policy
            </a>

            <a
              href="/terms-of-service"
              className="
                text-white/35
                hover:text-[#C9A46A]
                transition-colors
                text-[11px]
                uppercase
                tracking-[0.25em]
              "
            >
              Terms of Service
            </a>

          </div>

        </motion.div>

      </div>

    </footer>
  );
}