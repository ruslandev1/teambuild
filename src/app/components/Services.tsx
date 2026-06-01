import { motion } from "motion/react";
import { finoraSystemModules } from "../data/finoraContent";

export function Services() {
  return (
    <section id="modules" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4">
            <span className="text-sm font-medium">Finora System</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            16 Powerful{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Modules
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            One platform for budget, finance, HR, contracts, warehouse, tasks,
            training, and AI-powered analytics — fully integrated and real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {finoraSystemModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 transition-all"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {module.description}
                </p>
                <p className="text-xs font-medium text-violet-600">
                  {module.benefit}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
