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
      <div className=" flex   flex-wrap gap-4 w-full">
        {automatedJobs?.map((job, index) => (
          <CustomCard job={job} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AutomatedJobs;
