"use client";

import { DataTableColumnHeader } from "@/components/table/column-header.jsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import ProjectsOverlay from "./projects-overlay";

export const projectsColumns = [
  {
    id: "action",
    cell: ({ row }) => <ProjectsOverlay data={row.original} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "product_id.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">
        <Badge
          style={{
            backgroundColor: row.original.product_id.color,
            color: "#fff",
          }}
        >
          {row.original.product_id.name}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "category_id.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Category" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">
        {row.original.category_id.name}
      </div>
    ),
  },
  {
    accessorKey: "date_start",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">
        {format(row.original.date_start, "PPP")}
      </div>
    ),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">
        {format(row.original.date_end, "PPP")}
      </div>
    ),
  },
  {
    accessorKey: "project_owner_id.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Owner" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">
        {row.original.project_owner_id.name}
      </div>
    ),
  },
  {
    accessorKey: "status_id.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Status" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">
        <Badge
          style={{
            backgroundColor: row.original.status_id.color,
            color: "#fff",
          }}
        >
          {row.original.status_id.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "priority_id.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">
        <Badge
          style={{
            backgroundColor: row.original.priority_id.color,
            color: "#fff",
          }}
        >
          {row.original.priority_id.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">{row.original.progress}</div>
    ),
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => (
      <div className="w-[40ch] py-2 text-wrap">{row.original.note}</div>
    ),
  },
];
