import Image from "next/image";
import Hero from "./components/main/Hero";
import GridSmallBackgroundDemo from "./components/ui/GridBg";
import Partners from "./components/main/Partners";
import PricingCard from "./components/reusable/PricingCard";
import Pricing from "./components/main/Pricing";
import Featrues from "./components/main/Featrues";
import Test from "./components/reusable/Services";
import ServicesGrid from "./components/reusable/ServicesGrid";

export default function Home() {
  return (
    <main className="relative ">
      <div className="grid grid-rows-[1fr] space-y-64 items-center justify-items-center  min-h-screen">
        <Hero />
        <Partners />
        <Featrues />
        {/* <ServicesGrid /> */}
        {/* <Test /> */}
        <Pricing />
      </div>
    </main>
  );
}
