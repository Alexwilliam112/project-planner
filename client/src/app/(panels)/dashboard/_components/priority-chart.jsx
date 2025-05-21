'use client'

import CustomActivePieChart from '@/components/charts/custom-active-pie-chart'
import StackedBarChart from '@/components/charts/stacked-bar-chart'

export default function PriorityChart() {
  return (
    <div className="border rounded-md shadow">
      <div className="border-b px-5 py-3">
        <h2 className="font-semibold">Task by Priority</h2>
      </div>
      <StackedBarChart data={priorityData} />
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
