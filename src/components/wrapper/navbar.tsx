"use client"

import { api } from "@/convex/_generated/api"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu"
import ThemeToggle from "@/src/components/ui/theme-toggle"
import { landingPageLogo } from "@/src/constants/logos"
import {
  landingPageNavbarMenuLinks as components,
  landingPageNavbarLinks,
} from "@/src/constants/navbars"
import { cn } from "@/src/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { Dialog } from "@radix-ui/react-dialog"
import { useQuery } from "convex/react"
import { motion } from "framer-motion"
import { Github, Menu, Sparkles, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { UserProfile } from "../user-profile"

export default function NavBar() {
  const { userId } = useAuth()
  const { image, alt, width, height, text, path } = landingPageLogo[0]
  // Fetch the user's subscription status
  const { subStatus } =
    useQuery(api.subscriptions.getUserSubscriptionStatus) || {}
  const statusKey = subStatus ? subStatus : "none"

  // Filter landingPageNavbarLinks based on the user's subStatus; show link if its sub array includes statusKey or "all"
  const filteredNavbarLinks = landingPageNavbarLinks.filter(
    (link) => link.sub.includes(statusKey) || link.sub.includes("all")
  )
  const filteredNavbarMenu = components.filter(
    (link) => link.sub.includes(statusKey) || link.sub.includes("all")
  )

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-white/80 dark:bg-black/80'>
      <div className='flex items-center justify-between p-4 max-w-7xl mx-auto'>
        {/* Mobile Logo and Navigation */}
        <div className='flex lg:hidden items-center gap-2'>
          <Dialog>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='lg:hidden'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px]'>
              <SheetHeader className='pb-6 border-b'>
                <SheetTitle className='flex items-center gap-2'>
                  <Sparkles className='h-5 w-5 text-blue-600' />
                  <span>The Street Art List</span>
                </SheetTitle>
              </SheetHeader>
              <div className='flex flex-col gap-1 mt-6'>
                <div className='px-2 pb-4'>
                  <h2 className='text-sm font-medium text-muted-foreground mb-2'>
                    Navigation
                  </h2>
                  {filteredNavbarMenu.map((item) => (
                    <Link key={item.href} href={item.href} prefetch={true}>
                      <Button
                        variant='ghost'
                        className='w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors'>
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className='px-2 py-4 border-t'>
                  <h2 className='text-sm font-medium text-muted-foreground mb-2'>
                    Links
                  </h2>
                  <Link
                    href='https://github.com/michaelshimeles/nextjs14-starter-template'
                    target='_blank'
                    prefetch={true}>
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors'>
                      <Github className='h-4 w-4 mr-2' />
                      GitHub
                    </Button>
                  </Link>
                  <Link
                    href='https://twitter.com/rasmickyy'
                    target='_blank'
                    prefetch={true}>
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors'>
                      <Twitter className='h-4 w-4 mr-2' />X (Twitter)
                    </Button>
                  </Link>
                  <Link
                    href='https://youtube.com/@rasmickyy'
                    target='_blank'
                    prefetch={true}>
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-base font-normal h-11 border border-muted/40 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors'>
                      <Youtube className='h-4 w-4 mr-2' />
                      YouTube
                    </Button>
                  </Link>
                </div>
                {!userId && (
                  <div className='px-2 py-4 border-t mt-auto'>
                    <Link href='/sign-in' prefetch={true}>
                      <Button className='w-full bg-blue-600 hover:bg-blue-500'>
                        Sign in
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Dialog>
          <Link href='/' prefetch={true} className='flex items-center gap-2'>
            <Sparkles className='h-5 w-5 text-blue-600' />
            <span className='font-semibold'>The Street Art List</span>
          </Link>
        </div>

        {/* Desktop Logo */}
        <div className='hidden lg:flex items-center gap-2'>
          <Link href={path} prefetch={true} className='flex items-center gap-2'>
            <Image src={image} alt={alt} width={width} height={height} />
            <span className='font-semibold'>{text}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-6'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                    {filteredNavbarMenu.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}>
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
                <Button variant='ghost'>{link.title}</Button>
              ) : (
                <Button variant='ghost' size='icon'>
                  {link.icon}
                </Button>
              )}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-2'>
          {/* <ModeToggle /> */}
          <ThemeToggle />
          {!userId && (
            <Link href='/sign-in' prefetch={true}>
              <Button
                variant='default'
                className='bg-blue-600 hover:bg-blue-500 text-white'>
                Sign in
              </Button>
            </Link>
          )}
          {userId && <UserProfile />}
        </div>
      </div>
    </motion.div>
  )
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
            className
          )}
          {...props}>
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
