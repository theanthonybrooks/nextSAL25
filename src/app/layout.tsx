import { ThemeProvider } from "@/src/components/theme-provider"
import { Toaster } from "@/src/components/ui/sonner"
import StateWrapper from "@/src/components/wrapper/state-wrapper"
import Provider from "@/src/providers/clerkProvider"
import { PostHogProvider } from "@/src/providers/posthogProvider"
import { ClerkProvider } from "@clerk/nextjs"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://nextstarter.xyz/"),
  title: {
    default: "The Street Art List",
    template: `%s | The Street Art List`,
  },
  description:
    "The Ultimate Nextjs 15 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters",
  openGraph: {
    description:
      "The Ultimate Nextjs 15 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters",
    images: [
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
    url: "https://nextstarter.xyz/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nextjs Starter Kit",
    description:
      "The Ultimate Nextjs 15 Starter Kit for quickly building your SaaS, giving you time to focus on what really matters",
    siteId: "",
    creator: "@rasmickyy",
    creatorId: "",
    images: [
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider dynamic>
      <html lang='en' suppressHydrationWarning>
        <body className={GeistSans.className}>
          <PostHogProvider>
            <Provider>
              <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                enableSystem
                disableTransitionOnChange>
                <StateWrapper> {children}</StateWrapper>
                <Toaster />
              </ThemeProvider>
            </Provider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
