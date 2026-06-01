import { motion } from "motion/react";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router";
import { useSiteContent } from "../context/SiteContentContext";
import { BrandLogo } from "./BrandLogo";

function FooterNavLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    return (
      <li>
        <button
          type="button"
          onClick={() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="hover:text-violet-400 transition-colors text-left"
        >
          {label}
        </button>
      </li>
    );
  }
  return (
    <li>
      <a href={href} className="hover:text-violet-400 transition-colors">
        {label}
      </a>
    </li>
  );
}

export function Footer() {
  const { content } = useSiteContent();
  const { brand, footer, socialLinks } = content;

  const socialItems = [
    { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Github, href: socialLinks.github, label: "GitHub" },
    { icon: Mail, href: socialLinks.mail, label: "Email" },
  ];

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
            <div className="mb-4">
              <BrandLogo brand={brand} />
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              {footer.tagline}
            </p>
            <div className="flex gap-3">
              {socialItems.map(({ icon: Icon, href, label }) => (
                <motion.a 
                  key={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-600 rounded-lg flex items-center justify-center transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Modules</h3>
            <ul className="space-y-3 text-gray-400">
              {footer.serviceLinks.map((link) => (
                <FooterNavLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4 text-lg">Solutions</h3>
            <ul className="space-y-3 text-gray-400">
              {footer.industryLinks.map((link) => (
                <FooterNavLink key={link.label} href={link.href} label={link.label} />
              ))}
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
              {footer.copyright}
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400 items-center">
              <a href={footer.privacyPolicy} className="hover:text-violet-400 transition-colors">Privacy Policy</a>
              <a href={footer.termsOfService} className="hover:text-violet-400 transition-colors">Terms of Service</a>
              <a href={footer.cookiePolicy} className="hover:text-violet-400 transition-colors">Cookie Policy</a>
              <Link to="/admin" className="hover:text-violet-400 transition-colors opacity-60">
                Admin
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
