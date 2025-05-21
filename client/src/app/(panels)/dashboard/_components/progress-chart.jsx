'use client'

import CustomActivePieChart from '@/components/charts/custom-active-pie-chart'

export default function ProgressChart() {
  return (
    <div className="border rounded-md shadow">
      <div className="border-b px-5 py-3">
        <h2 className="font-semibold">Task Progress</h2>
      </div>
      <CustomActivePieChart data={customActivePieData} />
    </div>
  )
}

const customActivePieData = [
  { name: 'Complete', value: 700 },
  { name: 'On Progress', value: 300 },
]
