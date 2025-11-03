"use client";

import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null; // Do not render Footer on sign-in and sign-up pages
  }
  
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Life-ID</h2>
          <p className="text-gray-400">
            Empowering population data, demographics, and blood info for
            everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-blue-500">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
          <p className="text-gray-400">Email: support@lifeid.com</p>
          <div className="flex gap-4 mt-4">
            <Link href="#" className="hover:text-blue-500">
              Facebook
            </Link>
            <Link href="#" className="hover:text-blue-500">
              Twitter
            </Link>
            <Link href="#" className="hover:text-blue-500">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Life-ID. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
