import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';

/**
 * ═══════════════════════════════════════
 * CENTRALIZED CONFIGURATION SYSTEM
 * ═══════════════════════════════════════
 * Engineered for total creative control. No hardcoded variables below.
 */
const portfolioConfig = {
  sectionTitle: "LISTEN",            
  baseVelocity: 2.8,            // Fast cinematic speed (pixels per frame)
  perspective: "2000px",       // Deep cinematic focal lens depth
  hoverScale: 1.12,            // Premium luxury scale on hover
  hoverTranslateZ: 100,        // Pop forward in 3D space
  maxRotation: 28,             // Maximum Y rotation at screen edges
  thumbnailWidth: 440,         // Optimized for 16:9 Landscape dimensions
  thumbnailHeight: 248,        // Strict 16:9 ratio
  borderRadius: "16px",
  titleAnimationDuration: 0.2,
  hoverTransitionDuration: 0.25,
  gap: 32,                     // Space between cards on the horizontal track
  depthIntensity: 0.15,        // Parabolic curvature modifier (bends back on edges)
  easing: [0.16, 1, 0.3, 1],   // Custom ultra-smooth ease-out cubic curve
};

const portfolioItems = [
  { id: 1, title: "Rowdy Baby", thumbnail: "/portfolio/WhatsApp Image 2026-06-09 at 11.13.23 PM.jpeg", youtubeUrl: "https://youtu.be/x6Q7c9RyMzk?si=ZzaC4mYwwyk0Z-G-" },
  { id: 2, title: "Ek Do Teen", thumbnail: "/portfolio/Ek Do Teen.jpg.jpeg", youtubeUrl: "https://youtu.be/jfFimOpMS0E?si=T9XJ5JyYkLzDZTvV" },
  { id: 3, title: "High on Love", thumbnail: "/portfolio/High on Love.jpg.jpeg", youtubeUrl: "https://youtu.be/jp0n4TPfA5A?si=nQiiVL2XP_UT3iG3" },
  { id: 4, title: "I'll be There for You", thumbnail: "/portfolio/I'll be There for you.jpg.jpeg", youtubeUrl: "https://youtu.be/aXVZL8SfH24?si=zILMmcssqNHG1miz" },
  { id: 5, title: "Idhu Varai", thumbnail: "/portfolio/Idhu Varai.jpg.jpeg", youtubeUrl: "https://youtu.be/_-pdljs3KJA?si=SLk-BT7Fc-7IsHM1" },
  { id: 6, title: "IOIO", thumbnail: "/portfolio/IOIO.jpg.jpeg", youtubeUrl: "https://youtu.be/gYcY1yx9a54?si=Q5pfnfJH2FmBU8aY" },
  { id: 7, title: "Maareesa", thumbnail: "/portfolio/Maareesa.jpg.jpeg", youtubeUrl: "https://youtu.be/-mibr8igqGI?si=6kX-xT6d-gzRSnuz" },
  { id: 8, title: "Maayam Neeyadi", thumbnail: "/portfolio/Maayam Neeyadi.jpg.jpeg", youtubeUrl: "https://youtu.be/96EXf-6bmYY?si=5Z5rn5jKCtntCco3" },
  { id: 9, title: "Machi Open the Bottle", thumbnail: "/portfolio/Machi Open the Bottle.jpg.jpeg", youtubeUrl: "https://youtu.be/68ixlbMQaY0?si=otoFgdG0ie7unMDq" },
  { id: 10, title: "Nanbane", thumbnail: "/portfolio/Nanbane.jpg.jpeg", youtubeUrl: "https://youtu.be/vlzqE-JbLcw?si=Q-r9Kiuz3t320oT0" },
  { id: 11, title: "Per Vechaalum Veikaama", thumbnail: "/portfolio/Per Vechaalum Veikaama.jpg.jpeg", youtubeUrl: "https://youtu.be/-BUDo3mow00?si=qtsLNIjG2Is5waGy" },
  { id: 12, title: "Thattiputta", thumbnail: "/portfolio/Thattiputta.jpg.jpeg", youtubeUrl: "https://youtu.be/d_NnRgJJfqA?si=P8NCDiGK29YcTaR2" },
  { id: 13, title: "Thuli Thuli", thumbnail: "/portfolio/Thuli Thuli.jpg.jpeg", youtubeUrl: "https://youtu.be/_-pdljs3KJA?si=SLk-BT7Fc-7IsHM1" },
  { id: 14, title: "Vaada Bin Laada", thumbnail: "/portfolio/Vaada Bin Laada.jpg.jpeg", youtubeUrl: "https://youtu.be/TAv0fApr1js?si=do7WKqU2cTDZ7gBQ" },
  { id: 15, title: "Yezhezhu Malai", thumbnail: "/portfolio/Yezhezhu Malai.jpg.jpeg", youtubeUrl: "https://youtu.be/Xu4SReip1LY?si=4BWxaI8W9IErQZpL" },
];

