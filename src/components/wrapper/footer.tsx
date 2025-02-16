"use client"
import {
  FOOTER_LINKS as footerLinks,
  getGridColsClass,
} from "@/src/constants/links"
import { landingPageLogo } from "@/src/constants/logos"
import { footerCRText } from "@/src/constants/text"
import { cn } from "@/src/utils/cn"
import { ArrowRight, Github, Instagram } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data: any) => {
    // Handle newsletter submission
    console.log(data)
    reset()
  }

  const links = footerLinks
  const { image, alt, width, height, text, path } = landingPageLogo[0]
  const footerText = footerCRText()
  const numColumns = Object.keys(links).length
  const gridColsClass = getGridColsClass(numColumns)

  return (
    <footer className='border-t bg-white dark:bg-black'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:pt-16'>
        <div className='xl:grid xl:grid-cols-2 xl:gap-8'>
          {/* Links */}
          <div className='mt-5 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className={cn("md:grid md:gap-8 text-center ", gridColsClass)}>
              {Object.entries(links).map(([section, items]) => (
                <div key={section}>
                  <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </h3>
                  <ul className='mt-4 space-y-4'>
                    {items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              data-type='newsletter'
              className='ml-5 width-full border-l-[1px] border-gray-200 pl-[5rem]'>
              <div>
                <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
                  Stay Updated
                </h3>
                <p className='mt-4 mb-8 text-sm text-gray-600 dark:text-gray-400'>
                  Subscribe to our newsletter for updates, tips, and special
                  offers.
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-4 sm:flex sm:max-w-md'>
                <div className='flex-1'>
                  <Input
                    {...register("email", { required: true })}
                    type='email'
                    placeholder='Enter your email'
                    className='w-full min-w-0 rounded-full border-gray-300'
                  />
                </div>
                <div className='mt-3 sm:ml-3 sm:mt-0'>
                  <Button
                    type='submit'
                    className='w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white'>
                    Subscribe
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-200 dark:border-gray-800 pt-8'>
          <div className='grid grid-cols-3 items-center'>
            <div className='flex space-x-4'>
              <Link
                href='https://github.com/michaelshimeles/nextjs14-starter-template'
                target='_blank'>
                <Button variant='ghost' size='icon'>
                  <Github className='h-5 w-5' />
                </Button>
              </Link>
              <Link href='https://twitter.com' target='_blank'>
                <Button variant='ghost' size='icon'>
                  <Instagram className='h-5 w-5' />
                </Button>
              </Link>
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400 text-center'>
              {footerText.text}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
