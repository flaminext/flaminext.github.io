import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Shield,
  AlertTriangle,
  Scale,
  Mail,
} from "lucide-react";

const TermsPage = () => {
  const sections = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Acceptance of Terms",
      content:
        "By accessing and using FlamiNext services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Description of Service",
      content:
        "FlamiNext provides web development, design, and digital solutions. We reserve the right to modify or discontinue our services at any time without notice.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Intellectual Property",
      content:
        "All content, features, and functionality of our services are owned by FlamiNext and are protected by copyright, trademark, and other intellectual property laws.",
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Limitation of Liability",
      content:
        "FlamiNext shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services.",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Contact Information",
      content:
        "If you have any questions about these Terms of Service, please contact us at legal@flaminext.com or through our contact form.",
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
              Terms of Service
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Terms &{" "}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Conditions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Please read these terms carefully before using our services. By
            using FlamiNext, you agree to these terms.
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-purple-400 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-16 h-16 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
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

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-500 text-sm">
              Last updated: October 25, 2025
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
