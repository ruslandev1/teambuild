import { Code, Database, Users, Smartphone, Zap, Shield } from "lucide-react";
import { motion } from "motion/react";

export function Services() {
  const services = [
    {
      icon: <Code size={28} />,
      title: "Frontend Development",
      description: "Modern, responsive user interfaces built with React, Next.js, and cutting-edge technologies",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Database size={28} />,
      title: "Backend Solutions",
      description: "Robust server-side applications with secure APIs and efficient database management",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <Users size={28} />,
      title: "Team Building Programs",
      description: "Customized programs designed to strengthen collaboration and boost team performance",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Smartphone size={28} />,
      title: "Full-Stack Web Projects",
      description: "End-to-end web applications tailored to your business needs and goals",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Zap size={28} />,
      title: "Performance Optimization",
      description: "Lightning-fast applications optimized for speed and user experience",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield size={28} />,
      title: "Security & Compliance",
      description: "Enterprise-grade security measures and industry compliance standards",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4">
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600">
            We deliver comprehensive solutions that combine technical excellence with team development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-2xl -z-10 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}