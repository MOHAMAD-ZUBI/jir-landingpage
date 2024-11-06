"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function App() {
  return (
    <div className="max-w-[1500px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            INVESTMENT HEDGING
          </p>
          <h4 className="text-white font-medium text-large">
            Discover underperforming risky investments in your portfolio and
            protect it during downtrend
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="https://as2.ftcdn.net/v2/jpg/01/33/65/89/1000_F_133658912_lzJL7ZoZ1PHSX7PzQgrGWyOZSBv1HGbs.jpg"
        />
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            NSTANT COMPANY VALUATION
          </p>
          <h4 className="text-white font-medium text-large">
            Obtain automated local company value using AI/Machine Learning and
            local market/industry data
          </h4>
        </CardHeader>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-[1]"></div>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover opacity-50"
            src="https://as1.ftcdn.net/v2/jpg/03/81/68/18/1000_F_381681893_yD17WGx5lrkj9fbIuU2TtgtHXGgEjouY.jpg"
          />
        </div>
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-xl text-white uppercase font-bold">
            COMPANY BENCHMARKING
          </p>
        </CardHeader>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-[1]"></div>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover opacity-50"
            src="https://cdn.prod.website-files.com/606e615a0e2589f2e7699556/670982ea31921a16de4ce351_competitive-benchmarking-header.jpg"
          />
        </div>
      </Card>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-xl text-white uppercase font-bold">
            Company Risk Scoring
          </p>
        </CardHeader>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-[1]"></div>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover opacity-50"
            src="https://financialcrimeacademy.org/wp-content/uploads/2022/04/3-1-1024x576.jpg"
          />
        </div>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-white  text-md">
              Obtain live risk score for your local company using AI risk
              algorithm and local market/industry data
            </p>
          </div>
        </CardFooter>
      </Card>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            Team of experts
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            Backed by a team of CFA charterholders, investment professionals and
            IT gurus
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="https://www.strategy-business.com/media/image/44271306_thumb5_690x400.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <h2 className="text-white text-xl">JIR</h2>
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Ventures Group</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Get The App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
