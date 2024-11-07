import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="text-center p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-black text-2xl md:text-3xl font-extrabold max-w-[320px] mb-4">
        {title}
      </h3>
      <p className="text-gray-400 text-md md:text-xl">{description}</p>
    </div>
  );
};

export default FeatureCard;
