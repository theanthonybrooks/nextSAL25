"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do I get access to this landing page in the starter kit?",
    answer:
      "Yes, this page isn't even a real landing page more so a template for you to build on.",
  },
  {
    question: "Is the starter kit regularly updated?",
    answer:
      "Yes, we continuously update the starter kit with the latest features, security patches, and best practices to ensure you're always working with cutting-edge technology.",
  },
  {
    question: "Can I use this for commercial projects?",
    answer:
      "Absolutely! The starter kit comes with a commercial license, allowing you to use it in both personal and commercial projects without any restrictions.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer comprehensive support through our Discord community, where you can get help from both our team and other developers using the starter kit.",
  },
];

export function AccordionComponent() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          {/* Pill badge */}
          <div className="mx-auto mb-6 w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-1 dark:border-blue-900 dark:bg-blue-900/30">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
          </div>

          <h2 className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text pb-2 text-3xl font-bold text-transparent dark:from-white dark:via-blue-300 dark:to-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Everything you need to know about the Next.js Starter Kit.
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            team.
          </p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="mb-4 rounded-lg border border-gray-200 px-2 dark:border-gray-800"
              >
                <AccordionTrigger className="px-2 py-4 hover:no-underline">
                  <span className="text-left font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
