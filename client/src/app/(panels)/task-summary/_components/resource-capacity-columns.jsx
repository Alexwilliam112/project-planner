'use client'

export const resourceCapacityColumns = [
  {
    accessorKey: 'division',
    header: 'Division',
  },
  {
    accessorKey: 'squad',
    header: 'Squad',
  },
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
    accessorKey: 'work_days',
    header: 'Work Days',
  },
  {
    accessorKey: 'time_off',
    header: 'Time Off',
  },
  {
    accessorKey: 'nett_work_days',
    header: 'Nett Work Days',
  },
  {
    accessorKey: 'total_mh',
    header: 'Total MH',
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
