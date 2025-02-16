import { Github } from "lucide-react"
import { JSX } from "react"

export const landingPageNavbarMenuLinks: {
  title: string
  href: string
  description: string
  isIcon?: boolean
}[] = [
  {
    title: "The List",
    href: "/thelist",
    description: "View all current open calls & events.",
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
  {
    title: "Bog",
    href: "/blog",
    description: "Read my interesting blog posts.",
  },
]

export const landingPageNavbarLinks: {
  title: string
  href: string
  description: string
  icon?: JSX.Element
  isIcon?: boolean
  target?: string
}[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Access your personal dashboard.",
  },
  {
    title: "The List",
    href: "/thelist",
    description: "View all current open calls & events.",
  },
  {
    title: "Github",
    href: "https://github.com/theanthonybrooks",
    description: "View my Github profile.",
    icon: <Github className='h-5 w-5' />,
    isIcon: true,
  },
]
