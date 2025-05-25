'use client'

import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const createTaskSummaryColumns = ({ handleEdit }) => [
  {
    id: 'actions',
    header: 'Actions',
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
    accessorKey: 'assignee_id.name',
    header: 'Assignee',
  },
  {
    accessorKey: 'project_id.name',
    header: 'Project',
  },
  {
    accessorKey: 'milestone_id.name',
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
    header: 'Est MH',
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => row.original.progress || 0 + '%',
  },
  {
    accessorKey: 'note',
    header: 'Note',
  },
]
