"use client"
import React from "react";
import Link from "next/link";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full bg-secondary text-grey-500 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left */}
        <div>
          <Image 
            src="/footerlogo.svg" 
            alt="Hexa Logo" 
            width={50} 
            height={60} 
          />
          <p className="mt-2 text-lg leading-relaxed">
        <span className="font-semibold text-2xl">Hexa</span> — Online Mock Interviews Customized 
        to your Job Role, Tech Stack, and Experience.<br />
        <br />
        Made by <span className="font-semibold">Shounak Mandal</span>
        </p>


        </div>

        {/* Center */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-black mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-blue-600 hover:font-semibold transition-all cursor-pointer">Dashboard</Link></li>
            <li><Link href="/dashboard/questions" className="hover:text-blue-600 hover:font-semibold transition-all cursor-pointer">Questions</Link></li>
            <li><Link href="/dashboard/upgrade" className="hover:text-blue-600 hover:font-semibold transition-all cursor-pointer">Upgrade</Link></li>
            <li><Link href="/dashboard/how" className="hover:text-blue-600 hover:font-semibold transition-all cursor-pointer">How it Works?</Link></li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end">
          <h2 className="text-xl font-semibold text-black mb-3">Connect</h2>
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/in/shounakmandal/">
              <Linkedin className="w-6 h-6 text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300 cursor-pointer" />
            </Link>
            <Link href="https://github.com/Shounak02">
              <Github className="w-6 h-6 text-gray-600 hover:text-gray-900 transform hover:scale-110 transition-all duration-300 cursor-pointer" />
            </Link>
            <Link href="https://x.com/shounak02">
              <Twitter className="w-6 h-6 text-gray-600 hover:text-sky-500 transform hover:scale-110 transition-all duration-300 cursor-pointer" />
            </Link>
            <Link href="http://Wa.me/+919933179158">
              <Mail className="w-6 h-6 text-gray-600 hover:text-red-500 transform hover:scale-110 transition-all duration-300 cursor-pointer" />
            </Link>
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
