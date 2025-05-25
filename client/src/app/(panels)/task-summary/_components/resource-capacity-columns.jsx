'use client'

export const resourceCapacityColumns = [
  {
    accessorKey: 'name',
    header: 'Resource Name',
    cell: ({ row }) => <div className="py-2">{row.original.name}</div>,
  },
  {
    accessorKey: 'resource_type',
    header: 'Role',
  },
  {
    accessorKey: 'time_off',
    header: 'Day Off',
  },
  {
    accessorKey: 'nett_work_days',
    header: 'Nett Work Days',
  },
  {
    accessorKey: 'total_mh',
    header: 'Total',
  },
  {
    accessorKey: 'current_mh',
    header: 'Current MH',
  },
  {
    accessorKey: 'idle_mh',
    header: 'Idle MH',
  },
  {
    accessorKey: 'capacity',
    header: 'Capacity',
  },
]
