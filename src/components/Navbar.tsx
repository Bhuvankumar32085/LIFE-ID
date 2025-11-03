"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react"; // optional icon
import { useUser } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/clerk-react";
// import BloodConsent from "./IfUserWantShareBlood";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((store: RootState) => store.user);

  // console.log("User in Navbar:", user);

  const navItems = [{ name: "Home", href: "/" }];
  if (isSignedIn) {
    navItems.push({ name: "Dashboard", href: "/dashboard" });
  }
  if (pathname === "/dashboard" && isSignedIn) {
    navItems.push({ name: "blood-request", href: "/blood-request" });
  }
  if (isSignedIn && user) {
    navItems.push({ name: "Profile", href: `/user-profile` });
    navItems.push({ name: "Card", href: `/UserBloodRequests` });
  }

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Life-ID
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {pathname !== "/sign-in" &&
            pathname !== "/sign-up" &&
            isSignedIn === false && (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign-in")}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </>
            )}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-4 px-6 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {pathname !== "/sign-in" &&
              pathname !== "/sign-up" &&
              isSignedIn === false && (
                <>
                  <li>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        router.push("/sign-in");
                        setIsOpen(false);
                      }}
                    >
                      Login
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        router.push("/sign-up");
                        setIsOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </li>
                </>
              )}

            <div className="flex justify-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
