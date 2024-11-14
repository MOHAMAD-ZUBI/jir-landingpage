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
  description: string;
  createdAt: string;
}

export default function App({ job }: { job: JobCard }) {
  return (
    <Card className="max-w-[400px] bg-gradient-to-tl  from-gray-600 via-slate-800 to-slate-500 text-white">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{job.title}</p>
          <p className="text-small text-gray-100">{job.createdAt}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{job.description}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}
