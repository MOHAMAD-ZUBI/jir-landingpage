import React from "react";
import {
  IconRocket,
  IconChartLine,
  IconPhone,
  IconSettings,
  IconUsers,
  IconUserCircle,
} from "@tabler/icons-react"; // or your preferred icon library

const services = [
  {
    icon: <IconChartLine className="w-8 h-8" />,
    title: "INVESTMENT HEDGING",
    description:
      "Discover underperforming risky investments in your portfolio and protect it during downtrend",
  },
  {
    icon: <IconRocket className="w-8 h-8" />,
    title: "INSTANT COMPANY VALUATION",
    description:
      "Obtain automated local company value using AI/Machine Learning and local market/industry data",
  },
  {
    icon: <IconPhone className="w-8 h-8" />,
    title: "COMPANY BENCHMARKING",
    description:
      "Benchmark local company KPI against its industry and find inefficincies and risks on the go",
  },
  {
    icon: <IconSettings className="w-8 h-8" />,
    title: "COMPANY RISK SCORING",
    description:
      "Obtain live risk score for your local company using AI risk algorithm and local market/industry data",
  },
  {
    icon: <IconUsers className="w-8 h-8" />,
    title: "CORPORATE EDUCATION",
    description:
      "Learn Data Science in Finance online and start utilizing AI/Python in your company",
  },
  {
    icon: <IconUserCircle className="w-8 h-8" />,
    title: "TEAM OF EXPERTS",
    description:
      "Backed by a team of CFA charterholders, investment professionals and IT gurus",
  },
];

const ServicesGrid = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
