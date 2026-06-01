import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import {
  finoraCareersModules,
  finoraPlatforms,
} from "../data/finoraContent";

export function Industries() {
  return (
    <section
      id="solutions"
      className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-violet-50/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4">
            <span className="text-sm font-medium">Our Solutions</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Two Platforms,{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              One Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Finora System runs your enterprise operations. Finora Careers
            digitizes recruitment from vacancy to hire with AI at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {finoraPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-200 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p
                    className={`text-sm font-semibold bg-gradient-to-r ${platform.gradient} bg-clip-text text-transparent mb-1`}
                  >
                    {platform.tagline}
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {platform.name}
                  </h3>
                </div>
                <div
                  className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.gradient} flex flex-col items-center justify-center text-white`}
                >
                  <span className="text-xl font-bold leading-none">
                    {platform.stat.value}
                  </span>
                  <span className="text-[10px] font-medium opacity-90">
                    {platform.stat.label}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {platform.description}
              </p>

              <ul className="space-y-3 mb-8">
                {platform.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2
                      size={18}
                      className="text-violet-600 shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r ${platform.gradient} hover:shadow-lg transition-all`}
              >
                Learn more <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full mb-4">
              <span className="text-sm font-medium">Finora Careers</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              8 Modules for{" "}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Smart Hiring
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From vacancy creation and department requests to AI CV analysis,
              filtering, notifications, and recruitment analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {finoraCareersModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-pink-200 hover:shadow-md transition-all"
                >
                  <div
                    className={`w-11 h-11 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center text-white mb-4`}
                  >
                    <Icon size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {module.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
