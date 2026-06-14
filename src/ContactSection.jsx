import React from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';

// ============================================================================
// CARD DATA
// ============================================================================
const contactCards = [
  {
    id: "phone",
    label: "+91 988 444 0774",
    icon: (
      <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01c-.36-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
      </svg>
    ),
    action: () => { window.location.href = "tel:+919884440774"; },
  },
  {
    id: "email",
    label: "themixysticgstudios@gmail.com",
    icon: (
      <svg className="w-full h-full fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    action: () => { window.location.href = "mailto:themixysticgstudios@gmail.com"; },
  },
  {
    id: "instagram",
    label: "@themixysticgstudios",
    icon: (
      <svg className="w-full h-full fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    action: () => { window.open("https://www.instagram.com/themixysticgstudios/", "_blank", "noopener,noreferrer"); },
  },
];

// ============================================================================
// ANIMATION CONFIG
// ============================================================================
const easeCinematic = [0.22, 1, 0.36, 1];

const headlineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeCinematic } },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 0.18, y: 10, transition: { duration: 0.9, ease: easeCinematic, delay: 0.15 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeCinematic } },
};

// ============================================================================
// COMPONENT
// ============================================================================
export default function ContactSection() {
  return (
    <section
      id="lets-talk"
      className="contact-section relative min-h-screen w-full text-white flex flex-col justify-between items-center overflow-hidden select-none"
    >
      {/* Top Spacer */}
      <div className="h-16 max-md:h-8 md:max-lg:h-10 w-full" />

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <div className="w-full max-w-[780px] px-6 flex flex-col items-center justify-center flex-1">

        {/* ---------- HEADLINE ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="contact-headline-wrapper"
        >
          {/* "Get in Touch" — foreground layer at the top */}
          <motion.h1
            variants={headlineVariants}
            className="contact-headline"
          >
            Get in Touch
          </motion.h1>

          {/* "With Us" — depth layer */}
          <motion.h2
            variants={subtitleVariants}
            className="contact-subtitle"
            aria-hidden="true"
          >
            With Us
          </motion.h2>
        </motion.div>

        {/* ---------- CONTACT CARDS ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="contact-cards-container"
        >
          {contactCards.map((card) => (
            <ContactCard key={card.id} variants={cardVariants} card={card} />
          ))}
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* BOTTOM BRANDING BAR */}
      {/* ============================================ */}
      <div className="contact-bottom-bar">
        <span className="contact-bottom-text">
          LET'S TALK!
        </span>
        <span className="contact-bottom-text">
          #yoursoundperfected
        </span>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT CARD SUB-COMPONENT
// ============================================================================
function ContactCard({ variants, card }) {
  return (
    <motion.button
      variants={variants}
      onClick={card.action}
      whileHover={{
        y: -4,
        scale: 1.02,
        borderColor: "rgba(255,168,108,0.55)",
        boxShadow:
          "0 0 0 1px rgba(255,140,90,0.3), 0 0 40px rgba(255,90,30,0.2), 0 8px 32px rgba(0,0,0,0.4)",
        transition: { duration: 0.3, ease: [0, 0, 0.58, 1] },
      }}
      whileTap={{
        scale: 0.98,
        y: -1,
      }}
      className="contact-card"
    >
      {/* Moving highlight sweep */}
      <div className="contact-card-sweep">
        <div className="contact-card-sweep-track" />
      </div>

      {/* Hover glow overlay */}
      <div className="contact-card-glow" />

      {/* Icon */}
      <div className="contact-card-icon">
        {card.icon}
      </div>

      {/* Label */}
      <span className="contact-card-label">
        {card.label}
      </span>
    </motion.button>
  );
}
