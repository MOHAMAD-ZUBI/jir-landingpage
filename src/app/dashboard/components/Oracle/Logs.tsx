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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { SiEventstore } from "react-icons/si";
import { RxActivityLog } from "react-icons/rx";
import client from "@/utils/client";

interface LogEntry {
  id: number;
  name: string;
  status: number;
  log: string;
  rule_running: string;
  year: string;
  created_at: string;
  live_env: boolean;
  user: string;
  job: number;
}

const useLogEntries = () => {
  const [state, setState] = React.useState<{
    logEntries: LogEntry[];
    loading: boolean;
    error: Error | null;
  }>({
    logEntries: [],
    loading: false,
    error: null,
  });

  React.useEffect(() => {
    const abortController = new AbortController();

    const fetchLogs = async () => {
      if (!state.loading) {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
          const { data } = await client.get("/v2/api/activities/", {
            signal: abortController.signal,
          });
          setState({ logEntries: data, loading: false, error: null });
        } catch (error) {
          if (!abortController.signal.aborted) {
            console.error("Error fetching logs:", error);
            setState({
              logEntries: [],
              loading: false,
              error: error as Error,
            });
          }
        }
      }
    };

    fetchLogs();

    return () => {
      abortController.abort();
    };
  }, []);

  return state;
};

const Logs: React.FC = () => {
  const { logEntries, loading, error } = useLogEntries();
  const [page, setPage] = React.useState(1);
  const [selectedLog, setSelectedLog] = React.useState<LogEntry | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const rowsPerPage = 10;

  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleLogSelect = React.useCallback(
    (log: LogEntry) => {
      setSelectedLog(log);
      onOpen();
    },
    [onOpen]
  );

  const paginatedItems = React.useMemo(() => {
    if (!logEntries.length) return [];
    return logEntries.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [logEntries, page, rowsPerPage]);

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
      key: "job",
      label: "JOB ID",
      className: "hidden md:table-cell",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const renderCell = (
    item: LogEntry,
    columnKey: keyof LogEntry | "actions"
  ) => {
    if (columnKey === "status") {
      const statusConfig = {
        2: {
          color: "success",
          icon: <FaCheckCircle className="text-lg" />,
          text: "Completed",
        },
        1: {
          color: "warning",
          icon: <BiLoaderAlt className="text-lg animate-spin" />,
          text: "Loading",
        },
        3: {
          color: "danger",
          icon: <FaTimesCircle className="text-lg" />,
          text: "Failed",
        },
      };

      const config = statusConfig[item.status as keyof typeof statusConfig] || {
        color: "default",
        icon: <FaTimesCircle className="text-lg" />,
        text: "Unknown",
      };

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

    if (columnKey === "actions") {
      return (
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={() => handleLogSelect(item)}
        >
          Details
        </Button>
      );
    }

    return item[columnKey];
  };

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="text-danger">Error loading logs: {error.message}</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
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
                  onChange={handlePageChange}
                />
              </div>
            }
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  className={column.className || ""}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={paginatedItems}
              emptyContent={loading ? "Loading..." : "No logs found"}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell
                      className={
                        columns.find((col) => col.key === columnKey)
                          ?.className || ""
                      }
                    >
                      {renderCell(
                        item,
                        columnKey as keyof LogEntry | "actions"
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {selectedLog && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedLog(null);
          }}
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <>
              <ModalHeader className="flex gap-2 items-center border-b">
                <SiEventstore className="text-xl" />
                Job Details
              </ModalHeader>
              <ModalBody className="max-h-[calc(80vh-100px)] overflow-y-auto">
                <div className="space-y-6 py-4">
                  {/* Top Section - Important Info */}
                  <div className="flex gap-4 items-center border-b pb-4 sticky top-0 bg-background z-10">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{selectedLog.name}</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        ID: {selectedLog.id}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {renderCell(selectedLog, "status")}
                      <Chip
                        color={selectedLog.live_env ? "danger" : "success"}
                        variant="flat"
                        size="sm"
                      >
                        {selectedLog.live_env
                          ? "Live Environment"
                          : "Test Environment"}
                      </Chip>
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="bg-default-100 p-3 rounded-lg">
                        <h3 className="font-semibold text-sm text-default-500">
                          Rule Running
                        </h3>
                        <p className="mt-1 break-words">
                          {selectedLog.rule_running}
                        </p>
                      </div>

                      <div className="bg-default-100 p-3 rounded-lg">
                        <h3 className="font-semibold text-sm text-default-500">
                          Year
                        </h3>
                        <p className="mt-1">{selectedLog.year}</p>
                      </div>

                      <div className="bg-default-100 p-3 rounded-lg">
                        <h3 className="font-semibold text-sm text-default-500">
                          Created At
                        </h3>
                        <p className="mt-1">
                          {new Date(selectedLog.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="bg-default-100 p-3 rounded-lg">
                        <h3 className="font-semibold text-sm text-default-500">
                          User
                        </h3>
                        <p className="mt-1 break-words">{selectedLog.user}</p>
                      </div>

                      <div className="bg-default-100 p-3 rounded-lg">
                        <h3 className="font-semibold text-sm text-default-500">
                          Job Reference ID
                        </h3>
                        <p className="mt-1">{selectedLog.job}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Log Details */}
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-default-500 mb-2">
                      Log Details
                    </h3>
                    <div className="bg-default-100 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap font-mono text-sm break-words overflow-x-auto max-h-[300px]">
                        {selectedLog.log}
                      </pre>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Logs;
