"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-4">
            Services
          </h2>
          <p className="text-[var(--text-secondary)]">
            직접 만들고 운영하고 있는 서비스들입니다
          </p>
        </motion.div>

        <div className="flex flex-col gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
