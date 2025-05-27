'use client'

import ProgressChart from './progress-chart'
import PriorityChart from './priority-chart'

export default function Charts() {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        <ProgressChart />
        <PriorityChart />
        {/* <StatusChart /> */}
      </div>
    </div>
  )
}
