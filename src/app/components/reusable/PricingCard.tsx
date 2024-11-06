"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

type Props = {
  isMiddle?: boolean;
};

const PricingCard = (props: Props) => {
  return (
    <div
      className={` hover:border-2 hover:border-blue-500 hover:shadow-md ease-in-out duration-300 rounded-xl max-w-[400px] w-full h-[600px] p-8 ${
        props?.isMiddle ? "border-2 border-blue-500 shadow-md" : ""
      }`}
    >
      <div className="flex w-full flex-col items-start h-full justify-between">
        <div className="space-y-4 w-full">
          <h2 className="text-xl font-bold">Free Plan</h2>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <div className=" flex flex-row items-end space-x-1">
            <span className="text-3xl font-bold text-blue-500">$43</span>
            <span className="text-xl ">per editor/month (billed yearly)</span>
          </div>
          <div className="w-full h-[1px] bg-gray-300" />
          <div className="flex flex-col items-start space-y-2">
            <h2 className="text-lg font-bold">Features</h2>
            <p className="text-md text-gray-500 flex flex-row items-center ">
              <IoCheckmarkSharp size={18} className="text-blue-500 mr-2" />{" "}
              Unlimited viewers & notebooks
            </p>
            <p className="text-md text-gray-500 flex flex-row items-center ">
              <IoCheckmarkSharp size={18} className="text-blue-500 mr-2" />{" "}
              Unlimited viewers & notebooks
            </p>
            <p className="text-md text-gray-500 flex flex-row items-center ">
              <IoCheckmarkSharp size={18} className="text-blue-500 mr-2" />{" "}
              Unlimited viewers & notebooks
            </p>
          </div>
        </div>
        <Button className="w-full font-bold tracking-wide text-lg bg-blue-500 text-white mt-4">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
