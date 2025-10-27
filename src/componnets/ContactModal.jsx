import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, X, ArrowRight, Calendar } from "lucide-react";

const ContactModal = ({ isOpen, onClose }) => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyLoading, setCalendlyLoading] = useState(false);

  // Initialize Calendly when modal opens
  useEffect(() => {
    if (showCalendly && window.Calendly) {
      setCalendlyLoading(true);
      try {
        // Re-initialize Calendly widget
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/flaminext-dev?primary_color=5a00ff",
          parentElement: document.querySelector(".calendly-inline-widget"),
        });
        setTimeout(() => setCalendlyLoading(false), 1000);
      } catch (error) {
        console.error("Calendly initialization failed:", error);
        setCalendlyLoading(false);
      }
    }
  }, [showCalendly]);
  const handleEmail = () => {
    window.location.href =
      "mailto:flaminext.dev@gmail.com?subject=Free Consultation Request&body=Hi Flaminext Team,%0A%0AI am interested in getting a free consultation for my project. Please let me know the next steps.%0A%0ABest regards,%0A[Your Name]";
    onClose();
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/6282138109809?text=Halo Flaminext! Saya tertarik untuk konsultasi gratis tentang project saya. Bisakah kita diskusi lebih lanjut?",
      "_blank"
    );
    onClose();
  };

  const handleCalendly = () => {
    setShowCalendly(true);
    setTimeout(() => {
      if (!window.Calendly) {
        window.open("https://calendly.com/flaminext-dev", "_blank");
        setShowCalendly(false);
      }
    }, 2000);
  };

  const handleScrollToFooter = () => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <h3 className="text-xl font-bold mb-2">
                  Get Free Consultation
                </h3>
                <p className="text-blue-100 text-sm">
                  Choose how you'd like to connect with us - we respond within
                  24 hours
                </p>
              </div>

              {/* Options */}
              <div className="p-6 space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmail}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                    <p className="text-sm text-gray-600">
                      Send us an email with your inquiry
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-200 hover:border-green-200 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900">
                      WhatsApp Chat
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quick chat via WhatsApp
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalendly}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-orange-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900">
                      Book a Meeting
                    </h4>
                    <p className="text-sm text-gray-600">
                      Schedule a call via Calendly
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleScrollToFooter}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-purple-50 rounded-xl border border-gray-200 hover:border-purple-200 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900">
                      Contact Form
                    </h4>
                    <p className="text-sm text-gray-600">
                      Fill out our newsletter form
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </motion.button>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <p className="text-xs text-gray-500 text-center">
                  Choose your preferred way to connect • We typically respond
                  within 24 hours
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendly Embed Modal */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCalendly(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-600 to-purple-600 p-4 text-white relative flex items-center justify-between">
                <h3 className="text-lg font-bold">
                  Schedule Your Free Consultation
                </h3>
                <button
                  onClick={() => setShowCalendly(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Calendly Embed */}
              <div className="p-4">
                {calendlyLoading && (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading Calendly...</p>
                    </div>
                  </div>
                )}
                <style>{`
                  .calendly-inline-widget {
                    max-width: 100% !important;
                    margin: 0 auto !important;
                  }
                  .calendly-inline-widget iframe {
                    max-width: 100% !important;
                  }
                  .calendly-inline-widget ::-webkit-scrollbar {
                    width: 6px !important;
                  }
                  .calendly-inline-widget ::-webkit-scrollbar-track {
                    background: #f1f1f1 !important;
                  }
                  .calendly-inline-widget ::-webkit-scrollbar-thumb {
                    background: #b531ff !important;
                    border-radius: 3px !important;
                  }
                  .calendly-inline-widget ::-webkit-scrollbar-thumb:hover {
                    background: #a020f0 !important;
                  }
                  /* Hide powered by calendly */
                  .calendly-inline-widget [data-test="powered-by-calendly"],
                  .calendly-inline-widget a[href*="poweredby"],
                  .powered-by-calendly {
                    display: none !important;
                  }
                `}</style>
                <div
                  className={`calendly-inline-widget ${calendlyLoading ? "hidden" : ""}`}
                  data-url="https://calendly.com/flaminext-dev?primary_color=5a00ff&hide_landing_page_details=1&hide_event_type_details=1"
                  style={{
                    minWidth: "320px",
                    height: "600px",
                    maxWidth: "100%",
                    margin: "0 auto",
                  }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactModal;
