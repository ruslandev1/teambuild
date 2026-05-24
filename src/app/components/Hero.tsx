import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useSiteContent } from "../context/SiteContentContext";

export function Hero() {
  const { content } = useSiteContent();
  const { hero, brand } = content;

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openDemo = () => {
    if (hero.demoVideoUrl) {
      window.open(hero.demoVideoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-6"
            >
              <CheckCircle2 size={16} />
              <span className="text-sm font-medium">{hero.badge}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              {hero.title}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">{hero.titleHighlight}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl inline-flex items-center gap-2 font-medium shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
              >
                Get Started <ArrowRight size={20} />
              </motion.button>

              {hero.demoVideoUrl && (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openDemo}
                  className="px-8 py-4 bg-white text-gray-700 rounded-xl inline-flex items-center gap-2 font-medium border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all"
                >
                  <Play size={20} /> Watch Demo
                </motion.button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              <div>
                <div className="text-3xl font-bold text-gray-900">{hero.stat1Value}</div>
                <div className="text-sm text-gray-600">{hero.stat1Label}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{hero.stat2Value}</div>
                <div className="text-sm text-gray-600">{hero.stat2Label}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{hero.stat3Value}</div>
                <div className="text-sm text-gray-600">{hero.stat3Label}</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={hero.image}
                alt={`${brand.name} team collaboration`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-white" size={24} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Successfully Launched</div>
                  <div className="text-sm text-gray-600">300+ Projects This Year</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
