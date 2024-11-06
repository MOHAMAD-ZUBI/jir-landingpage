import React from "react";
import PricingCard from "../reusable/PricingCard";

type Props = {};

const Pricing = (props: Props) => {
  return (
    <div className="flex w-full flex-col items-center space-y-4 max-md:px-4">
      <h2 className="text-3xl font-bold">Pricing</h2>
      <div className="flex flex-row max-md:flex-col items-center space-x-4">
        <PricingCard />
        <PricingCard isMiddle={true} />
        <PricingCard />
      </div>
    </div>
  );
};

export default Pricing;
