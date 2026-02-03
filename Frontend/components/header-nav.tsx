 "use client";
 
 import * as React from "react";
 import Link from "next/link";
 import { LineChart, Menu, BarChart3, TrendingUp, Sparkles } from "lucide-react";
 import { ClientAuthCheck } from "@/components/client-auth-check";
 import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

import { cn } from "@/lib/utils";

interface HeaderNavProps {
  className?: string;
  beforeLogo?: React.ReactNode;
  hideMobileMenu?: boolean;
}

function HeaderNav({ className, beforeLogo, hideMobileMenu }: HeaderNavProps) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 w-full bg-transparent", className)}>
      <div className="w-full px-3 sm:px-4 py-2">
        <div className="h-12 md:h-14 grid grid-cols-[auto_1fr_auto] items-center w-full px-4">
        <div className="flex items-center">
          {!hideMobileMenu && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="h-full w-[72vw] sm:w-[300px] max-w-[320px] p-0 bg-background"
                  aria-label="Navigation Menu"
                >
                  <div className="flex h-full flex-col">
                    <div className="px-5 pt-5 pb-4 border-b">
                      <Link href="/" className="flex items-center gap-2">
                        <div className="rounded-md bg-primary p-1">
                          <LineChart className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div className="font-semibold text-lg text-primary">InvestIQ</div>
                      </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 py-3">
                      <div className="space-y-1">
                        <SheetClose asChild>
                          <Link href="/features" className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:translate-x-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]">
                            <Sparkles className="h-4 w-4 group-hover:text-primary-foreground" />
                            <span>Features</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/pricing" className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:translate-x-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]">
                            <BarChart3 className="h-4 w-4 group-hover:text-primary-foreground" />
                            <span>Pricing</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/about" className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:translate-x-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]">
                            <TrendingUp className="h-4 w-4 group-hover:text-primary-foreground" />
                            <span>About</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/contact" className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:translate-x-[2px] hover:bg-primary hover:text-primary-foreground hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]">
                            <LineChart className="h-4 w-4 group-hover:text-primary-foreground" />
                            <span>Contact</span>
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                    <div className="border-t p-4">
                      <ClientAuthCheck />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
          {beforeLogo}
          <Link href="/" className="hidden md:flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <LineChart className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-foreground" />
            </div>
            <div className="font-semibold text-lg sm:text-xl lg:text-2xl text-primary">
              InvestIQ
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 justify-center">
            <Link href="/features" className="text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out transform hover:scale-[1.02] rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out transform hover:scale-[1.02] rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out transform hover:scale-[1.02] rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out transform hover:scale-[1.02] rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground">
              Contact
            </Link>
          </nav>
          <Link href="/" className="flex md:hidden items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <LineChart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-semibold text-lg text-primary">InvestIQ</div>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-end pr-2 md:pr-4 gap-2">
          <ThemeToggle />
          <ClientAuthCheck />
        </div>
       </div>
     </div>
    </header>
  );
}

export default HeaderNav;










