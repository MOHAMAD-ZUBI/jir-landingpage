import Featrues from "../components/main/Featrues";
import GetStarted from "../components/main/GetStarted";
import Hero from "../components/main/Hero";
import Partners from "../components/main/Partners";
import Pricing from "../components/main/PricingV2";

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
        <GetStarted />
      </div>
    </main>
  );
}
