"use client";
import React, { useEffect, useState } from "react";
import { HiMiniQueueList } from "react-icons/hi2";
import CustomCard from "../Reusable/CustomCard";
import client from "@/utils/client";
import { Job } from "../../../../../types";
import { Pagination, Input } from "@nextui-org/react";
import { useWorkspace } from "@/context/WorkspaceContext";

export interface AutomatedJob {
  title: string;
  description: string;
  createdAt: string;
}

const AutomatedJobs = ({}) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9;

  const { currentWorkspace } = useWorkspace();
  console.log({ currentWorkspace });

  const fetchJobs = async () => {
    const { data } = await client.get(
      `/v2/api/platforms/${currentWorkspace?.id}/shortcuts/`
    );
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      job.id?.toString().includes(searchTerm) ||
      job.name?.toLowerCase().includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  console.log({ jobs });
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Input
        type="text"
        placeholder="Search by job ID or name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-xs"
      />
      <div className=" flex   flex-wrap gap-4 w-full">
        {currentJobs?.map((job, index) => (
          <CustomCard
            job={{
              id: job.id,
              title: job.name,
              name: job.name,
              status: job.is_active,
              last_status: job.last_status,
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
