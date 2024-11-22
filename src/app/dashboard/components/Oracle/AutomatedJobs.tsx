"use client";
import React, { useEffect, useState } from "react";
import { HiMiniQueueList } from "react-icons/hi2";
import CustomCard from "../Reusable/CustomCard";
import client from "@/utils/client";
import { Job } from "../../../../../types";
import { Pagination } from "@nextui-org/react";

export interface AutomatedJob {
  title: string;
  description: string;
  createdAt: string;
}

const AutomatedJobs = ({}) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchJobs = async () => {
    const { data } = await client.get("/v2/api/shortcuts/");
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const currentJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log({ jobs });
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className=" flex   flex-wrap gap-4 w-full">
        {currentJobs?.map((job, index) => (
          <CustomCard
            job={{
              id: job.id,
              title: job.name,
              name: job.name,
              status: job.is_active,
              sharedWGroups: job.shared_w_groups,
              rules: job.rules || [],
            }}
            onUpdate={fetchJobs}
            key={index}
          />
        ))}
      </div>

      {jobs.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AutomatedJobs;
