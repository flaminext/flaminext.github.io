import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ContactModal from "../../componnets/ContactModal";

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.5 });
  const isCardsInView = useInView(cardsRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const services = [
    {
      id: 1,
      icon: "💻",
      title: "Web Development",
      description:
        "Custom web applications with modern technologies and scalable architecture.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      icon: "📱",
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile apps for iOS and Android devices.",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      icon: "🎨",
      title: "UI/UX Design",
      description: "Beautiful and intuitive interface design that users love.",
      color: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      icon: "⚙️",
      title: "System Integration",
      description:
        "Seamless integration between different systems and platforms.",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      icon: "🔒",
      title: "Security & QA",
      description:
        "Comprehensive testing and security audit for your application.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      icon: "📊",
      title: "IT Consulting",
      description:
        "Expert consultation for technology strategy and implementation.",
      color: "from-teal-500 to-blue-500",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Yellow Circle - Top Left */}
        <motion.div
          style={{ y: parallaxY1 }}
          animate={{
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-60"
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

        {/* Cyan Circle - Top Right */}
        <motion.div
          style={{ y: parallaxY3 }}
          animate={{
            x: [0, -20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-32 h-32 bg-cyan-400 rounded-full opacity-60"
        />

        {/* Green Circle - Middle Right */}
        <motion.div
          style={{ y: parallaxY1 }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-10 w-16 h-16 bg-green-400 rounded-full opacity-70"
        />

        {/* Pink Circle - Bottom Left */}
        <motion.div
          style={{ y: parallaxY2 }}
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

        {/* Orange Square - Bottom Right */}
        <motion.div
          style={{ y: parallaxY3 }}
          animate={{
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-20 w-20 h-20 bg-orange-400 opacity-60"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              Our Services
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            What We{" "}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Offer
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We provide comprehensive IT solutions tailored to your business
            needs with cutting-edge technology and innovative approaches.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-2xl h-full">
                {/* Icon with gradient background */}
                <div
                  className={`w-16 h-16 bg-linear-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Need a custom solution? Let's discuss your project
          </p>
          <button
            className="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            onClick={() => setIsModalOpen(true)}
          >
            Get Free Consultation
          </button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
