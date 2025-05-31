"use client";

import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


export const createTaskSummaryColumns = ({ handleEdit }) => [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        className="w-8 h-8"
        size="icon"
        variant="outline"
        onClick={() => handleEdit(row.original)}
      >
        <Pencil />
      </Button>
    ),
  },
  {
    accessorKey: "assignee_id.name",
    header: "Assignee",
  },
  {
    accessorKey: "project_id.name",
    header: "Project",
    cell: ({ row }) => (
      <div className="w-[20ch] py-2 text-wrap">{row.original.project_id.name}</div>
    ),
  },
  {
    accessorKey: "milestone_id.name",
    header: "Milestone",
    cell: ({ row }) => (
      <div className="w-[15ch] py-2 text-wrap">
        <Badge
          style={{
            backgroundColor: row.original.milestone_id.color,
            color: "#fff",
          }}
        >
          {row.original.milestone_id.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Task Name",
    cell: ({ row }) => (
      <div className="w-[30ch] py-2 text-wrap">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "priority_id.name",
    header: "Priority",
    cell: ({ row }) => (
      <div className="w-[10ch] py-2 text-wrap">
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
    accessorKey: "status_id.name",
    header: "Status",
    cell: ({ row }) => (
      <div className="w-[15ch] py-2 text-wrap">
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
    id: "date_range",
    header: "Date",
    cell: ({ row }) => (
      <div className="py-2">
        {new Date(row.original.date_start).toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {new Date(row.original.date_end).toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
      </div>
    ),
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => format(row.original.deadline, "PPP"),
  },
  {
    accessorKey: "est_mh",
    header: "Est MH",
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) =>
      row.original.progress ? row.original.progress + "%" : 0 + "%",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
];
