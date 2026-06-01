import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useSiteContent } from "../context/SiteContentContext";

export function Contact() {
  const { content } = useSiteContent();
  const { contact } = content;

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full mb-4">
            <span className="text-sm font-medium">{contact.badge}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {contact.heading}<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">{contact.headingHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4"
            >
              <Mail size={28} />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Email Us</h3>
            <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-violet-600 transition-colors">
              {contact.email}
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4"
            >
              <Phone size={28} />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Call Us</h3>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-gray-600 hover:text-violet-600 transition-colors">
              {contact.phone}
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4"
            >
              <MapPin size={28} />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Website</h3>
            {contact.address.startsWith("http") ? (
              <a
                href={contact.address}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-violet-600 transition-colors break-all"
              >
                {contact.address.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            ) : (
              <p className="text-gray-600">{contact.address}</p>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your organization and which Finora product you need..."
                ></textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-xl font-medium inline-flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
              >
                Send Message <Send size={20} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
