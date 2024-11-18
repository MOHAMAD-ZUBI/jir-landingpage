"use client";
import React, { useEffect, useState } from "react";
import { HiMiniQueueList } from "react-icons/hi2";
import CustomCard from "../Reusable/CustomCard";
import client from "@/utils/client";
import { Job } from "../../../../../types";

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
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const { data } = await client.get("/v2/api/shortcuts/");
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  console.log({ jobs });
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className=" flex   flex-wrap gap-4 w-full">
        {jobs?.map((job, index) => (
          <CustomCard
            job={{
              title: job.name,
              status: job.is_active,
              sharedWGroups: job.shared_w_groups,
            }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AutomatedJobs;
