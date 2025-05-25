'use client'

import { DataTable } from '@/components/table/data-table'
import { resourceCapacityColumns } from './resource-capacity-columns'

export default function ResourceCapacityTable({ resourceCapacityQuery }) {
  return <DataTable columns={resourceCapacityColumns} data={resourceCapacityQuery?.data || []} />
}
