import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import ImageSequence from "@/components/ui/ImageSequence";
import AboutPage from "@/app/about/page";
import ServicesPage from "@/app/services/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-x-hidden w-full max-w-[100vw]">
      <ImageSequence />
      <Hero />
      <AboutPage />
      <ServicesPage />
      <Process />
    </main>
  );
}
