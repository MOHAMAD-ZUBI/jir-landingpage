import React from "react";
import GridSmallBackgroundDemo from "../ui/GridBg";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-row max-md:flex-col max-md:items-center justify-between max-w-[1500px] w-full mt-24 mx-auto px-8 ">
      <div className="flex-1 pr-12">
        <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Welcome to JIR
          <span className="block">The AI-powered platform</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          JIR is a platform for managing your business with powerful tools and
          integrations.
        </p>
        <div className="flex flex-col gap-2">
          <div className=" text-xl text-gray-600">
            <span className=" text-blue-400 font-bold">-</span> Turn notebooks
            into powerful data apps and dashboards
          </div>
          <div className=" text-xl text-gray-600">
            <span className=" text-blue-400 font-bold">-</span> Integrate with
            your favorite tools
          </div>
          <div className=" text-xl text-gray-600">
            <span className=" text-blue-400 font-bold">-</span> Automate your
            workflows
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button className="bg-blue-500 hover:bg-blue-400 ease-in-out duration-300 text-white px-6 py-3 rounded-lg font-medium">
            Get started – it's free
          </button>
          <button className="border border-gray-300 px-6 py-3 hover:bg-gray-100 ease-in-out duration-300 rounded-lg font-medium">
            Book a demo
          </button>
        </div>
      </div>
      <div className="flex-1 relative border-2 border-gray-300 w-full max-md:mt-8 aspect-video rounded-xl overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./vids/deepnote_demo2.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default Hero;
