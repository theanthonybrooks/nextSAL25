"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Github, Menu, Sparkles, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "../../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { UserProfile } from "../user-profile";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "AI Playground",
    href: "/playground",
    description: "Interact with the AI in the playground.",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Access your personal dashboard.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read my interesting blog posts.",
  },
];

export default function NavBar() {
  const { userId } = useAuth();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-black/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo - Mobile */}
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
                  <span>Next Starter</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                <div className="px-2 pb-4">
                  <h2 className="mb-2 text-sm font-medium text-muted-foreground">
                    Navigation
                  </h2>
                  {components.map((item) => (
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
            <span className="font-semibold">Next Starter</span>
          </Link>
        </div>

        {/* Logo - Desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/" prefetch={true} className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Next Starter</span>
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
                    {components.map((component) => (
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

          <Link href="/dashboard" prefetch={true}>
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/playground" prefetch={true}>
            <Button variant="ghost">AI Playground</Button>
          </Link>
          <Link
            href="https://github.com/michaelshimeles/nextjs14-starter-template"
            prefetch={true}
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
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
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
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
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
