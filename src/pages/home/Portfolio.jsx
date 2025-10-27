import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Portfolio() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState([0, 0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  const portfolioItems = [
    {
      title: "E-commerce Platform",
      description:
        "Modern online shopping solution dengan advanced analytics dan payment integration yang seamless untuk scale bisnis digital Anda.",
      category: "E-commerce",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=1000&fit=crop",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "MLM Management System",
      description:
        "Platform multi-level marketing komprehensif dengan real-time commission tracking, genealogy visualization, dan automated payout system.",
      category: "MLM",
      tags: ["Vue.js", "Laravel", "MySQL", "WebSocket", "Redis"],
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Learning Management System",
      description:
        "Platform e-learning interaktif dengan fitur live class, assignment system, quiz automation, dan certificate generator untuk institusi pendidikan.",
      category: "LMS",
      tags: ["React", "Django", "PostgreSQL", "WebRTC", "Docker"],
      images: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1000&fit=crop",
      ],
      color: "from-green-500 to-teal-500",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const image1Y = useTransform(scrollYProgress, [0, 0.2], [400, 0]);
  const image1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, 1]);

  const image2Y = useTransform(scrollYProgress, [0.3, 0.5], [400, 0]);
  const image2Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5],
    [0, 0, 1]
  );

  const image3Y = useTransform(scrollYProgress, [0.6, 0.8], [400, 0]);
  const image3Opacity = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.8],
    [0, 0, 1]
  );

  // Parallax transforms for decorative elements
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const parallaxY4 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY5 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const parallaxY6 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const parallaxY7 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parallaxY8 = useTransform(scrollYProgress, [0, 1], [0, -350]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const unsubscribe = scrollYProgress.on("change", (progress) => {
        if (progress < 0.35) setActiveIndex(0);
        else if (progress < 0.65) setActiveIndex(1);
        else setActiveIndex(2);
      });
      return unsubscribe;
    }
  }, [scrollYProgress, isMobile]);

  const handleNextImage = (projectIndex) => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      const totalImages = portfolioItems[projectIndex].images.length;
      newIndexes[projectIndex] = (prev[projectIndex] + 1) % totalImages;
      return newIndexes;
    });
  };

  const handlePrevImage = (projectIndex) => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      const totalImages = portfolioItems[projectIndex].images.length;
      newIndexes[projectIndex] =
        (prev[projectIndex] - 1 + totalImages) % totalImages;
      return newIndexes;
    });
  };

  const ImageCard = ({ images, projectIndex, style, alt, color }) => {
    const currentImg = currentImageIndex[projectIndex];
    const hasMultipleImages = images.length > 1;

    return (
      <div className="absolute inset-0">
        <motion.div style={style} className="relative w-full h-full">
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
            {/* Image Display */}
            <motion.img
              key={currentImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={images[currentImg]}
              alt={`${alt} - ${currentImg + 1}`}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-linear-to-br ${color} opacity-10`}
            />

            {/* Navigation Controls - Show only if multiple images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={() => handlePrevImage(projectIndex)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-50 hover:opacity-100 transition-all duration-300 z-10 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>

                <button
                  onClick={() => handleNextImage(projectIndex)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-50 hover:opacity-100 transition-all duration-300 z-10 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 text-white text-sm rounded-full font-medium">
                  {currentImg + 1} / {images.length}
                </div>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setCurrentImageIndex((prev) => {
                          const newIndexes = [...prev];
                          newIndexes[projectIndex] = idx;
                          return newIndexes;
                        })
                      }
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentImg
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <section ref={containerRef} className="relative z-0">
      {isMobile ? (
        // Mobile Version - Carousel
        <div className="py-20 px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4">
              Our Work
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Portfolio Showcase
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Discover our innovative solutions and successful projects
            </p>
          </div>

          {/* Stacked Cards Container */}
          <div className="relative w-full max-w-sm mx-auto h-96 overflow-hidden rounded-2xl">
            {portfolioItems.map((item, index) => {
              const stackIndex =
                (index - activeIndex + portfolioItems.length) %
                portfolioItems.length;

              // Calculate position based on stackIndex
              const offset = stackIndex * 15; // Offset in pixels
              const scale = 1 - stackIndex * 0.05; // Scale down for cards behind
              const opacity = 1 - stackIndex * 0.3; // Fade out for cards behind
              const zIndex = 100 - stackIndex; // Higher z-index for top card

              return (
                <motion.div
                  key={`${item.title}-${index}`}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    zIndex,
                  }}
                  initial={false}
                  animate={{
                    scale,
                    rotate:
                      stackIndex === 0 ? 0 : stackIndex % 2 === 0 ? 3 : -3,
                    x: offset,
                    y: offset,
                    opacity,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag={stackIndex === 0 ? "x" : false} // Only allow drag on top card
                  dragConstraints={{ left: -150, right: 150 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => {
                    if (stackIndex !== 0) return; // Only handle drag on top card

                    const swipeThreshold = 50;
                    if (info.offset.x > swipeThreshold) {
                      // Swipe right - prev
                      setActiveIndex(
                        (prev) =>
                          (prev - 1 + portfolioItems.length) %
                          portfolioItems.length
                      );
                    } else if (info.offset.x < -swipeThreshold) {
                      // Swipe left - next
                      setActiveIndex(
                        (prev) => (prev + 1) % portfolioItems.length
                      );
                    }
                  }}
                  whileDrag={stackIndex === 0 ? { scale: 1.02, rotate: 3 } : {}}
                >
                  <div className="w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48">
                      <img
                        src={item.images[currentImageIndex[index]]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-20`}
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 bg-linear-to-r ${item.color} text-white rounded-full text-xs font-bold uppercase`}
                        >
                          {item.category}
                        </span>
                      </div>

                      {/* Image Navigation - Only show if multiple images and this is the top card */}
                      {stackIndex === 0 && item.images.length > 1 && (
                        <>
                          <button
                            onClick={() => handlePrevImage(index)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 transition-all duration-300 z-10"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4 text-gray-800" />
                          </button>

                          <button
                            onClick={() => handleNextImage(index)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-70 hover:opacity-100 transition-all duration-300 z-10"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-4 h-4 text-gray-800" />
                          </button>

                          {/* Dot Indicators */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {item.images.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={() => {
                                  setCurrentImageIndex((prev) => {
                                    const newIndexes = [...prev];
                                    newIndexes[index] = imgIndex;
                                    return newIndexes;
                                  });
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  imgIndex === currentImageIndex[index]
                                    ? "bg-white w-5"
                                    : "bg-white/50 hover:bg-white/70"
                                }`}
                                aria-label={`Go to image ${imgIndex + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Image Counter */}
                      <div className="text-xs text-gray-500 mb-3">
                        {item.images.length} Images
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <p className="text-xs text-gray-500 text-center mt-2">
            Swipe left or right to navigate
          </p>
        </div>
      ) : (
        // Desktop Version
        <>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Blue Circle - Top Left */}
            <motion.div
              style={{ y: parallaxY1 }}
              className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-60"
            />

            {/* Purple Diamond - Top Center */}
            <motion.div
              style={{ y: parallaxY2 }}
              animate={{
                rotate: [45, 135, 45],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-purple-600 transform rotate-45"
            />

            {/* Green Circle - Top Right */}
            <motion.div
              style={{ y: parallaxY3 }}
              className="absolute top-20 right-10 w-32 h-32 bg-green-400 rounded-full opacity-60"
            />

            {/* Cyan Triangle - Left Side */}
            <motion.div
              style={{
                y: parallaxY4,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
              animate={{
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-10 w-16 h-16 bg-cyan-400"
            />

            {/* Pink Circle - Bottom Left */}
            <motion.div
              style={{ y: parallaxY5 }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 left-20 w-24 h-24 bg-pink-400 rounded-full opacity-50"
            />

            {/* Yellow Square - Bottom Right */}
            <motion.div
              style={{ y: parallaxY6 }}
              animate={{
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-20 w-20 h-20 bg-yellow-400"
            />

            {/* Red Hexagon - Middle Left */}
            <motion.div
              style={{
                y: parallaxY7,
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
              animate={{
                rotate: [0, 60, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/3 left-5 w-14 h-14 bg-red-400 opacity-70"
            />

            {/* Orange Star - Middle Right */}
            <motion.div
              style={{
                y: parallaxY8,
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
              animate={{
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-2/3 right-5 w-18 h-18 bg-orange-400 opacity-60"
            />

            {/* Teal Pentagon - Top Middle */}
            <motion.div
              style={{
                y: parallaxY1,
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -45, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-32 left-1/3 w-12 h-12 bg-teal-400 opacity-50"
            />

            {/* Indigo Oval - Bottom Middle */}
            <motion.div
              style={{ y: parallaxY3 }}
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-32 left-2/3 w-28 h-16 bg-indigo-400 rounded-full opacity-40"
            />

            {/* Lime Triangle - Right Middle */}
            <motion.div
              style={{
                y: parallaxY5,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
              animate={{
                x: [0, 10, 0],
                rotate: [0, 120, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 right-16 w-10 h-10 bg-lime-400 opacity-60"
            />
          </div>

          {/* Sticky Container */}
          <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 lg:py-20 z-10">
            {/* Header Inside Sticky - Always Visible */}
            <div className="w-full container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
              <motion.div
                style={{ opacity, scale }}
                className="text-center max-w-3xl mx-auto"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4"
                >
                  <span className="px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold uppercase tracking-wider">
                    Our Work
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                >
                  Portfolio Showcase
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
                >
                  Discover our innovative solutions and successful projects that
                  have transformed businesses across industries
                </motion.p>
              </motion.div>
            </div>

            {/* Portfolio Content */}
            <div className="container mx-auto px-4 sm:px-6 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                {/* LEFT SIDE - Stacked Images */}
                <div className="relative order-2 lg:order-1">
                  <div className="relative w-full max-w-lg mx-auto h-[400px] sm:h-[450px] md:h-[500px]">
                    {/* Image 1 */}
                    <ImageCard
                      images={portfolioItems[0].images}
                      projectIndex={0}
                      style={{ y: image1Y, opacity: image1Opacity }}
                      alt={portfolioItems[0].title}
                      color={portfolioItems[0].color}
                    />

                    {/* Image 2 */}
                    <ImageCard
                      images={portfolioItems[1].images}
                      projectIndex={1}
                      style={{ y: image2Y, opacity: image2Opacity }}
                      alt={portfolioItems[1].title}
                      color={portfolioItems[1].color}
                    />

                    {/* Image 3 */}
                    <ImageCard
                      images={portfolioItems[2].images}
                      projectIndex={2}
                      style={{ y: image3Y, opacity: image3Opacity }}
                      alt={portfolioItems[2].title}
                      color={portfolioItems[2].color}
                    />
                  </div>
                </div>

                {/* RIGHT SIDE - Content Description */}
                <div className="order-1 lg:order-2 px-4 sm:px-0">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Category Badge */}
                    <div className="inline-block">
                      <span
                        className={`px-4 sm:px-5 py-1.5 sm:py-2 bg-linear-to-r ${portfolioItems[activeIndex].color} text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-lg`}
                      >
                        {portfolioItems[activeIndex].category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      {portfolioItems[activeIndex].title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {portfolioItems[activeIndex].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                      {portfolioItems[activeIndex].description}
                    </p>

                    {/* Image Counter Info */}
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="font-medium">
                        {portfolioItems[activeIndex].images.length} Images
                      </span>
                      <span>•</span>
                      <span>Swipe to view all</span>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6">
                      {portfolioItems.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                            index === activeIndex
                              ? "w-12 sm:w-16 bg-blue-600"
                              : "w-6 sm:w-8 bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 sm:pt-4">
                      <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl">
                        View Case Study
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-[150vh] sm:h-[180vh] lg:h-[200vh]" />
        </>
      )}
    </section>
  );
}
