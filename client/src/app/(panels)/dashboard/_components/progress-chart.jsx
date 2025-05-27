'use client'

import React from 'react'
import CustomActivePieChart from '@/components/charts/custom-active-pie-chart'
import { dashboardService } from '@/services/index.mjs'
import { useQuery } from '@tanstack/react-query'

export default function ProgressChart() {
  const [data, setData] = React.useState([])
  const taskProgressQuery = useQuery({
    queryKey: ['task-progress'],
    queryFn: dashboardService.getTaskProgress,
  })

  React.useEffect(() => {
    if (taskProgressQuery.data) {
      const newData = taskProgressQuery.data.map((d) => ({ name: d.status, value: d.total }))

      setData(newData)
    }
  }, [taskProgressQuery.data])
  return (
    <div className="border rounded-md shadow">
      <div className="border-b px-5 py-3">
        <h2 className="font-semibold">Task Progress</h2>
      </div>
      <CustomActivePieChart data={data} />
    </div>
  )
}
