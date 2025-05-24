'use client'

import ProgressChart from './progress-chart'
import PriorityChart from './priority-chart'
import StatusChart from './status-chart'

export default function Charts() {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2">
        <ProgressChart />
        <PriorityChart />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatusChart />
      </div>
    </div>
  )
}
