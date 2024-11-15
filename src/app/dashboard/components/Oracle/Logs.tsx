import React from "react";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { SiEventstore } from "react-icons/si";
import { RxActivityLog } from "react-icons/rx";

interface LogEntry {
  id: string;
  jobName: string;
  status: "completed" | "failed" | "running";
  timestamp: string;
  message?: string;
}

const Logs: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const isMobile = window.innerWidth <= 768;

  // Mock data - replace with actual data from your API/state
  const logEntries: LogEntry[] = [
    {
      id: "1",
      jobName: "Data Sync",
      status: "completed",
      timestamp: "2024-03-20 14:30:00",
      message: "Successfully synchronized data",
    },
    // Add more entries as needed
  ];

  const columns = [
    {
      key: "jobName",
      label: "JOB NAME",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "timestamp",
      label: "TIMESTAMP",
      className: "hidden md:table-cell",
    },
    {
      key: "message",
      label: "MESSAGE",
      className: "hidden md:table-cell",
    },
  ];

  const renderCell = (item: LogEntry, columnKey: keyof LogEntry) => {
    if (columnKey === "status") {
      const statusConfig = {
        completed: {
          color: "success",
          icon: <FaCheckCircle className="text-lg" />,
          text: "Completed",
        },
        failed: {
          color: "danger",
          icon: <FaTimesCircle className="text-lg" />,
          text: "Running",
        },
        running: {
          color: "warning",
          icon: <BiLoaderAlt className="text-lg animate-spin" />,
          text: "Running",
        },
      };

      const config = statusConfig[item.status];
      return (
        <Chip
          startContent={config.icon}
          color={config.color as any}
          variant="flat"
        >
          {config.text}
        </Chip>
      );
    }
    return item[columnKey];
  };

  return (
    <Card>
      <CardBody>
        <h2 className="text-2xl max-md:text-xl font-semibold md:font-bold mb-2 flex items-center gap-2">
          <RxActivityLog /> <span>Activity Logs</span>
        </h2>
        <Table
          aria-label="Job activity logs table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(logEntries.length / rowsPerPage)}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[400px]",
          }}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key} className={column.className}>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={logEntries}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell
                    className={
                      columns.find((col) => col.key === columnKey)?.className
                    }
                  >
                    {renderCell(item, columnKey as keyof LogEntry)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Logs;
