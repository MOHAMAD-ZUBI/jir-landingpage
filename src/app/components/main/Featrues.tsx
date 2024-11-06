import React from "react";
import FeatureCard from "../reusable/FeatureCard";
import Services from "../reusable/Services";

type Props = {};

const Featrues = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 space-x-4 w-full">
      <h2 className="text-3xl font-bold">Our Services</h2>
      <Services />
    </div>
  );
};

export default Featrues;
