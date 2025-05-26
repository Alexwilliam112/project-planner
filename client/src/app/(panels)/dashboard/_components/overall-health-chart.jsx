'use client'

import PieChartWithNeedle from '@/components/charts/pie-chart-with-needle'
import { useQuery } from '@tanstack/react-query'

export default function OverallHealthChart() {
  const overallHealthQuery = useQuery({
    queryKey: ['overall-health'],
  })
  return (
    <div className="border rounded-md shadow">
      <div className="border-b px-5 py-3">
        <h2 className="font-semibold">Task by Priority</h2>
      </div>
      <PieChartWithNeedle data={priorityData} />
    </div>
  )
}

const priorityData = [
  {
    name: 'High',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Medium',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Low',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
]
