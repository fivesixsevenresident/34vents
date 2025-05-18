"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
 const pathname = usePathname();


 return (
   <nav className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-sm">
     <Link href="/" className="text-xl font-bold">
       34 Vent
     </Link>
     <div className="flex gap-6">
       <Link
         href="/"
         className={`hover:text-blue-600 transition-colors ${pathname === "/" ? "text-blue-600 font-medium" : ""}`}
       >
         Home
       </Link>
       <Link
         href="/about"
         className={`hover:text-blue-600 transition-colors ${pathname === "/about" ? "text-blue-600 font-medium" : ""}`}
       >
         About
       </Link>
       <Link
         href="/contact"
         className={`hover:text-blue-600 transition-colors ${pathname === "/contact" ? "text-blue-600 font-medium" : ""}`}
       >
         Contact
       </Link>
     </div>
   </nav>
 );
}

