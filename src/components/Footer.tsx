"use client";

import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="glass-strong p-8 rounded-2xl">
          <p className="gradient-text text-xl font-bold mb-4">Todari</p>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://github.com/Todari"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_contact_link', { link_type: 'github' })}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="mailto:todari.dev@gmail.com"
              onClick={() => trackEvent('click_contact_link', { link_type: 'email' })}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
            >
              Contact
            </a>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            &copy; {new Date().getFullYear()} Todari. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
