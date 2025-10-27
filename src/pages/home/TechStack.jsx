import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Code2,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Rocket,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// Import logo images
import reactLogo from "../../assets/icons/react.png";
import vueLogo from "../../assets/icons/vue.png";
import nextjsLogo from "../../assets/icons/nextjs.png";
import tailwindLogo from "../../assets/icons/tailwind.png";
import typescriptLogo from "../../assets/icons/typeScript.png";
import framerLogo from "../../assets/icons/fromer.png";
import nodejsLogo from "../../assets/icons/nodejs.png";
import laravelLogo from "../../assets/icons/laravel.png";
import nestjsLogo from "../../assets/icons/nestjs.png";
import golangLogo from "../../assets/icons/golang.png";
import fastifyLogo from "../../assets/icons/fastify.png";
import flutterLogo from "../../assets/icons/flutter.png";
import ionicLogo from "../../assets/icons/ionic.png";
import kotlinLogo from "../../assets/icons/kotlin.png";
import reactNativeLogo from "../../assets/icons/reactNative.png";
import swiftLogo from "../../assets/icons/swift.png";
import expo from "../../assets/icons/expo.png";
import firebaseLogo from "../../assets/icons/firebase.png";
import mongoDbLogo from "../../assets/icons/mongoDb.png";
import mySqlLogo from "../../assets/icons/mySql.png";
import postgreSqlLogo from "../../assets/icons/postgreSql.png";
import redisLogo from "../../assets/icons/redis.png";
import supabaseLogo from "../../assets/icons/supabase.png";
import awsLogo from "../../assets/icons/aws.png";
import dockerLogo from "../../assets/icons/docker.png";
import githubActionsLogo from "../../assets/icons/githubActions.png";
import kubernetesLogo from "../../assets/icons/kubernetes.png";
import nginxLogo from "../../assets/icons/nginx.png";
import podmanLogo from "../../assets/icons/podman.png";
import vercelLogo from "../../assets/icons/vercel.png";

