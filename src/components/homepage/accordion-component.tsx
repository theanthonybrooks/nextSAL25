"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"
import { AccordionSection } from "@/src/constants/accordions"
import { HelpCircle } from "lucide-react"
import { motion } from "motion/react"

interface AccordionComponentProps {
  src: AccordionSection
}

export function AccordionComponent({ src }: AccordionComponentProps) {
  const defaultValue = src.firstOpen ? "item-1" : undefined

  return (
    <section className='py-24 px-4 accordion-cont'>
      <div className='max-w-[80vw] mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-center ${src.title ? "mb-16" : "mb-4"}`}>
          {/* Pill badge */}
          {src.name && (
            <div className='mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6'>
              <div className='flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200'>
                <HelpCircle className='h-4 w-4' />
                <span>{src.name}</span>
              </div>
            </div>
          )}

          {src.title && (
            <h2 className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2'>
              {src.title}
            </h2>
          )}
          {src.description && (
            <p className='text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto'>
              {src.description}
            </p>
          )}
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='flex justify-center'>
          <Accordion
            type='single'
            collapsible
            className={`${src.accordionWidth ? src.accordionWidth : "w-[50vw]"}`}
            defaultValue={defaultValue}>
            {src.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className='border border-gray-200 dark:border-gray-800 rounded-lg mb-4 px-2'>
                <AccordionTrigger
                  className='hover:no-underline py-4 px-2'
                  iconOpen={src.iconOpen}
                  iconClosed={src.iconClosed}
                  icon={src.icon}>
                  <span className='font-medium text-left text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors pr-3'>
                    {item.subtitle}
                  </span>
                </AccordionTrigger>
                <AccordionContent className='px-2 pb-4'>
                  {Array.isArray(item.text) && src.isList ? (
                    <ul className={`${src.listStyle} list-inside`}>
                      {item.text.map((entry, i) => (
                        <li
                          key={i}
                          className='text-gray-600 dark:text-gray-300 mb-3'>
                          {entry}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-600 dark:text-gray-300'>
                      {item.text}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
