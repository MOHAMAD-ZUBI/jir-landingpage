import React from "react";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-700 via-blue-400 to-blue-300 p-12 md:p-16 min-h-[400px] w-full">
        {/* Stars - absolute positioned spans */}
        <div className="absolute inset-0">
          <span className="absolute top-10 left-[10%] h-1 w-1 bg-white rounded-full opacity-70"></span>
          <span className="absolute top-20 right-[20%] h-1 w-1 bg-white rounded-full opacity-70"></span>
          <span className="absolute top-32 left-[30%] h-1 w-1 bg-white rounded-full opacity-70"></span>
          <span className="absolute top-24 right-[40%] h-1 w-1 bg-white rounded-full opacity-70"></span>
          <span className="absolute top-16 left-[60%] h-1 w-1 bg-white rounded-full opacity-70"></span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Getting started is easy
          </h2>
          <p className="text-white max-md:text-gray-800 max-md:font-semibold text-xl mb-10">
            Sign up today and deliver your apps in record time
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all"
          >
            Get started now
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Rocket and Cloud Illustration */}
        <div className="absolute right-0 bottom-0 w-96 h-96 md:w-[500px] md:h-[500px]">
          {/* Cloud */}
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-white rounded-full opacity-90"></div>

          {/* Rocket */}
          <div className="absolute bottom-32 right-32 transform rotate-45">
            <div className="w-24 h-48 bg-blue-500 rounded-t-full relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-8 h-16 bg-blue-600 rounded-bl-full"></div>
              <div className="absolute bottom-0 right-0 w-8 h-16 bg-blue-600 rounded-br-full"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-10 bg-orange-500 clip-path-triangle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
