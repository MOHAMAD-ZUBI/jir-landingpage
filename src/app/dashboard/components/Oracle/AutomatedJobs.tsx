import React from "react";
import { HiMiniQueueList } from "react-icons/hi2";
import CustomCard from "../Reusable/CustomCard";

export interface AutomatedJob {
  title: string;
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
          <CustomCard job={job} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AutomatedJobs;
