"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Questions", href: "/dashboard/questions" },
    { name: "Upgrade", href: "/dashboard/upgrade" },
    { name: "How it Works?", href: "/dashboard/how" },
  ];

  const socialItems = [
    { href: "https://www.linkedin.com/in/shounakmandal/", icon: Linkedin, hoverColor: "text-blue-600" },
    { href: "https://github.com/Shounak02", icon: Github, hoverColor: "text-gray-900" },
    { href: "https://x.com/shounak02", icon: Twitter, hoverColor: "text-sky-500" },
    { href: "http://Wa.me/+919933179158", icon: Mail, hoverColor: "text-red-500" },
  ];

  return (
    <footer className="w-full bg-secondary text-grey-500 mt-10 rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left */}
        <div>
          <Image src="/footerlogo.svg" alt="Hexa Logo" width={50} height={60} />
          <p className="mt-2 text-lg leading-relaxed">
            <span className="font-semibold text-2xl">Hexa</span> — Online Mock Interviews Customized 
            to your Job Role, Tech Stack, and Experience.<br /><br />
            Made by <span className="font-semibold">Shounak Mandal</span>
          </p>
        </div>

        {/* Center */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-black mb-3">Quick Links</h2>
          <ul className="space-y-2">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <motion.div
                  onMouseEnter={() => setHoveredLink(idx)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative inline-block px-3 py-1 rounded-full cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatePresence>
                    {hoveredLink === idx && (
                      <motion.div
                        layoutId="footer-hover"
                        className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full z-0"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>
                  <Link
                    href={item.href}
                    className="relative z-10 transition-all font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end">
          <h2 className="text-xl font-semibold text-black mb-3">Connect</h2>
          <div className="flex gap-4">
            {socialItems.map((item, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredSocial(idx)}
                onMouseLeave={() => setHoveredSocial(null)}
                className="relative inline-block p-1 rounded-full cursor-pointer"
                whileHover={{ scale: 1.15 }}
              >
                {/* Animated background hover */}
                <AnimatePresence>
                  {hoveredSocial === idx && (
                    <motion.div
                      layoutId="social-hover"
                      className="absolute inset-0 rounded-full bg-primary/20 dark:bg-primary/30 z-0"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </AnimatePresence>

                {/* Original color hover */}
                <Link href={item.href} className={`relative z-10 transition-colors duration-300 ${hoveredSocial === idx ? item.hoverColor : "text-gray-600"}`}>
                  <item.icon className="w-6 h-6" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-600 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Hexa. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
