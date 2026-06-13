import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PremiumBodyContent from './PremiumBodyContent';

// ============================================================================
// DESIGNER CONFIGURATION SYSTEM
// Adjust these values to fine-tune the typography, timing, and motion dynamics.
// ============================================================================
const CONFIG = {
  // Content & Typography
  text: "Craft that Shapes Sound",
  fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
  fontWeight: "800",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  textColor: "#FFFFFF",

  // Motion Timing & Delays
  animationSpeed: 0.4,
  staggerDelay: 0.07,
  duration: 3000,

  // Visual Effects
  blurAmount: "8px",

  // Motion Curves & Transforms
  easing: [0.25, 1, 0.5, 1],
  scaleValues: [1, 1.05, 1],
  rotationValues: [0, -2, 0],

  // Playback Control
  loopSettings: {
    autoplay: true
  }
};

// ============================================================================
// CHARACTER SUB-COMPONENT
// ============================================================================
const RollingCharacter = ({ char, globalIndex, trigger }) => {
  const mainControls = useAnimation();
  const duplicateControls = useAnimation();

  useEffect(() => {
    if (trigger > 0) {
      const delay = globalIndex * CONFIG.staggerDelay;

      mainControls.start({
        y: ["0%", "100%"],
        filter: ["blur(0px)", `blur(${CONFIG.blurAmount})`, "blur(0px)"],
        scale: CONFIG.scaleValues,
        rotate: CONFIG.rotationValues,
        transition: {
          duration: CONFIG.animationSpeed,
          ease: CONFIG.easing,
          delay: delay,
        }
      }).then(() => {
        mainControls.set({ y: "0%" });
      });

      duplicateControls.start({
        y: ["-100%", "0%"],
        filter: ["blur(0px)", `blur(${CONFIG.blurAmount})`, "blur(0px)"],
        scale: CONFIG.scaleValues,
        rotate: CONFIG.rotationValues,
        transition: {
          duration: CONFIG.animationSpeed,
          ease: CONFIG.easing,
          delay: delay,
        }
      }).then(() => {
        duplicateControls.set({ y: "-100%" });
      });
    }
  }, [trigger, globalIndex, mainControls, duplicateControls]);

  return (
    <span style={{
      position: 'relative',
      display: 'inline-block',
      overflow: 'hidden',
      verticalAlign: 'bottom'
    }}>
      <motion.span
        initial={{ y: "-100%" }}
        animate={duplicateControls}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          display: 'inline-block',
          transformOrigin: 'center',
          willChange: 'transform, filter'
        }}
      >
        {char}
      </motion.span>

      <motion.span
        initial={{ y: "0%" }}
        animate={mainControls}
        style={{
          display: 'inline-block',
          transformOrigin: 'center',
          willChange: 'transform, filter'
        }}
      >
        {char}
      </motion.span>
    </span>
  );
};

// ============================================================================
// ROLLING TEXT COMPONENT
// ============================================================================
const RollingTextComponent = () => {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (!CONFIG.loopSettings.autoplay) return;
    const interval = setInterval(() => {
      setTrigger((prev) => prev + 1);
    }, CONFIG.duration);
    return () => clearInterval(interval);
  }, []);

  const words = CONFIG.text.split(" ");
  let charCounter = 0;

  const wordsWithGlobalIndices = words.map((word) => {
    return word.split("").map((char) => {
      const globalIndex = charCounter;
      charCounter++;
      return { char, globalIndex };
    });
  });

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: '0.3em',
      rowGap: '0.1em',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: CONFIG.fontFamily,
      fontSize: CONFIG.fontSize,
      fontWeight: CONFIG.fontWeight,
      color: CONFIG.textColor,
      background: 'transparent',
      width: '100%',
      userSelect: 'none',
      padding: 'clamp(1rem, 3vw, 2rem)'
    }}>
      {wordsWithGlobalIndices.map((wordChars, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
          {wordChars.map(({ char, globalIndex }) => (
            <RollingCharacter
              key={globalIndex}
              char={char}
              globalIndex={globalIndex}
              trigger={trigger}
            />
          ))}
        </span>
      ))}
    </div>
  );
};

// ============================================================================
// EXPORTED SECTION — Combines rolling headline + body content
// ============================================================================
const PremiumCreativeStudioSection = () => {
  return (
    <section
      id="about"
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem) clamp(3rem, 7vw, 6rem)',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}
    >
      <RollingTextComponent />
      <PremiumBodyContent />
    </section>
  );
};

export default PremiumCreativeStudioSection;
