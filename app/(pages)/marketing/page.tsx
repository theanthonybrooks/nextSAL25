import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video-player";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  keywords: [""],
  title: "Marketing page",
  openGraph: {
    description: "Put description of the page.",
    images: [""],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing page",
    description: "Put description of the page.",
    siteId: "",
    creator: "@rasmickyy",
    creatorId: "",
    images: [""],
  },
};

export default async function MarketingPage() {
  return (
    <PageWrapper>
      <div className="mt-[2.5rem] flex min-h-screen w-full flex-col items-center p-3">
        <h1 className="max-w-[600px] scroll-m-20 text-center text-5xl font-bold tracking-tight">
          Example Marketing Page with Video & CTA
        </h1>
        <p className="mx-auto mt-2 max-w-[600px] text-center text-gray-500 dark:text-gray-400 md:text-lg">
          Use this static page to have an explainer video with CTA and some
          copy. Great for marketing your product and getting sales.
        </p>
        <div className="mt-2 flex gap-2">
          <Link href="/dashboard" prefetch={true} className="mt-2">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/dashboard" prefetch={true} className="mt-2">
            <Button size="lg" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="mb-3 mt-[1.5rem] w-full max-w-[900px]">
          <VideoPlayer videoSrc="https://utfs.io/f/08b0a37f-afd7-4623-b5cc-e85184528fce-1f02.mp4" />
        </div>
        <div className="mb-[2rem] flex min-h-screen max-w-[900px] flex-col items-center">
          <article className="mx-auto w-full pb-8">
            <h1 className="mb-6 text-3xl font-bold lg:text-4xl">
              Lorem ipsum dolor sit amet
            </h1>

            <section className="mb-8">
              <p className="text-md leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-3 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-3 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <ol className="mb-4 ml-8 flex list-decimal flex-col gap-1">
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="mb-3 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <ul className="mb-4 ml-8 flex list-disc flex-col gap-1">
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-3 mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
          </article>
        </div>
      </div>
    </PageWrapper>
  );
}
