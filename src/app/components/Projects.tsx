import { ExternalLink, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function Projects() {
  const projects = [
    {
      title: "Hotel Management System",
      category: "Full-Stack Web Application",
      description: "Comprehensive booking and guest management platform for a 5-star hotel chain",
      image: "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzEyMDQ0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tech: ["React", "Node.js", "PostgreSQL"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Restaurant POS System",
      category: "Frontend + Backend",
      description: "Real-time order management and kitchen display system for multi-location restaurants",
      image: "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NzExOTQ5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tech: ["Next.js", "Express", "MongoDB"],
      gradient: "from-orange-500 to-amber-500"
    },
    {
      title: "Sales Dashboard",
      category: "Web Platform",
      description: "Interactive analytics dashboard for tracking team performance and sales metrics",
      image: "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzExNTkzODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tech: ["React", "TypeScript", "API Integration"],
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section id="projects" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4">
            <span className="text-sm font-medium">Featured Work</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Our Latest <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600">
            Explore some of our recent work helping businesses transform their operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/10 transition-all"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                
                {/* Floating icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                  className="absolute top-4 right-4"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <ArrowUpRight size={20} />
                  </div>
                </motion.div>
              </div>

              <div className="p-6">
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${project.gradient} bg-opacity-10 rounded-full mb-3`}>
                  <span className="text-xs font-medium bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-violet-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + i * 0.1 }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-violet-600 hover:text-violet-700 inline-flex items-center gap-2 font-medium group"
                >
                  View Project 
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}