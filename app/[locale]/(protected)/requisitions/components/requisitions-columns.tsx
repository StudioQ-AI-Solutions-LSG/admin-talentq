"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Clock, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Eye, MoreVertical, SquarePen, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { format, formatInTimeZone } from "date-fns-tz"; // optional for formatting dates
import {
  FaBed,
  FaClock,
  FaDotCircle,
  FaExclamationTriangle,
  FaMoon,
  FaRegCommentDots,
  FaUser,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa"; // optional for timeline dots

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TimelineKey = keyof TimelineData;

interface CandidateStatus {
  Required: number;
  Pending: number;
  Interview: number;
  Accepted: number;
  Rejected: number;
}

interface TimelineData {
  start_date: string;
  filled_date: string | null;
  closed_date: string | null;
}

export type DataProps = {
  id: string;
  custom_name: string;
  created_at: string;
  budget: number;
  customer_name: string;
  status: "New" | "In Progress" | "Filled" | "Closed" | "Closed By Customer";
  days_of_last_action_by_customer: number;
  candidates: CandidateStatus;
  timeline: TimelineData;
  elapsed_days: number;
  action?: React.ReactNode;
};

export default function HealthCell({ value }: { value: number }) {
  const [showTooltip, setShowTooltip] = useState(false);

  let IconComponent;
  let colorClass = "";
  const showZs = value > 2;

  if (value < 2) {
    IconComponent = FaRegCommentDots;
    colorClass = "text-emerald-500";
  } else if (value === 2) {
    IconComponent = FaClock;
    colorClass = "text-yellow-400";
  } else {
    IconComponent = FaMoon;
    colorClass = "text-yellow-400";
  }

  if (value == null) return <span>--</span>;

  return (
    <>
      <div
        className={`relative flex justify-center items-center h-full ${colorClass}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ cursor: "pointer" }}
      >
        <div className="relative flex items-center justify-center">
          <IconComponent className="text-base" />
          {showZs && (
            <div className="absolute -top-1 left-full ml-1">
              <span className="z-symbol delay-0">Z</span>
              <span className="z-symbol delay-1">Z</span>
              <span className="z-symbol delay-2">Z</span>
            </div>
          )}
        </div>

        {showTooltip && (
          <div className="absolute bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10">
            {value} days
          </div>
        )}
      </div>

      <style jsx>{`
        .z-symbol {
          position: absolute;
          font-size: 0.35rem;
          color: #facc15;
          animation: floatZ 2s linear infinite;
          opacity: 0;
        }

        .delay-0 {
          top: 0px;
          left: 0px;
          animation-delay: 0s;
        }

        .delay-1 {
          top: -4px;
          left: 4px;
          animation-delay: 0.3s;
        }

        .delay-2 {
          top: -8px;
          left: 8px;
          animation-delay: 0.6s;
        }

        @keyframes floatZ {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          100% {
            transform: scale(1.1) translateY(-4px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

const ActionsCell = ({ row }: { row: any }) => {
  const accountId = row.original.id;
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="bg-transparent ring-offset-transparent hover:bg-transparent hover:ring-0 hover:ring-transparent"
        >
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4 text-default-800" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/en/requisitions/${accountId}/`)}
        >
          <Eye className="w-4 h-4 me-1.5" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 border-b text-default-700 group focus:bg-default focus:text-primary-foreground rounded-none">
          <SquarePen className="w-4 h-4 me-1.5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 border-b text-destructive bg-destructive/30  focus:bg-destructive focus:text-destructive-foreground rounded-none">
          <Trash2 className="w-4 h-4 me-1.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<DataProps>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string;
      const days = row.original.elapsed_days;

      return (
        <div className="flex items-center justify-start gap-2">
          <span>
            {createdAt ? format(new Date(createdAt), "yyyy-MM-dd") : "--"}
          </span>

          {typeof days === "number" && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />+{days}d
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "custom_name",
    header: "Requisition",
    cell: ({ row }) => <span>{row.getValue("custom_name") ?? "--"}</span>,
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
    cell: ({ row }) => <span>{row.getValue("customer_name") ?? "--"}</span>,
  },

  {
    accessorKey: "days_of_last_action_by_customer",
    header: () => (
      <>
        Customer <br />
        Inactivity
      </>
    ),
    size: 120,
    cell: ({ row }) => {
      return (
        <HealthCell value={row.original.days_of_last_action_by_customer} />
      );
    },
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const value = row.getValue("budget");
      return <span>${value?.toLocaleString() ?? "--"}</span>;
    },
  },
  {
    accessorKey: "candidates",
    header: "Candidates",
    cell: ({ row }) => {
      const c = row.getValue("candidates") as DataProps["candidates"];
      const total = Object.values(c || {}).reduce((acc, val) => acc + val, 0);

      const candidateColors: Record<string, { bg: string; text: string }> = {
        Pending: {
          bg: "bg-gray-300",
          text: "text-gray-700",
        },
        Interview: {
          bg: "bg-gray-200",
          text: "text-gray-600",
        },
        Accepted: {
          bg: "bg-green-100",
          text: "text-green-600",
        },
        Rejected: {
          bg: "bg-gray-100",
          text: "text-gray-500",
        },
        Required: {
          bg: "bg-blue-100",
          text: "text-blue-600",
        },
        Closed: {
          bg: "bg-gray-500",
          text: "text-white",
        },
      };

      const sortedEntries = c
        ? Object.entries(c).sort(([keyA], [keyB]) => {
            if (keyA === "Accepted") return 1;
            if (keyB === "Accepted") return -1;
            return 0;
          })
        : [];

      return (
        <div className="flex justify-center w-full">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground hover:bg-gray-200 transition cursor-pointer">
                <Users className="w-4 h-4" />
                {total}
              </button>
            </PopoverTrigger>

            <PopoverContent className="p-3 w-auto text-xs rounded-lg shadow-md">
              <div className="flex flex-col gap-2">
                {sortedEntries.map(([status, count]) => {
                  const colorData = candidateColors[status] || {
                    bg: "bg-muted",
                    text: "text-muted-foreground",
                  };

                  return (
                    <div
                      key={status}
                      className={`flex items-center justify-between px-2 py-1 rounded-md ${colorData.bg} ${colorData.text}`}
                    >
                      <span>{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  /*{
    accessorKey: "timeline",
    header: "Timeline",
    cell: ({ row }) => {
      const timeline = row.getValue("timeline") as DataProps["timeline"];
      const stages: { label: string; key: TimelineKey }[] = [
        { label: "Start", key: "start_date" },
        { label: "Filled", key: "filled_date" },
        { label: "Closed", key: "closed_date" },
      ];
      return (
        <div className="flex flex-col gap-1 text-xs text-gray-600">
          {stages.map(({ label, key }) => (
            <div key={key}>
              <strong>{label}:</strong>{" "}
              {timeline?.[key]
                ? new Date(timeline[key]).toLocaleDateString()
                : "—"}
            </div>
          ))}
        </div>
      );
    },
  },*/
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors: Record<string, string> = {
        "In Progress": "bg-blue-100 text-blue-600",
        Closed: "bg-gray-200 text-gray-800",
        Filled: "bg-success/20 text-success",
        New: "bg-purple-100 text-purple-600",
      };

      const status = row.getValue<string>("status");
      const statusStyles = statusColors[status] || "default";

      return (
        <Badge
          className={cn(
            "rounded-full px-2 py-1 text-center",
            statusStyles,
            "inline-flex items-center justify-center",
            "w-[90px]", // fixed width to fit 'In Progress'
            "h-[28px]", // fixed height for consistency
            "whitespace-nowrap" // prevent wrapping
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
