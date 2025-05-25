'use client'

import { DataTable } from '@/components/table/data-table'
import { useQuery } from '@tanstack/react-query'
import { tasksService } from '@/services/index.mjs'
import { resourceCapacityColumns } from './resource-capacity-columns'

export default function ResourceCapacityTable() {
  const resourceCapacityQuery = useQuery({
    queryKey: ['resource-capacity'],
    queryFn: tasksService.getResourceCapacity,
  })

  return <DataTable columns={resourceCapacityColumns} data={resourceCapacityQuery.data || []} />
}
