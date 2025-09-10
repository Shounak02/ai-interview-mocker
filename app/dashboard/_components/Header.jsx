"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

function Header({ interviewId }) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    {
      name: "Questions",
      href: interviewId
        ? `/dashboard/questions/${interviewId}`
        : "/dashboard/questions",
    },
    { name: "Upgrade", href: "/dashboard/upgrade" },
    { name: "How it Works?", href: "/dashboard/how" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <header ref={ref} className="sticky top-8 z-50 w-full">
      <motion.div
        animate={{
          width: scrolled ? "80%" : "100%",
          borderRadius: scrolled ? "16px" : "0px",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(245, 245, 245, 0.6)",
          boxShadow: scrolled
            ? "0 8px 24px rgba(0,0,0,0.12)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="mx-auto flex items-center justify-between px-5 py-5 backdrop-blur-md"
      >

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center">
          <Image src="/logo.svg" width={160} height={40} alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <motion.nav className="hidden md:flex gap-6 relative flex-1 justify-center items-center">
          {navItems.map((item, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="relative px-4 py-2 cursor-pointer rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence>
                {hovered === idx && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-full bg-primary/25 dark:bg-primary/30 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </AnimatePresence>

              <Link
                href={item.href}
                className={`relative z-10 transition-all font-medium px-3 py-1 rounded-full ${
                  path === item.href
                    ? "font-semibold text-primary bg-black text-white "
                    : "text-gray-700 dark:text-gray-200 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* User + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="scale-200">
            <UserButton />
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <span className="text-black dark:text-white">X</span>
            ) : (
              <span className="text-black dark:text-white">&#9776;</span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 mt-2 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`text-gray-700 dark:text-gray-200 transition-colors hover:text-primary ${
                path === item.href ? "font-semibold text-primary" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
