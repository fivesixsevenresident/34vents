"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
        pathname === href
          ? "text-blue-600 dark:text-blue-400 font-medium"
          : "text-gray-700 dark:text-gray-300"
      }`}
    >
      {children}
    </Link>
  );
}
