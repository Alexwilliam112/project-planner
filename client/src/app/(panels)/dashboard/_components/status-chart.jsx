'use client'

import SimpleBarChart from '@/components/charts/bar-chart'
import { dashboardService } from '@/services/index.mjs'
import { useQuery } from '@tanstack/react-query'

export default function StatusChart() {
  const taskStatusQuery = useQuery({
    queryKey: ['task-progress'],
    queryFn: dashboardService.getTaskProgress,
  })

  return (
    <div className="border rounded-md shadow">
      <div className="border-b px-5 py-3">
        <h2 className="font-semibold">Task by Status</h2>
      </div>
      <SimpleBarChart data={taskStatusQuery.data || []} />
    </div>
  )
}
