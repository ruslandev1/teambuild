import { Building2, Utensils, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function Industries() {
  const industries = [
    {
      icon: <Building2 size={28} />,
      title: "Hotels",
      description: "Streamlined booking systems, staff management tools, and guest experience platforms",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Utensils size={28} />,
      title: "Restaurants",
      description: "POS systems, reservation platforms, and kitchen management solutions",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Sales Companies",
      description: "CRM platforms, sales tracking tools, and team performance dashboards",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section id="industries" className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-violet-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-6">
              <span className="text-sm font-medium">Industries We Serve</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Specialized Solutions for Your <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Industry</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We specialize in creating tailored solutions for hospitality and sales sectors, understanding the unique challenges each industry faces.
            </p>

            <div className="space-y-6">
              {industries.map((industry, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-5">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${industry.gradient} rounded-xl flex items-center justify-center text-white`}
                    >
                      {industry.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{industry.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{industry.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1739063273639-17d8a5e3100c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc3RhdXJhbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzEyMjM2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Business environment"
                  className="w-full h-[600px] object-cover"
                />
              </motion.div>
              
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent"></div>
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">🎯</div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}