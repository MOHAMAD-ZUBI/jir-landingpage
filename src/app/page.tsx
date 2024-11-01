import Image from "next/image";
import Hero from "./components/main/Hero";
import GridSmallBackgroundDemo from "./components/ui/GridBg";
import Partners from "./components/main/Partners";

export default function Home() {
  return (
    <main className="relative ">
      <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen">
        <Hero />
        <Partners />
      </div>
    </main>
  );
}
