"use client"

import { api } from "@/convex/_generated/api"
import { dashboardNavItems as navItems } from "@/src/constants/links"
import { landingPageLogo } from "@/src/constants/logos"
import clsx from "clsx"
import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function DashboardSideBar() {
  const { image, alt, width, height, text, path } = landingPageLogo[0]
  const pathname = usePathname()

  const { subStatus } =
    useQuery(api.subscriptions.getUserSubscriptionStatus) || {}
  const statusKey = subStatus ? subStatus : "none"

  // Filter nav items based on user's subscription status
  const filteredNavItems = navItems.filter(
    (item) => item.sub.includes(statusKey) || item.sub.includes("all")
  )

  return (
    <div className='min-[1024px]:block hidden w-64 border-r h-full bg-background'>
      <div className='flex h-full flex-col'>
        <div className='flex h-[3.45rem] items-center border-b px-4'>
          <Link
            prefetch={true}
            className='flex items-center gap-2 font-semibold hover:cursor-pointer'
            href='/'>
            {" "}
            <Image src={image} alt={alt} width={width} height={height} /> The
            Street Art List
          </Link>
        </div>

        <nav className='flex-1 space-y-1 p-4'>
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              prefetch={true}
              href={item.href}
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
              <item.icon className='h-4 w-4' />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
