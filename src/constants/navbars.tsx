import { Github } from "lucide-react"
import { JSX } from "react"

export const landingPageNavbarMenuLinks: {
  title: string
  href: string
  description: string
  isIcon?: boolean
  sub: string[]
}[] = [
  {
    title: "The List",
    href: "/thelist",
    description: "View all current open calls & events.",
    sub: ["active", "trialing"],
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Access your personal dashboard.",
    sub: ["active", "trialing"],
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read my interesting blog posts.",
    sub: ["all"],
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Read my interesting blog posts.",
    sub: ["all"],
  },
  {
    title: "Smog",
    href: "/smog",
    description: "Read my interesting blog posts.",
    sub: ["admin"],
  },
]

export const landingPageNavbarLinks: {
  title: string
  href: string
  description: string
  icon?: JSX.Element
  isIcon?: boolean
  target?: string
  sub: string[]
}[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Access your personal dashboard.",
    sub: ["active", "trialing"],
  },
  {
    title: "The List",
    href: "/thelist",
    description: "View all current open calls & events.",
    sub: ["active", "trialing"],
  },
  {
    title: "The Archive",
    href: "/archive",
    description: "View all current open calls & events.",
    sub: ["all"],
  },
  {
    title: "Map",
    href: "/map",
    description: "View all current open calls & events.",
    sub: ["all"],
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    description: "View your subscription details.",
    sub: ["cancelled"],
  },

  {
    title: "Github",
    href: "https://github.com/theanthonybrooks",
    description: "View my Github profile.",
    icon: <Github className='h-5 w-5' />,
    isIcon: true,
    sub: ["all"],
  },
]
