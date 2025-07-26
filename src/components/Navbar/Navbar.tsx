"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Asterisk } from "lucide-react";

type NavbarProps = {
  // if the user has not logged in, then the value is null
  user?: string | null;
};

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - brand and primary nav links */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Asterisk className="h-8 w-8 text-[#00FF3C]" />
            <span className="text-xl font-bold text-[#00FF3C]">U-Pro</span>
          </Link>

          {/* Primary nav links */}
          <ul className="hidden items-center gap-10 md:flex">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-base text-white hover:text-[#00FF3C]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-1 text-base text-white hover:text-[#00FF3C]"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-1 text-base text-white hover:text-[#00FF3C]"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-1 text-base text-white hover:text-[#00FF3C]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right - secondary actions */}
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="hidden text-white hover:text-[#00FF3C] md:inline"
          >
            Download app
          </Link>

          {/* Vertical divider */}
          <span className="hidden h-5 w-px bg-white/20 md:inline-block" />

          <Link
            href="/auth?mode=signin"
            className="text-white hover:text-[#00FF3C]"
          >
            {user ? user : "Log in"}
          </Link>

          <Button
            asChild
            className="rounded-full bg-[#00FF3C] px-6 py-2 text-black hover:bg-[#00e636]"
          >
            <Link href="/auth?mode=signup">Try it free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
