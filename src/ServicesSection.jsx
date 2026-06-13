import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import './services-section.css';

// ==========================================
// CONFIGURATION SYSTEM
// ==========================================
export const serviceSectionConfig = {
  sectionTitle: "IN THE STUDIO",
  sectionSubtitle: "Precision crafted audio solutions for cinema, music, streaming, and immersive experiences.",
  sectionPadding: "py-32 px-6 md:px-12 lg:px-24",
  containerWidth: "max-w-[1440px]",
  spacing: "gap-12 lg:gap-20",

  // Motion Settings
  animationDuration: 0.8,
  staggerDelay: 0.15,
  easing: [0.215, 0.61, 0.355, 1],
  imageTransitionDuration: 0.6,

  // Responsive Design Breakpoints
  mobileBreakpoint: 768,
  desktopBreakpoint: 1024
};

// ==========================================
// SERVICE DATA
// ==========================================
export const servicesData = [
  {
    id: "01",
    title: "Stereo Mixing",
    description: "Balancing every element into a cohesive, dynamic, release-ready stereo mix.",
    imageUrl: "Services/Stereo Mixing pic.jpg.jpeg"
  },
  {
    id: "02",
    title: "Mastering",
    description: "Final polish for streaming, broadcast, and physical release, meticulous to the last decibel.",
    imageUrl: "Services/Mastering.jpg.jpeg"
  },
  {
    id: "03",
    title: "Dolby Atmos Mixing",
    description: "Immersive spatial audio for cinema, premium streaming, and theatrical release.",
    imageUrl: "Services/Dolby atmos Mixing.png"
  },
  {
    id: "04",
    title: "Background Score",
    description: "Professional music mixing that brings out the emotion, energy, and detail in every performance.",
    imageUrl: "Services/Background Score.png"
  }
];

// ==========================================
// SUB-COMPONENT: SERVICE CARD
// ==========================================
const ServiceCard = ({ service, index, setActiveIndex }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    amount: 0.6,
    once: false
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: serviceSectionConfig.animationDuration,
        ease: serviceSectionConfig.easing
      }}
    >
      <h3 className="service-card__title">{service.title}</h3>

      <p className="service-card__desc">{service.description}</p>
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT: SERVICES SECTION
// ==========================================
const ServicesSection = () => {
  const sectionContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll progress tracking scoped to this section
  const { scrollYProgress } = useScroll({
    target: sectionContainerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring for cinematic movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    mass: 0.5
  });

  // Parallax offset for the image track
  const yParallax = useTransform(smoothProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={sectionContainerRef} className="services-section" id="services">

      {/* Decorative Vinyl Record — Left edge accent */}
      <div className="services-vinyl" aria-hidden="true">
        <div className="services-vinyl__disc">
          <div className="services-vinyl__label">
            <div className="services-vinyl__hole" />
          </div>
        </div>
      </div>

      {/* Editorial Header */}
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: serviceSectionConfig.easing }}
        >
          <h2 className="services-header__title">
            {serviceSectionConfig.sectionTitle}
          </h2>
          <p className="services-header__subtitle">
            {serviceSectionConfig.sectionSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="services-container services-grid">

        {/* Left Column — Scroll Cards */}
        <div className="services-cards">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>

        {/* Right Column — Sticky Visual Frame */}
        <div className="services-visual">
          <motion.div
            className="services-visual__track"
            style={{ y: yParallax }}
          >
            {servicesData.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={service.id}
                  className="services-visual__layer"
                  initial={false}
                  animate={{
                    clipPath: isActive
                      ? "inset(0% 0% 0% 0%)"
                      : index < activeIndex
                        ? "inset(0% 0% 100% 0%)"
                        : "inset(100% 0% 0% 0%)",
                    scale: isActive ? 1.0 : 1.08,
                    filter: isActive
                      ? "brightness(1) contrast(1)"
                      : "brightness(0.3) contrast(1.2)"
                  }}
                  transition={{
                    duration: serviceSectionConfig.imageTransitionDuration,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                >
                  {/* Dark Cinematic Vignette */}
                  <div className="services-visual__vignette" />

                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="services-visual__img"
                    draggable={false}
                  />

                 
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
