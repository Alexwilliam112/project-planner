'use client'

import ResourceCapacityTable from './_components/resource-capacity-table'
import TaskSummaryTable from './_components/task-summary-table'

export default function TaskSummaryPage() {
  return (
    <main className="space-y-4">
      <ResourceCapacityTable />

      <TaskSummaryTable />
    </main>
  )
}
