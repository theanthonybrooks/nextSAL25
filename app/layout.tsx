import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import StoreUserWrapper from "@/components/wrapper/state-wrapper";
import ConvexProvider from "@/providers/convexClerkProvider";
import { PostHogProvider } from "@/providers/posthogProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

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
    creator: "@imanthonybrooks",
    creatorId: "",
    images: [
      "https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <PostHogProvider>
            <ConvexProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                storageKey="theme"
              >
                <StoreUserWrapper> {children}</StoreUserWrapper>
                <Toaster />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </ThemeProvider>
            </ConvexProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
