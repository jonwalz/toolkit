"use client";

import { useState } from "react";

import { MainNavItem } from "@/types";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleShowMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <div className="flex items-center gap-2">
      {children}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={handleShowMobileMenu}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo className="max-w-4" />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && <MobileNav items={items} />}
    </div>
  );
}
