"use client";
import { Badge } from "@/components/ui/badge";

export const resourceCapacityColumns = [
  {
    accessorKey: "division",
    header: "Division",
  },
  {
    accessorKey: "squad",
    header: "Squad",
  },
  {
    accessorKey: "name",
    header: "Resource Name",
    cell: ({ row }) => <div className="py-2">{row.original.name}</div>,
  },
  {
    accessorKey: "resource_type",
    header: "Role",
  },
  {
    accessorKey: "work_days",
    header: "Work Days",
  },
  {
    accessorKey: "time_off",
    header: "Time Off",
  },
  {
    accessorKey: "nett_work_days",
    header: "Nett Work Days",
  },
  {
    accessorKey: "total_mh",
    header: "Total MH",
  },
  {
    accessorKey: "current_mh",
    header: "Current MH",
    cell: ({ row }) => (
      <div className="w-[7ch] py-2 text-wrap">
        {Number(row.original.capacity.split(" ")[0]) >= 95 ? (
          <Badge
            style={{
              backgroundColor: "#2DBB09",
              color: "#fff",
            }}
          >
            {row.original.current_mh.toFixed(2)}
          </Badge>
        ) : (
          <Badge
            style={{
              backgroundColor: "#A20808",
              color: "#fff",
            }}
          >
            {row.original.current_mh.toFixed(2)}
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "idle_mh",
    header: "Idle MH",
    cell: ({ row }) => (
      <div className="w-[7ch] py-2 text-wrap">
        {Number(row.original.capacity.split(" ")[0]) >= 95 ? (
          <Badge
            style={{
              backgroundColor: "#2DBB09",
              color: "#fff",
            }}
          >
            {row.original.idle_mh.toFixed(2)}
          </Badge>
        ) : (
          <Badge
            style={{
              backgroundColor: "#A20808",
              color: "#fff",
            }}
          >
            {row.original.idle_mh.toFixed(2)}
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => (
      <div className="w-[15ch] py-2 text-wrap">
        {Number(row.original.capacity.split(" ")[0]) >= 95 ? (
          <Badge
            style={{
              backgroundColor: "#2DBB09",
              color: "#fff",
            }}
          >
            {row.original.capacity}
          </Badge>
        ) : (
          <Badge
            style={{
              backgroundColor: "#A20808",
              color: "#fff",
            }}
          >
            {row.original.capacity}
          </Badge>
        )}
      </div>
    ),
  },
];
