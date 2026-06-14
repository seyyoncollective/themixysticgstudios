import React from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// 1. CENTRALIZED DESIGN SYSTEM CONFIGURATION (EDIT VISUALS HERE)
// ============================================================================
export const trustedByConfig = {
  sectionTitle: "Trusted by",
  sectionTagline: "Every logo here has a story we helped tell.",
  
  backgroundColor: "#050505",
  sectionPadding: "clamp(5rem, 10vw, 12rem) 1.5rem",
  containerMaxWidth: "1400px",
  contentToLogosGap: "clamp(4rem, 7vw, 6rem)", // Fluid spacing based on viewport
  
  // Typography Engine
  titleFontSize: "clamp(2.5rem, 5vw, 4.25rem)",
  titleFontWeight: "300", 
  titleLetterSpacing: "-0.03em",
  titleColor: "#FFFFFF",
  
  taglineFontSize: "clamp(1rem, 1.5vw, 1.25rem)",
  taglineFontWeight: "400",
  taglineColor: "#8E8E93", 
  taglineMaxWidth: "480px",
  taglineLineHeight: "1.6",
  
  // Layout Matrix Definitions
  logoWidth: "160px",
  logoHeight: "64px",
  logoGapDesktop: "4.5rem",
  logoGapTablet: "3rem",
  logoGapMobile: "2rem",
  
  // Motion Choreography Timings
  animationDuration: 1.2,
  staggerDelay: 0.08, // Dynamic entry interval between logos
  easing: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo curve
};

// ============================================================================
// 2. CENTRALIZED DATA STRUCTURE (ADD / EDIT YOUR OWN CLIENTS HERE)
// ============================================================================
// Swap out the values below with your local public pathing or absolute CDN URLs.
export const clients = [
  {
    name: "U1 Records",
    logo: "/assets/logos/u1-records.png", 
  },
  {
    name: "Think Music",
    logo: "/assets/logos/think-music.png",
  },
  {
    name: "T Series",
    logo: "/assets/logos/t-series.png",
  },
  {
    name: "Sony Music South",
    logo: "/assets/logos/sony-music-south.png",
  },
  {
    name: "Saregama Tamil",
    logo: "/assets/logos/saregama-tamil.png",
  },
  {
    name: "Divo",
    logo: "/assets/logos/divo.png",
  },
];

// ============================================================================
// 3. PRODUCTION COMPONENT PIPELINE
// ============================================================================
export default function TrustedBySection() {
  const cfg = trustedByConfig;

  // Global viewport transition container orchestration
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: cfg.staggerDelay,
      },
    },
  };

  // Content block reveal (Title / Subtitle)
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: cfg.animationDuration,
        ease: cfg.easing,
      },
    },
  };

  // Card node entrance reveal
  const logoVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: cfg.animationDuration,
        ease: cfg.easing,
      },
    },
  };

  return (
    <section
      id="trust"
      role="region"
      aria-label="Clients and Collaborations"
      style={{
        backgroundColor: cfg.backgroundColor,
        padding: cfg.sectionPadding,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          maxWidth: cfg.containerMaxWidth,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Editorial Text Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1.25rem",
            marginBottom: cfg.contentToLogosGap,
          }}
        >
          <motion.h2
            variants={contentVariants}
            style={{
              fontSize: cfg.titleFontSize,
              fontWeight: cfg.titleFontWeight,
              letterSpacing: cfg.titleLetterSpacing,
              color: cfg.titleColor,
              margin: 0,
              fontFamily: "var(--font-serif, serif)",
            }}
          >
            {cfg.sectionTitle}
          </motion.h2>

          <motion.p
            variants={contentVariants}
            style={{
              fontSize: cfg.taglineFontSize,
              fontWeight: cfg.taglineFontWeight,
              color: cfg.taglineColor,
              maxWidth: cfg.taglineMaxWidth,
              lineHeight: cfg.taglineLineHeight,
              margin: 0,
            }}
          >
            {cfg.sectionTagline}
          </motion.p>
        </div>

        <div
          className="trusted-logos-grid-engine"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            {clients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                variants={logoVariants}
                style={{
                  width: cfg.logoWidth,
                  height: cfg.logoHeight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} partner logo`}
                  title={client.name}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                    filter: "brightness(1.15) contrast(1.05)",
                  }}
                />
              </motion.div>
            ))}
          </div>
      </motion.div>

      {/* Embedded High-Performance Responsive Context Queries */}
      <style>{`
        .trusted-logos-grid-engine {
          gap: ${cfg.logoGapDesktop};
          flex-direction: row;
        }

        @media (max-width: 1280px) {
          .trusted-logos-grid-engine {
            gap: 3.5rem;
          }
        }

        @media (max-width: 1024px) {
          .trusted-logos-grid-engine {
            gap: ${cfg.logoGapTablet};
            max-width: 90%;
          }
        }

        @media (max-width: 834px) {
          .trusted-logos-grid-engine {
            gap: 2.5rem;
          }
          
          .trusted-logos-grid-engine > div {
            width: 140px !important;
            height: 56px !important;
          }
        }

        @media (max-width: 640px) {
          .trusted-logos-grid-engine {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: ${cfg.logoGapMobile};
            width: 100%;
            padding: 0 0.5rem;
          }
          
          .trusted-logos-grid-engine > div {
            width: 100% !important;
            height: 72px !important;
          }
        }

        @media (max-width: 375px) {
          .trusted-logos-grid-engine > div {
            height: 60px !important;
          }
        }

        @media (max-width: 320px) {
          .trusted-logos-grid-engine {
            gap: 1.25rem;
          }
          
          .trusted-logos-grid-engine > div {
            height: 50px !important;
          }
        }
      `}</style>
    </section>
  );
}
