import { motion } from "motion/react";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <span className="text-2xl font-semibold">TeamBuild</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Empowering hotels, restaurants, and sales companies with custom web solutions and team building programs that drive real results.
            </p>
            <div className="flex gap-3">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 rounded-lg flex items-center justify-center transition-all"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 rounded-lg flex items-center justify-center transition-all"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 rounded-lg flex items-center justify-center transition-all"
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 rounded-lg flex items-center justify-center transition-all"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Frontend Development</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Backend Solutions</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Team Building</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Full-Stack Projects</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Industries</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Hotels</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Restaurants</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Sales Companies</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">All Industries</a></li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2026 TeamBuild. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-violet-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}