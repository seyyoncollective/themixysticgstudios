import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// CENTRALIZED BODY CONFIGURATION SYSTEM
// Edit these values to immediately alter the layout, typography, and motion profile.
// ============================================================================
export const bodyConfig = {
  content: "The Mixystic G Studios was founded in 2019 by Kumaraguruparan M, an audio engineer who has been at the centre of Tamil cinema's sonic identity since 1996. Equipped with professional-grade tools and a philosophy built on precision, the studio delivers mixes and masters that meet international standards. Every project is treated as though it is the most important one on the desk \u2014 because to us, it is.",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: "1.25rem",
  fontWeight: "400",
  lineHeight: "1.7",
  letterSpacing: "0.08em",
  textColor: "rgba(255, 255, 255, 0.75)",
  textAlign: "center",
  maxWidth: "min(800px, 90vw)",
  contentSpacing: "0rem",
  contentPadding: "0 clamp(1rem, 4vw, 1.5rem)",
  paragraphGap: "clamp(2.5rem, 5vw, 5.5rem)",

  // Responsive Typography Breakpoints
  mobileFontSize: "clamp(0.9rem, 3.5vw, 1.05rem)",
  tabletFontSize: "clamp(1rem, 2.2vw, 1.15rem)",
  desktopFontSize: "clamp(1.1rem, 1.4vw, 1.25rem)",
  breakpointMobile: 480,
  breakpointTablet: 768,

  // Motion Configuration (Premium, Cinematic Luxury Feel)
  animationDuration: 1.4,       // Smooth, slow cinematic reveal
  animationDelay: 0.8,          // Adjust base delay as needed
  translateYDistance: "60px",   // Initial vertical drop offset
  opacityStart: 0,              // Starts fully invisible
  opacityEnd: 1,                // Resolves to fully opaque
  easing: [0.16, 1, 0.3, 1]     // Custom ultra-smooth luxury deceleration curve (Zero Bounce)
};

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================
const PremiumBodyContent = () => {
  const [currentWidth, setCurrentWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Responsive device tracking listeners
  useEffect(() => {
    const handleResize = () => setCurrentWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Programmatically compute responsive typography sizing scales
  const resolveBodyFontSize = () => {
    if (currentWidth <= bodyConfig.breakpointMobile) return bodyConfig.mobileFontSize;
    if (currentWidth <= bodyConfig.breakpointTablet) return bodyConfig.tabletFontSize;
    return bodyConfig.desktopFontSize;
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent', // Guarantees isolation overlay capabilities
        padding: bodyConfig.contentPadding,
        marginTop: bodyConfig.contentSpacing,
        boxSizing: 'border-box'
      }}
    >
      <motion.div
        initial={{
          opacity: bodyConfig.opacityStart,
          y: bodyConfig.translateYDistance
        }}
        animate={{
          opacity: bodyConfig.opacityEnd,
          y: 0
        }}
        transition={{
          duration: bodyConfig.animationDuration,
          ease: bodyConfig.easing,
          delay: bodyConfig.animationDelay
        }}
        style={{
          width: '100%',
          maxWidth: bodyConfig.maxWidth,
          textAlign: bodyConfig.textAlign,
          boxSizing: 'border-box'
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: bodyConfig.fontFamily,
            fontSize: resolveBodyFontSize(),
            fontWeight: bodyConfig.fontWeight,
            lineHeight: bodyConfig.lineHeight,
            letterSpacing: bodyConfig.letterSpacing,
            color: bodyConfig.textColor,
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased'
          }}
        >
          {bodyConfig.content}
        </p>
      </motion.div>
    </div>
  );
};

export default PremiumBodyContent;
