'use client'

import { DataTable } from '@/components/table/data-table'
import { useQuery } from '@tanstack/react-query'
import { tasksService } from '@/services/index.mjs'
import { taskSummaryColumns } from './task-summary-columns'

export default function TaskSummaryTable() {
  const taskSummaryQuery = useQuery({
    queryKey: ['task'],
    queryFn: tasksService.getAll,
  })

  return <DataTable columns={taskSummaryColumns} data={taskSummaryQuery.data || []} />
}
