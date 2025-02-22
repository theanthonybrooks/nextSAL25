import { AccordionComponent } from "@/components/homepage/accordion-component"
import HeroSection from "@/components/homepage/hero-section"
import MarketingCards from "@/components/homepage/marketing-cards"
import Pricing from "@/components/homepage/pricing"
import SideBySide from "@/components/homepage/side-by-side"
import { faqs2 } from "@/constants/accordions"
export default function Home() {
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full mt-[1rem] p-3'>
        <HeroSection />
      </div>
      <SideBySide />
      <MarketingCards />
      <Pricing />
      <AccordionComponent src={faqs2} />
    </>
  )
}
