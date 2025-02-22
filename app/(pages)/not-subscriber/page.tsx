"use client";

import Pricing from "@/components/homepage/pricing";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotSubscriber() {
  return (
    <PageWrapper>
      <section
        className="relative flex flex-col items-center justify-center py-20"
        aria-label="Not Subscriber Hero"
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
              <span>Unlock Premium Features</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="animate-gradient-x bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text pb-2 text-4xl font-bold tracking-tight text-transparent dark:from-white dark:via-blue-300 dark:to-white md:text-6xl lg:text-7xl"
          >
            Take Your Experience <br className="hidden sm:block" />
            to the Next Level
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400 md:text-xl"
          >
            Get unlimited access to all premium features and tools to enhance
            your workflow
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="#pricing">
              <Button size="lg" className="gap-2">
                View Plans
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 pt-12 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:via-blue-300 dark:to-white sm:text-4xl"
            >
              Everything you need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
            >
              Subscribe today to unlock premium features and take your
              experience to the next level.
            </motion.p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="flex flex-col"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="pricing" className="pb-[5rem]">
        <Pricing />
      </section>
    </PageWrapper>
  );
}

const features = [
  {
    name: "Premium Features",
    description:
      "Access all premium features and tools to enhance your workflow.",
    icon: Sparkles,
  },
  {
    name: "Priority Support",
    description:
      "Get priority access to our support team and quick response times.",
    icon: Sparkles,
  },
  {
    name: "Regular Updates",
    description:
      "Stay ahead with early access to new features and improvements.",
    icon: Sparkles,
  },
];
