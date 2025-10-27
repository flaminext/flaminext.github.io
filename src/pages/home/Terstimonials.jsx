import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function TestimonialSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "CEO",
      company: "TechStart Indonesia",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "Flaminext sangat profesional dalam handling project kami. Dari konsultasi hingga deployment, semuanya berjalan smooth. Highly recommended!",
      project: "E-commerce Platform",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "Digital Marketing Co",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "Tim yang sangat responsif dan kreatif. Mereka tidak hanya develop aplikasi, tapi juga memberikan insight berharga untuk improve user experience.",
      project: "MLM Management System",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Ahmad Rizki",
      role: "IT Manager",
      company: "Universitas Nusantara",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "LMS yang mereka develop sangat powerful dan user-friendly. Students dan dosen sangat puas dengan platform ini. Worth every penny!",
      project: "Learning Management System",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Linda Wijaya",
      role: "Founder",
      company: "BeautyHub Store",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "Website e-commerce kami sekarang loading super cepat dan conversion rate naik 40%! Thank you Flaminext team untuk kerja kerasnya.",
      project: "E-commerce Optimization",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "David Chen",
      role: "CTO",
      company: "FinanceApp Solutions",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Security audit dan penetration testing yang mereka lakukan sangat thorough. Berhasil identify vulnerabilities yang kami tidak aware sebelumnya.",
      project: "Security Audit",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  // Auto scroll for testimonial cards
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Yellow Circle - Top Left */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden md:block absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-80"
        />

        {/* Purple Diamond - Top Center */}
        <motion.div
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
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-32 h-32 bg-cyan-400 rounded-full opacity-80"
        />

        {/* Green Circle - Right Side */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-10 w-16 h-16 bg-green-400 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 bg-linier-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold uppercase tracking-wider">
              Client Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Trusted by 100+ companies across Indonesia. Here's what they have to
            say about working with us.
          </motion.p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative bg-white backdrop-blur-lg rounded-3xl p-6 lg:p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 h-full">
                {/* Quote Icon */}
                <div
                  className={`absolute -top-4 -left-4 w-12 h-12 bg-linier-to-r ${testimonial.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Project Badge */}
                <div className="inline-block mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {testimonial.project}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200"
                  />
                  <div>
                    <h4 className="text-gray-900 font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Large Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative bg-white backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-xl overflow-hidden">
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-linier-to-br ${testimonials[currentIndex].color} opacity-5`}
            />

            <div className="relative z-10">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
              >
                {/* Large Image */}
                <motion.div whileHover={{ scale: 1.05 }} className="shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl object-cover ring-4 ring-purple-200 shadow-2xl"
                  />
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex gap-1 justify-center lg:justify-start mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>

                  <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6">
                    "{testimonials[currentIndex].text}"
                  </p>

                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].role} at{" "}
                      {testimonials[currentIndex].company}
                    </p>
                  </div>

                  <span
                    className={`inline-block px-4 py-2 bg-linier-to-r ${testimonials[currentIndex].color} text-white rounded-full text-sm font-semibold`}
                  >
                    {testimonials[currentIndex].project}
                  </span>
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex gap-2 justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-purple-600"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 lg:mt-24"
        >
          {[
            { number: "100+", label: "Happy Clients" },
            { number: "250+", label: "Projects Completed" },
            { number: "5.0", label: "Average Rating" },
            { number: "98%", label: "Client Retention" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white backdrop-blur-lg rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              <motion.h3
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