/**
 * ═══════════════════════════════════════
 * PORTFOLIO CARD COMPONENT
 * ═══════════════════════════════════════
 */
const PortfolioCard = ({ item, globalX, isHovered, itemIndex, cardWidth, cardHeight, cardMaxRotation, cardHoverScale, cardHoverZ }) => {
  const cardRef = useRef(null);

  // Track continuous spatial positioning calculations
  const [zTransform, setZTransform] = useState(0);
  const [rotateYTransform, setRotateYTransform] = useState(0);

  // Mathematical Projection Engine
  useEffect(() => {
    const updateCalculations = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const screenCenter = window.innerWidth / 2;
      const cardCenter = rect.left + rect.width / 2;

      // Normalized distance from center (-1 to 1)
      const distanceFromCenter = (cardCenter - screenCenter) / screenCenter;

      // Parabolic curve function: deeper recession at edges
      const zOffset = -Math.pow(distanceFromCenter, 2) * (window.innerWidth * portfolioConfig.depthIntensity);
      // Subtle rotation wrapping into the screen center
      const yRot = distanceFromCenter * -cardMaxRotation;

      setZTransform(zOffset);
      setRotateYTransform(yRot);
    };

    const unsubscribe = globalX.on("change", updateCalculations);
    window.addEventListener('resize', updateCalculations);
    return () => {
      unsubscribe();
      window.removeEventListener('resize', updateCalculations);
    };
  }, [globalX]);

  const displayZ = isHovered ? cardHoverZ : zTransform;
  const displayRotateY = rotateYTransform;

  const handleLaunch = (e) => {
    e.stopPropagation();
    window.open(item.youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={handleLaunch}
      className="relative cursor-pointer select-none"
      data-card-index={itemIndex}
      style={{
        width: cardWidth,
        height: cardHeight,
        transformStyle: "preserve-3d",
        z: displayZ,
        rotateY: displayRotateY,
      }}
      animate={{
        scale: isHovered ? cardHoverScale : 1,
      }}
      transition={{ duration: portfolioConfig.hoverTransitionDuration, ease: portfolioConfig.easing }}
    >
      <div
        className="w-full h-full overflow-hidden bg-zinc-900 shadow-2xl transition-shadow duration-500 group"
        style={{
          borderRadius: portfolioConfig.borderRadius,
          boxShadow: isHovered
            ? "0 0 30px rgba(212,175,55,0.3), 0 40px 80px -15px rgba(0,0,0,0.9)"
            : "0 15px 30px -10px rgba(0,0,0,0.5)",
          border: isHovered ? "1px solid rgba(212,175,55,0.4)" : "1px solid transparent",
        }}
      >
        {/* Play Button Indicator on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <polygon points="7,5 19,12 7,19" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Aspect Ratio Balanced Media Element */}
        <motion.img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover pointer-events-none"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3, ease: portfolioConfig.easing }}
        />

        {/* Master Studio Ambient Mask Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Title Reveal Rule: Exact Single Activation */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: portfolioConfig.titleAnimationDuration, ease: "easeOut" }}
              className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none"
            >
              <h4 className="text-white text-lg font-medium tracking-wide antialiased">
                {item.title}
              </h4>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/**
 * ═══════════════════════════════════════
 * INDEPENDENT CAROUSEL TRACK
 * ═══════════════════════════════════════
 */
const CarouselTrack = ({ items, velocity, cardWidth, cardHeight, gap, maxRotation, hoverScale, hoverTranslateZ }) => {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Hover detection via elementFromPoint — works reliably with 3D transforms
  const handleMouseMove = (e) => {
    // Use browser's native hit-testing to find exactly which card is under cursor
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el) {
      const cardEl = el.closest('[data-card-index]');
      if (cardEl) {
        const instanceIndex = parseInt(cardEl.getAttribute('data-card-index'), 10);
        setHoveredCardId(instanceIndex);
        setIsPaused(true);
        return;
      }
    }
    // Cursor is not over any card
    setHoveredCardId(null);
  };

  // Handle when cursor leaves the track entirely
  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setIsPaused(false);
  };

  // Triple-buffering elements to ensure mathematically bulletproof infinite looping layout
  const tripleBufferItems = [...items, ...items, ...items];
  const singleLoopWidth = items.length * (cardWidth + gap);

  useAnimationFrame((_, delta) => {
    if (isPaused) return;

    // Standardize delta steps across modern high-refresh displays (120Hz/144Hz vs 60Hz)
    const frameFactor = delta / 16.666;
    let nextX = x.get() - (velocity * frameFactor);

    // Dynamic reset point for absolute continuous loop
    if (velocity > 0 && nextX <= -singleLoopWidth) {
      nextX += singleLoopWidth;
    } else if (velocity < 0 && nextX >= 0) {
      nextX -= singleLoopWidth;
    }

    x.set(nextX);
  });

  return (
    <div
      className="w-full flex items-center overflow-visible py-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspectiveOrigin: "center" }}
    >
      <motion.div
        ref={trackRef}
        className="flex will-change-transform"
        style={{
          x,
          gap: gap,
          transformStyle: "preserve-3d"
        }}
      >
        {tripleBufferItems.map((item, index) => {
          // Determine if this specific card instance is hovered (using unique index)
          const isCardHovered = hoveredCardId === index;
          return (
            <PortfolioCard
              key={`${item.id}-loop-${index}`}
              item={item}
              globalX={x}
              isHovered={isCardHovered}
              itemIndex={index}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              cardMaxRotation={maxRotation}
              cardHoverScale={hoverScale}
              cardHoverZ={hoverTranslateZ}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

/**
 * ═══════════════════════════════════════
 * MAIN PORTFOLIO COMPONENT SECTION
 * ═══════════════════════════════════════
 */
export default function PortfolioSection() {
  const [cardScale, setCardScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      let s = 1;
      if (w < 320) s = 0.3;
      else if (w < 375) s = 0.35;
      else if (w < 480) s = 0.4;
      else if (w < 768) s = 0.55;
      else if (w < 834) s = 0.65;
      else if (w < 1024) s = 0.75;
      else if (w < 1280) s = 0.85;
      setCardScale(s);
    };
    updateScale();
    window.addEventListener('resize', updateScale, { passive: true });
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const cw = Math.round(portfolioConfig.thumbnailWidth * cardScale);
  const ch = Math.round(portfolioConfig.thumbnailHeight * cardScale);
  const gap = Math.round(portfolioConfig.gap * Math.max(cardScale, 0.5));
  const maxRot = Math.round(portfolioConfig.maxRotation * Math.max(cardScale, 0.4));
  const hScale = 1 + (portfolioConfig.hoverScale - 1) * Math.max(cardScale, 0.6);
  const hZ = Math.round(portfolioConfig.hoverTranslateZ * cardScale);

  return (
    <section id="listen" className="w-full min-h-screen py-24 max-md:py-10 md:max-lg:py-14 overflow-hidden flex flex-col justify-center select-none">
      {/* Editorial Luxury Header System */}
      <div className="w-full px-8 mb-64 max-md:mb-16 md:max-lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 items-center text-center"
        >
          <h2 className="text-5xl md:text-7xl text-zinc-100 font-bold font-['Helvetica,_Arial,_sans-serif'] tracking-tight">
            {portfolioConfig.sectionTitle}<span className="text-zinc-700">.</span>
          </h2>
        </motion.div>
      </div>

      {/* 3D Render Canvas Viewport - Single enhanced row */}
      <div
        className="w-full overflow-visible"
        style={{
          perspective: portfolioConfig.perspective,
          transformStyle: "preserve-3d"
        }}
      >
        <CarouselTrack
          items={portfolioItems}
          velocity={portfolioConfig.baseVelocity}
          cardWidth={cw}
          cardHeight={ch}
          gap={gap}
          maxRotation={maxRot}
          hoverScale={hScale}
          hoverTranslateZ={hZ}
        />
      </div>
    </section>
  );
}
