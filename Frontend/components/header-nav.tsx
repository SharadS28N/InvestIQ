import * as React from "react";
import Link from "next/link";
import { LineChart, Menu } from "lucide-react";
import { ClientAuthCheck } from "@/components/client-auth-check";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";

function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu Button (Left) */}
        <div className="md:hidden flex-1 flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] h-full flex items-center justify-center" aria-label="Navigation Menu">
              <nav className="flex flex-col gap-4 items-center text-center">
                <SheetClose asChild>
                  <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
                    Features
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
                    Pricing
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
                    Contact
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Logo (Centered on mobile) */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link href="/landing" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <LineChart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="font-semibold text-xl text-primary">
              InvestIQ
            </div>
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* Client-side auth check */}
          <ClientAuthCheck />
        </div>
      </div>
    </header>
  );
}

export default HeaderNav;
