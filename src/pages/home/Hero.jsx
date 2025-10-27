import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import ContactModal from "../../componnets/ContactModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Decorative shapes - Hidden on mobile, visible on lg */}
      <div className="hidden lg:block absolute top-20 left-10 w-24 h-24 bg-yellow-400 rounded-full opacity-80 lg:w-32 lg:h-32 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer z-0"></div>
      <div className="hidden lg:block absolute top-5 left-1/2 w-16 h-16 bg-purple-600 transform rotate-45 lg:w-20 lg:h-20 hover:scale-125 hover:rotate-90 transition-all duration-300 cursor-pointer z-0"></div>
      <div className="hidden lg:block absolute top-20 right-10 w-24 h-24 bg-cyan-400 rounded-full opacity-80 lg:w-32 lg:h-32 hover:scale-110 hover:-rotate-12 transition-all duration-300 cursor-pointer z-0"></div>
      <div className="hidden lg:block absolute top-1/2 right-20 w-12 h-12 bg-green-400 rounded-full lg:w-16 lg:h-16 hover:scale-150 hover:rotate-45 transition-all duration-300 cursor-pointer z-0"></div>

      {/* Main content */}
      <div className="mx-auto z-50 px-4 pt-32 pb-20 lg:pt-40">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 lg:mb-8 min-h-[120px] md:min-h-40 lg:min-h-[200px]">
            🚀 FLAMINEXT -{" "}
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
              className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            />
          </h1>
          {/* Subheading */}
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-10 lg:mb-12 px-4">
            We build cutting-edge software solutions for businesses worldwide.
            From web apps to mobile, we deliver quality, innovation, and
            reliable IT solutions for your digital transformation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button className="w-full cursor-pointer sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full text-base lg:text-lg font-medium hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              See our portfolio
            </button>
            <button
              className="w-full sm:w-auto cursor-pointer bg-white text-blue-600 px-8 py-4 rounded-full text-base lg:text-lg font-medium border-2 border-gray-300 hover:border-blue-600 transition-colors duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 pb-10 px-4 z-0">
        <div className="w-20 h-20 bg-green-400 rounded-3xl transform -rotate-12 lg:w-28 lg:h-28 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"></div>
        <div className="w-32 h-20 bg-green-500 rounded-3xl lg:w-44 lg:h-28 hover:scale-105 hover:-rotate-3 transition-all duration-300 cursor-pointer"></div>
        <div className="w-20 h-20 bg-purple-500 rounded-3xl transform rotate-12 lg:w-28 lg:h-28 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"></div>
        <div className="w-32 h-20 bg-pink-500 rounded-3xl lg:w-44 lg:h-28 hover:scale-105 hover:rotate-3 transition-all duration-300 cursor-pointer"></div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
