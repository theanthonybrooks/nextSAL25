import { AccordionComponent } from "@/src/components/homepage/accordion-component"
import HeroSection from "@/src/components/homepage/hero-section"
import MarketingCards from "@/src/components/homepage/marketing-cards"
import Pricing from "@/src/components/homepage/pricing"
import SideBySide from "@/src/components/homepage/side-by-side"
import { faqs2 } from "@/src/constants/accordions"
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
