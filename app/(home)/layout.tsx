// "use client"
import Footer from "../../components/wrapper/footer"
import NavBar from "../../components/wrapper/navbar"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <main className='flex min-w-screen min-h-screen flex-col pt-[4rem] items-center  justify-between'>
        <div className='absolute z-[-99] pointer-events-none inset-0 flex items-center justify-center '></div>
        {children}
      </main>
      <Footer />
    </>
  )
}
