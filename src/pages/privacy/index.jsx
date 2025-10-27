import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText, Users, Mail } from "lucide-react";

const PrivacyPage = () => {
  const sections = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, and any other information you choose to provide.",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotions.",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Information Sharing",
      content:
        "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Data Security",
      content:
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions in those communications.",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@flaminext.com or through our contact form.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              Privacy Policy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Your Privacy{" "}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Matters
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We are committed to protecting your privacy and ensuring the
            security of your personal information. This policy explains how we
            collect, use, and safeguard your data.
          </motion.p>
        </div>
      </section>

      {/* Last Updated */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-gray-500">Last updated: October 25, 2025</p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              If you have any questions about our privacy practices or this
              policy, we're here to help. Reach out to our privacy team.
            </p>
            <button className="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl">
              Contact Privacy Team
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
