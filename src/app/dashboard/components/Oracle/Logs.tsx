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
import { useEffect } from "react";
import client from "@/utils/client";

interface LogEntry {
  id: number;
  name: string;
  status: number;
  log: string;
  created_at: string;
  // ... other fields can be added if needed
}

const Logs: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [logEntries, setLogEntries] = React.useState<LogEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const { data } = await client.get("/v2/api/activities/");
        setLogEntries(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const columns = [
    {
      key: "name",
      label: "JOB NAME",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "created_at",
      label: "TIMESTAMP",
      className: "hidden md:table-cell",
    },
    {
      key: "log",
      label: "LOG",
      className: "hidden md:table-cell",
    },
  ];

  const renderCell = (item: LogEntry, columnKey: keyof LogEntry) => {
    if (columnKey === "status") {
      const statusConfig = {
        1: {
          color: "success",
          icon: <FaCheckCircle className="text-lg" />,
          text: "Completed",
        },
        0: {
          color: "warning",
          icon: <BiLoaderAlt className="text-lg animate-spin" />,
          text: "Running",
        },
      };

      const config = statusConfig[item.status as keyof typeof statusConfig];
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

    if (columnKey === "created_at") {
      return new Date(item.created_at).toLocaleString();
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
          //@ts-ignore
          loadingContent={<BiLoaderAlt className="animate-spin text-2xl" />}
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
