import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useSiteContent } from "../context/SiteContentContext";
import { BrandLogo } from "./BrandLogo";

export function Header() {
  const { content } = useSiteContent();
  const { brand } = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <BrandLogo
              brand={brand}
              nameClassName="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
            />
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button onClick={() => scrollToSection('home')} className="px-4 py-2 text-gray-600 hover:text-violet-600 transition-colors rounded-lg hover:bg-violet-50">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="px-4 py-2 text-gray-600 hover:text-violet-600 transition-colors rounded-lg hover:bg-violet-50">
              Services
            </button>
            <button onClick={() => scrollToSection('industries')} className="px-4 py-2 text-gray-600 hover:text-violet-600 transition-colors rounded-lg hover:bg-violet-50">
              Industries
            </button>
            <button onClick={() => scrollToSection('projects')} className="px-4 py-2 text-gray-600 hover:text-violet-600 transition-colors rounded-lg hover:bg-violet-50">
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="ml-4 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition-all">
              Get Started
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-6 space-y-2"
          >
            <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('industries')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
              Industries
            </button>
            <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg">
              Get Started
            </button>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
