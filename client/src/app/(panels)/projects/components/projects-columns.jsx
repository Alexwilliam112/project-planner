'use client'

import { DataTableColumnHeader } from '@/components/table/column-header'
import { format } from 'date-fns'

export const projectsColumns = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Project Name" />,
  },
  {
    accessorKey: 'product_id.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Project Type" />,
  },
  {
    accessorKey: 'category_id.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Project Category" />,
  },
  {
    accessorKey: 'date_start',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => format(row.original.date_start, 'PPP'),
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    cell: ({ row }) => format(row.original.date_end, 'PPP'),
  },
  {
    accessorKey: 'project_owner_id.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Project Owner" />,
  },
  {
    accessorKey: 'status_id.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Project Status" />,
    cell: ({ row }) => row.original.status_id.name,
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
  },
  {
    accessorKey: 'note',
    header: 'Note',
  },
]
