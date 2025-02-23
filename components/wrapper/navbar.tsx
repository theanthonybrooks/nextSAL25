"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { landingPageLogo } from "@/constants/logos";
import {
  landingPageNavbarMenuLinks as components,
  landingPageNavbarLinks,
} from "@/constants/navbars";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog } from "@radix-ui/react-dialog";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Github, Menu, Sparkles, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";

export default function NavBar() {
  const { userId } = useAuth();
  const { image, alt, width, height, text, path } = landingPageLogo[0];
  // Fetch the user's subscription status
  const { subStatus } =
    useQuery(api.subscriptions.getUserSubscriptionStatus) || {};
  const statusKey = subStatus ? subStatus : "none";

  // Filter landingPageNavbarLinks based on the user's subStatus; show link if its sub array includes statusKey or "all"
  const filteredNavbarLinks = landingPageNavbarLinks.filter(
    (link) => link.sub.includes(statusKey) || link.sub.includes("all"),
  );
  const filteredNavbarMenu = components.filter(
    (link) => link.sub.includes(statusKey) || link.sub.includes("all"),
  );

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-50 border-b bg-background backdrop-blur-md dark:bg-background"
    >
      <div className="mx-auto flex max-w-full items-center justify-between p-4 px-5">
        {/* Mobile Logo and Navigation */}
        <div className="flex items-center gap-2 lg:hidden">
          <Dialog>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader className="border-b pb-6">
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  {/* <span>The Street Art List</span> */}
                  <Image
                    src="/saltext.png"
                    alt="The Street Art List"
                    width={100}
                    height={40}
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                <div className="px-2 pb-4">
                  <h2 className="mb-2 text-sm font-medium text-muted-foreground">
                    Navigation
                  </h2>
                  {filteredNavbarMenu.map((item) => (
                    <Link key={item.href} href={item.href} prefetch={true}>
                      <Button
                        variant="ghost"
                        className="mb-2 h-11 w-full justify-start border border-muted/40 text-base font-normal transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                      >
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className="border-t px-2 py-4">
                  <h2 className="mb-2 text-sm font-medium text-muted-foreground">
                    Links
                  </h2>
                  <Link
                    href="https://github.com/michaelshimeles/nextjs14-starter-template"
                    target="_blank"
                    prefetch={true}
                  >
                    <Button
                      variant="ghost"
                      className="mb-2 h-11 w-full justify-start border border-muted/40 text-base font-normal transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                  <Link
                    href="https://twitter.com/rasmickyy"
                    target="_blank"
                    prefetch={true}
                  >
                    <Button
                      variant="ghost"
                      className="mb-2 h-11 w-full justify-start border border-muted/40 text-base font-normal transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                    >
                      <Twitter className="mr-2 h-4 w-4" />X (Twitter)
                    </Button>
                  </Link>
                  <Link
                    href="https://youtube.com/@rasmickyy"
                    target="_blank"
                    prefetch={true}
                  >
                    <Button
                      variant="ghost"
                      className="h-11 w-full justify-start border border-muted/40 text-base font-normal transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      YouTube
                    </Button>
                  </Link>
                </div>
                {!userId && (
                  <div className="mt-auto border-t px-2 py-4">
                    <Link href="/sign-in" prefetch={true}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-500">
                        Sign in
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Dialog>
          <Link href="/" prefetch={true} className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            {/* <span className='font-semibold'>The Street Art List</span> */}
            <Image
              src="/saltext.png"
              alt="The Street Art List"
              width={100}
              height={40}
            />
          </Link>
        </div>

        {/* Desktop Logo */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link href={path} prefetch={true} className="flex items-center gap-2">
            {/* <Image src={image} alt={alt} width={width} height={height} /> */}
            {/* <span className='font-semibold'>{text}</span> */}
            <Image
              src="/saltext.png"
              alt="The Street Art List"
              width={175}
              height={80}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {filteredNavbarMenu.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {filteredNavbarLinks.map((link) => (
            <Link key={link.title} href={link.href} prefetch={true}>
              {!link.isIcon ? (
                <Button variant="ghost">{link.title}</Button>
              ) : (
                <Button variant="ghost" size="icon">
                  {link.icon}
                </Button>
              )}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}
          <ThemeToggle />
          {/* <Switch darkMode={true} /> */}
          {!userId && (
            <Link href="/sign-in" prefetch={true}>
              <Button
                variant="default"
                className="bg-blue-600 text-white hover:bg-blue-500"
              >
                Sign in
              </Button>
            </Link>
          )}
          {userId && <UserProfile />}
        </div>
      </div>
    </motion.div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
