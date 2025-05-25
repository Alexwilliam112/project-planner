'use client'

import { format } from 'date-fns'

export const taskSummaryColumns = [
  {
    accessorKey: 'assignee_id.name',
    header: 'Assignee',
  },
  {
    accessorKey: 'project_id.name',
    header: 'Project',
  },
  {
    accessorKey: 'status_id.name',
    header: 'Milestone',
  },
  {
    accessorKey: 'name',
    header: 'Task Name',
  },
  {
    accessorKey: 'priority_id.name',
    header: 'Priority',
  },
  {
    accessorKey: 'status_id.name',
    header: 'Status',
  },
  {
    id: 'date_range',
    header: 'Date',
    cell: ({ row }) => (
      <div className="py-2">
        {format(row.original.date_start, 'PPP')} - {format(row.original.date_end, 'PPP')}
      </div>
    ),
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
    cell: ({ row }) => format(row.original.deadline, 'PPP'),
  },
  {
    accessorKey: 'est_mh',
    header: 'Estimation Manhours Engineer',
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => row.original.progress + '%',
  },
  {
    accessorKey: 'note',
    header: 'Note',
  },
]
