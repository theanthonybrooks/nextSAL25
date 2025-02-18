import {
  Banana,
  CreditCard,
  Github,
  HelpCircle,
  HomeIcon,
  Instagram,
  LucideIcon,
  Settings,
  Twitter,
  User,
} from "lucide-react"
import { TbBrandPatreon } from "react-icons/tb"

import { JSX } from "react"

export type MenuProps = {
  id: number
  label: string
  icon: JSX.Element
  path: string
  section?: boolean
  integration?: boolean
}
export type SocialProps = {
  label: string
  icon: JSX.Element
  path: string
}

interface LinkItem {
  name: string
  href: string
}

type Links = Record<string, LinkItem[]>

export const LANDING_PAGE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "Home",
    icon: <HomeIcon />,
    path: "/",
    section: true,
  },
  {
    id: 1,
    label: "Pricing",
    icon: <CreditCard />,
    path: "/pricing",
    section: true,
  },
  {
    id: 2,
    label: "Explore",
    icon: <Banana />,
    path: "#explore",
    section: true,
  },
]

export const FOOTER_LINKS: Links = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Documentation", href: "/docs" },
    { name: "Examples", href: "/examples" },
    { name: "Pricing", href: "/pricing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Changelog", href: "/changelog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "License", href: "/license" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com/theanthonybrooks" },
    { name: "Instagram", href: "https://www.instagram.com/theanthonybrooks" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/theanthonybrooks" },
    { name: "GitHub", href: "https://github.com/theanthonybrooks" },
  ],
}

// note-to-self: Helper function to get the grid column class based on the number of columns in the FOOTER_LINKS object

export const getGridColsClass = (numColumns: number): string => {
  const gridColsClass =
    {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
    }[numColumns] || "md:grid-cols-4"

  return gridColsClass
}

//TODO: Make a specific social media component that has props for the class and icon (and... else?)

export const SOCIAL_MEDIA_LINKS: SocialProps[] = [
  {
    label: "Twitter",
    icon: <Twitter className='h-5 w-5' />,
    path: "https://twitter.com/theanthonybrooks",
  },
  {
    label: "Instagram",
    icon: <Instagram className='h-5 w-5' />,
    path: "https://www.instagram.com/theanthonybrooks",
  },
  {
    label: "GitHub",
    icon: <Github className='h-5 w-5' />,
    path: "https://github.com/theanthonybrooks",
  },
  {
    label: "Patreon",
    icon: <TbBrandPatreon className='h-5 w-5' />,
    path: "https://www.patreon.com/thestreetartlist",
  },
]
interface DashNavItem {
  label: string
  href: string
  icon: LucideIcon
  sub: string[] // Change sub to an array of strings
}

export const dashboardNavItems: DashNavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: HomeIcon,
    sub: ["active", "trialing"], // Visible to active, trialing users, and everyone
  },
  {
    label: "Account",
    href: "/dashboard/account",
    icon: User,
    sub: ["active", "trialing"], // Visible to active and trialing users
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    sub: ["active", "trialing"], // Visible to active users only
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    sub: ["active", "trialing", "cancelled"], // Visible to cancelled users only
  },
  {
    label: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
    sub: ["all"], // Visible to everyone
  },
]
