"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

interface JobCard {
  title: string;
  status: boolean;
  sharedWGroups: boolean;
}

export default function App({ job }: { job: JobCard }) {
  return (
    <Card className="max-w-[400px] bg-gradient-to-tl  w-full from-gray-600 via-slate-800 to-slate-500 text-white">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{job.title}</p>
          <p className="text-small text-gray-100">
            Shared: {job.sharedWGroups ? "Yes" : "No"}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Status: {job.status ? "Active" : "Inactive"}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}
