"use client";
import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-20"
      aria-label="Nextjs Starter Kit Hero"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-black">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px] dark:bg-blue-500"></div>
      </div>

      <div className="max-w-4xl space-y-6 px-4 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-1 dark:border-blue-900 dark:bg-blue-900/30"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
            <Sparkles className="h-4 w-4" />
            <span>The Ultimate Next.js Starter Kit</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="animate-gradient-x bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text pb-2 text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-blue-300 dark:to-white md:text-6xl lg:text-7xl"
        >
          Build Faster with <br className="hidden sm:block" />
          Next Starter
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl"
        >
          Launch your SaaS in minutes with our production-ready Next.js starter
          kit. Everything you need, from auth to payments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-12 rounded-full bg-blue-600 px-8 text-white hover:bg-blue-500"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link
            href="https://discord.gg/HUcHdrrDgY"
            target="_blank"
            aria-label="Join Discord (opens in a new tab)"
          >
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-2 px-8"
            >
              Join Discord
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>

          <Link
            href="https://github.com/michaelshimeles/nextjs14-starter-template"
            target="_blank"
            className="flex h-12 items-center gap-2 rounded-full border-2 px-6 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="View on GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
            <span>Star on GitHub</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
