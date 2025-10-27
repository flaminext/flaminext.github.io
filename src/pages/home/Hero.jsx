import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import ContactModal from "../../componnets/ContactModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Decorative shapes - Hidden on mobile, visible on md */}
      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-yellow-400 rounded-full opacity-80 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer z-0"></div>
      <div className="hidden md:block absolute top-5 left-1/2 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-purple-600 transform rotate-45 hover:scale-125 hover:rotate-90 transition-all duration-300 cursor-pointer z-0"></div>
      <div className="hidden md:block absolute top-20 right-10 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-cyan-400 rounded-full opacity-80 hover:scale-110 hover:-rotate-12 transition-all duration-300 cursor-pointer z-0"></div>
      <div className="hidden md:block absolute top-1/2 right-20 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-green-400 rounded-full hover:scale-150 hover:rotate-45 transition-all duration-300 cursor-pointer z-0"></div>

      {/* Main content */}
      <div className="mx-auto z-50 px-4 pt-24 pb-32 sm:pt-28 sm:pb-36 md:pt-32 md:pb-40 lg:pt-40 lg:pb-48">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[180px] xl:min-h-[200px] flex flex-col items-center justify-center">
            <span className="block mb-1 sm:mb-2 md:mb-3">🚀 FLAMINEXT -</span>
            <TypeAnimation
              sequence={[
                "Innovative Software Solutions",
                3000,
                "Cutting-Edge Web Apps",
                3000,
                "Mobile Development Experts",
                3000,
                "Digital Transformation Partners",
                3000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            />
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4 leading-relaxed">
            We build cutting-edge software solutions for businesses worldwide.
            From web apps to mobile, we deliver quality, innovation, and
            reliable IT solutions for your digital transformation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center items-center px-4">
            <button className="w-full cursor-pointer sm:w-auto bg-blue-600 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-medium hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              See our portfolio
            </button>
            <button
              className="w-full sm:w-auto cursor-pointer bg-white text-blue-600 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-medium border-2 border-gray-300 hover:border-blue-600 transition-colors duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10 left-0 right-0 flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-4 z-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-green-400 rounded-3xl transform -rotate-12 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"></div>
        <div className="w-20 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-36 lg:h-24 xl:w-44 xl:h-28 bg-green-500 rounded-3xl hover:scale-105 hover:-rotate-3 transition-all duration-300 cursor-pointer"></div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-purple-500 rounded-3xl transform rotate-12 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"></div>
        <div className="w-20 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-36 lg:h-24 xl:w-44 xl:h-28 bg-pink-500 rounded-3xl hover:scale-105 hover:rotate-3 transition-all duration-300 cursor-pointer"></div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
