"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header({ interviewId }) {
  const path = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Questions", href: interviewId ? `/dashboard/questions/${interviewId}` : "/dashboard/questions" },
    { name: "Upgrade", href: "/dashboard/upgrade" },
    { name: "How it Works?", href: "/dashboard/how" },
  ]

  return (
    <div className="flex w-full p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src="/logo.svg" width={160} height={100} alt="logo" />

      <ul className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <li
            key={item.name}
            className={`
              relative cursor-pointer text-gray-700 dark:text-gray-200
              hover:text-blue-600 hover:font-semibold transition-all
              after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px]
              after:bg-blue-600 after:transition-all after:duration-300
              ${path === item.href ? "font-bold after:w-full" : ""}
            `}
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div className="transform scale-150">
        <UserButton />
      </div>
    </div>
  )
}

export default Header
