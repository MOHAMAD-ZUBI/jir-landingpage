import React from "react";

type Props = {
  title: string;
  subheading?: string; // Optional subheading
  className?: string; // Optional className for custom styling
};

const TıtleHeading = ({ title, subheading, className = "" }: Props) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
      {subheading && <p className="mt-2 text-sm text-gray-600">{subheading}</p>}
    </div>
  );
};

export default TıtleHeading;
