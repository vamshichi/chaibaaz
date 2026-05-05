'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-secondary text-card">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chai%20logo-gMmE5bBu1j9Y6S6xgsvaI50VFSrLuN.png"
              alt="Chaibaaz Logo"
              className="h-12 mb-4 object-contain opacity-90"
            />
            <p className="text-card/80 text-sm leading-relaxed">
              Premium chai catering for unforgettable events.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Gallery', 'Booking'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-card/70 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              {['Chai Cart', 'Event Catering', 'Custom Blends', 'Workshops'].map(
                (service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-card/70 hover:text-accent transition-colors text-sm"
                    >
                      {service}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-card/70 hover:text-accent transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +1 (234) 567-8900
              </a>
              <a
                href="mailto:info@chaibaaz.com"
                className="flex items-center gap-2 text-card/70 hover:text-accent transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@chaibaaz.com
              </a>
              <div className="flex items-center gap-2 text-card/70 text-sm">
                <MapPin className="w-4 h-4" />
                New York, NY 10001
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-card/20 my-8" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-card/60 text-sm">
            &copy; {currentYear} Chaibaaz.Inc. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-card/60 hover:text-accent transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-card/60 hover:text-accent transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
