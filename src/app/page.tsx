import CurtainHero from "@/components/Hero/CurtainHero";
import Process from "@/components/sections/Process";
import AboutPage from "@/app/about/page";
import ServicesPage from "@/app/services/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-x-clip w-full max-w-[100vw] bg-transparent">
      
      {/* Page Content Layers */}
      <div className="relative w-full flex flex-col">
        <CurtainHero />
        <AboutPage />
        <ServicesPage />
        <Process />
      </div>

    </main>
  );
}
