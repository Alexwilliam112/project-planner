'use client'

import { DataTableColumnHeader } from '@/components/table/column-header.jsx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Pencil } from 'lucide-react'
import ProjectsOverlay from './projects-overlay'

export const projectsColumns = [
  {
    id: 'action',
    cell: ({ row }) => <ProjectsOverlay data={row.original} />,
  },
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
    cell: ({ row }) => (
      <Badge className={cn(`bg-[${row.original.status_id.color}]`)}>
        {row.original.status_id.name}
      </Badge>
    ),
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
