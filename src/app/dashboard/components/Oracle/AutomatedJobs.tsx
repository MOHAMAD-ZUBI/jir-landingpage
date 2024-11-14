import React from "react";
import { HiMiniQueueList } from "react-icons/hi2";

export interface AutomatedJob {
  name: string;
  description: string;
  createdAt: string;
}

const AutomatedJobs = ({
  automatedJobs,
}: {
  automatedJobs: AutomatedJob[];
}) => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {automatedJobs?.map((job, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg cursor-pointer p-4 shadow-md w-full"
          >
            <h2 className="text-2x font-bold">{job?.name}</h2>
            <p className="text-sm text-gray-500">{job?.createdAt}</p>
            <h1 className="text-lg font-bold">{job?.description}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomatedJobs;
