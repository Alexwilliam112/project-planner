'use client'

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function TaskSummaryWidget({ workdaysQuery, totalCapacity }) {
  if (workdaysQuery?.isPending) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
      <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
        <p className="text-lg text-muted-foreground">Holidays</p>
        <p className="text-2xl font-semibold">{workdaysQuery?.data?.holidays}</p>
      </div>

      <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
        <p className="text-lg text-muted-foreground">Max MH</p>
        <p className="text-2xl font-semibold">{workdaysQuery?.data?.max_mh}</p>
      </div>

      <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
        <p className="text-lg text-muted-foreground">Nett Workdays</p>
        <p className="text-2xl font-semibold">{workdaysQuery?.data?.nett_work_days}</p>
      </div>

      <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
        <p className="text-lg text-muted-foreground">Weekend</p>
        <p className="text-2xl font-semibold">{workdaysQuery?.data?.weekend}</p>
      </div>

      <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
        <p className="text-lg text-muted-foreground">Total Capacity</p>
        <p className="text-2xl font-semibold">{totalCapacity}</p>
      </div>
    </div>
  )
}
