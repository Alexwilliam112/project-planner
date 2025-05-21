'use client'

import { ChartContainer } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function StackedBarChart({ data }) {
  return (
    <ChartContainer config={{}} className="min-h-[200px] w-full">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        <XAxis dataKey="name" />
        <Tooltip />
      </BarChart>
    </ChartContainer>
  )
}
