'use client'

import { DataTable } from '@/components/table/data-table'
import { capacityPlanColumns } from './capacity-plan-columns'
import { capacityPlanningData } from '@/lib/dummy/capacity-plan.mjs'

export default function CapacityPlanTables() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ].map((item) => (
        <div className="space-y-2 pt-8" key={item}>
          <h2 className="text-2xl font-semibold">{item}</h2>
          <DataTable columns={capacityPlanColumns} data={capacityPlanningData} />
        </div>
      ))}
    </div>
  )
}
