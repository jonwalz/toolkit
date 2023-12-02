"use client"
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation"

export const Nav = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // TODO: This should be a form
  return (
    <Navbar position="static" maxWidth="full">
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          Writer's Toolkit
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
        <NavbarItem>
          <Button onClick={handleLogout} color="primary" variant="flat">
            Log out 
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
