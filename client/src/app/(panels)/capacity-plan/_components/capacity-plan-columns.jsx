'use client'

import { DataTableColumnHeader } from '@/components/table/column-header'

export const capacityPlanColumns = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'month_projection',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Resource Projection by Month" />
    ),
  },
  {
    accessorKey: 'capacity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Capacity" />,
  },
  {
    accessorKey: 'percentage',
    header: ({ column }) => <DataTableColumnHeader column={column} title="%" />,
  },
  {
    accessorKey: 'mandays_needed',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mandays Needed" />,
  },
  {
    accessorKey: 'additional_manpower_needed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Additional Manpower Needed" />
    ),
  },
]
