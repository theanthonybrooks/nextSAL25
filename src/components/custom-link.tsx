"use client"

import { cn } from "@/src/lib/utils"
import { redirect } from "next/navigation"

interface CustomLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string
  children: React.ReactNode
}

export default function CustomLink({
  children,
  href,
  className,
  ...props
}: CustomLinkProps) {
  return (
    <div
      onMouseDown={() => redirect(href)}
      className={cn("hover:cursor-pointer", className)}
      {...props}>
      {children}
    </div>
  )
}
