'use client'

import { ChartContainer } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function SimpleBarChart({ data }) {
  return (
    <ChartContainer config={{}} className="min-h-[200px] w-full aspect-video">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Bar dataKey="uv" fill="#82ca9d" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </ChartContainer>
  )
}