export default function TechStackSection() {
  const containerRef = useRef(null);
  const processRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const isProcessInView = useInView(processRef, { once: false, amount: 0.3 });

  const [activeTab, setActiveTab] = useState("frontend");

  const techStacks = {
    frontend: [
      {
        name: "React",
        icon: reactLogo,
        color: "from-blue-400 to-cyan-400",
        isImage: true,
      },
      {
        name: "Vue.js",
        icon: vueLogo,
        color: "from-green-400 to-emerald-400",
        isImage: true,
      },
      {
        name: "Next.js",
        icon: nextjsLogo,
        color: "from-gray-700 to-gray-900",
        isImage: true,
      },
      {
        name: "TailwindCSS",
        icon: tailwindLogo,
        color: "from-cyan-400 to-blue-500",
        isImage: true,
      },
      {
        name: "TypeScript",
        icon: typescriptLogo,
        color: "from-blue-600 to-blue-800",
        isImage: true,
      },
      {
        name: "Framer Motion",
        icon: framerLogo,
        color: "from-purple-400 to-pink-400",
        isImage: true,
      },
    ],
    backend: [
      {
        name: "Node.js",
        icon: nodejsLogo,
        color: "from-green-500 to-green-700",
        isImage: true,
      },
      {
        name: "Laravel",
        icon: laravelLogo,
        color: "from-red-500 to-red-700",
        isImage: true,
      },
      {
        name: "NestJS",
        icon: nestjsLogo,
        color: "from-red-600 to-pink-600",
        isImage: true,
      },
      {
        name: "Golang",
        icon: golangLogo,
        color: "from-cyan-500 to-blue-500",
        isImage: true,
      },
      {
        name: "Fastify",
        icon: fastifyLogo,
        color: "from-purple-500 to-indigo-500",
        isImage: true,
      },
    ],
    mobile: [
      {
        name: "React Native",
        icon: reactNativeLogo,
        color: "from-blue-500 to-purple-500",
        isImage: true,
      },
      {
        name: "Flutter",
        icon: flutterLogo,
        color: "from-blue-400 to-cyan-400",
        isImage: true,
      },
      {
        name: "Swift",
        icon: swiftLogo,
        color: "from-orange-500 to-red-500",
        isImage: true,
      },
      {
        name: "Kotlin",
        icon: kotlinLogo,
        color: "from-purple-500 to-indigo-500",
        isImage: true,
      },
      {
        name: "Expo",
        icon: expo,
        color: "from-indigo-500 to-blue-500",
        isImage: true,
      },
      {
        name: "Ionic",
        icon: ionicLogo,
        color: "from-blue-600 to-indigo-600",
        isImage: true,
      },
    ],
    database: [
      {
        name: "PostgreSQL",
        icon: postgreSqlLogo,
        color: "from-blue-600 to-indigo-600",
        isImage: true,
      },
      {
        name: "MongoDB",
        icon: mongoDbLogo,
        color: "from-green-500 to-emerald-500",
        isImage: true,
      },
      {
        name: "MySQL",
        icon: mySqlLogo,
        color: "from-blue-500 to-cyan-500",
        isImage: true,
      },
      {
        name: "Redis",
        icon: redisLogo,
        color: "from-red-500 to-red-700",
        isImage: true,
      },
      {
        name: "Firebase",
        icon: firebaseLogo,
        color: "from-yellow-500 to-orange-500",
        isImage: true,
      },
      {
        name: "Supabase",
        icon: supabaseLogo,
        color: "from-green-400 to-teal-400",
        isImage: true,
      },
    ],
    devops: [
      {
        name: "Docker",
        icon: dockerLogo,
        color: "from-blue-500 to-blue-700",
        isImage: true,
      },
      {
        name: "AWS",
        icon: awsLogo,
        color: "from-orange-500 to-yellow-500",
        isImage: true,
      },
      {
        name: "Vercel",
        icon: vercelLogo,
        color: "from-gray-800 to-black",
        isImage: true,
      },
      {
        name: "GitHub Actions",
        icon: githubActionsLogo,
        color: "from-gray-700 to-gray-900",
        isImage: true,
      },
      {
        name: "Kubernetes",
        icon: kubernetesLogo,
        color: "from-blue-600 to-indigo-600",
        isImage: true,
      },
      {
        name: "Nginx",
        icon: nginxLogo,
        color: "from-green-600 to-green-800",
        isImage: true,
      },
      {
        name: "Podman",
        icon: podmanLogo,
        color: "from-purple-500 to-indigo-500",
        isImage: true,
      },
    ],
  };

  const processes = [
    {
      number: "01",
      title: "Discovery & Planning",
      description:
        "We analyze your requirements, define project scope, and create a detailed roadmap for success.",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Requirement Analysis",
        "Market Research",
        "Project Timeline",
        "Resource Planning",
      ],
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description:
        "Our designers create stunning UI/UX designs and interactive prototypes for your approval.",
      icon: Code2,
      color: "from-purple-500 to-pink-500",
      features: [
        "Wireframing",
        "UI/UX Design",
        "Prototype Testing",
        "Design System",
      ],
    },
    {
      number: "03",
      title: "Development & Testing",
      description:
        "Clean code, best practices, and rigorous testing ensure a robust and scalable solution.",
      icon: Zap,
      color: "from-green-500 to-teal-500",
      features: [
        "Agile Development",
        "Code Review",
        "QA Testing",
        "Performance Optimization",
      ],
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "Smooth deployment, training, and ongoing maintenance to ensure your success.",
      icon: Rocket,
      color: "from-orange-500 to-red-500",
      features: [
        "Deployment",
        "User Training",
        "24/7 Support",
        "Continuous Updates",
      ],
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Tech Stack Section */}
      <div ref={containerRef} className="relative py-16 lg:py-32">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-40 left-10 w-24 h-24 bg-purple-400 rounded-full opacity-20 blur-xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-40 right-10 w-32 h-32 bg-cyan-400 rounded-full opacity-20 blur-xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div style={{ opacity }} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                Technology Stack
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Built With{" "}
              <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Modern Tech
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We use cutting-edge technologies and frameworks to build scalable,
              performant, and maintainable solutions.
            </motion.p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {Object.keys(techStacks).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 text-sm py-3 rounded-full font-semibold capitalize transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Tech Cards Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto"
          >
            {techStacks[activeTab].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group relative"
              >
                <div className="bg-white w-36 sm:w-36 md:w-40 lg:w-44 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-2xl text-center">
                  <div
                    className={`mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                  >
                    {tech.isImage ? (
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
                      />
                    ) : (
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        {tech.icon}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                    {tech.name}
                  </h3>

                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-20 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security and 99.9% uptime",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance for best user experience",
              },
              {
                icon: Cloud,
                title: "Scalable Solutions",
                description: "Built to grow with your business needs",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Process Section */}
      <div ref={processRef} className="relative py-20 lg:py-32 ">
        {/* Decorative Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-60" />
          <div className="absolute top-40 right-20 w-20 h-20 bg-purple-600 transform rotate-45 opacity-60" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-400 rounded-full opacity-60" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-24"
          >
            <div className="inline-block mb-4">
              <span className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                Our Process
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How We{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Work
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers results. From concept to
              launch, we've got you covered.
            </p>
          </motion.div>

          {/* Process Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  {/* Number Badge */}
                  <div
                    className={`absolute -top-6 -left-6 w-16 h-16 bg-linear-to-r ${process.color} rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <span className="text-white font-bold text-xl">
                      {process.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 bg-linear-to-r ${process.color} rounded-2xl flex items-center justify-center mb-6 ml-auto shadow-lg`}
                  >
                    <process.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {process.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {process.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <button className="group px-8 cursor-pointer py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
