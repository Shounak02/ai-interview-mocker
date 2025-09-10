"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export function HoverEffect({ items, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-8 w-full group/features",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.15 }}
        >
          <Link href={item.link || "#"} className="block">
            <motion.div
              whileHover={{
                scale: 1.05,
                rotateX: 2,
                rotateY: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={cn(
                "relative p-6 rounded-2xl shadow-sm bg-secondary transition-all duration-300",
                "hover:shadow-xl hover:bg-secondary/90"
              )}
            >
              {/* Glow effect that links cards together */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/features:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-500/10 via-transparent to-indigo-500/10 blur-xl -z-10" />

              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
