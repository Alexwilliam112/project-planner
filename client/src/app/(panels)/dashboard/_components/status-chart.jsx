'use client'

import SimpleBarChart from '@/components/charts/bar-chart'

export default function StatusChart() {
  return (
    <div className="border rounded-md shadow">
      <div className="border-b px-5 py-3">
        <h2 className="font-semibold">Task by Priority</h2>
      </div>
      <SimpleBarChart data={statusData} />
    </div>
  )
}

const statusData = [
  {
    name: 'Not Started',
    uv: 4,
  },
  {
    name: 'In Progress',
    uv: 3,
  },
  {
    name: 'Complete',
    uv: 2,
  },
  {
    name: 'Overdue',
    uv: 1,
  },
  {
    name: 'Pending',
    uv: 5,
  },
]
