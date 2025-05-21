'use client'

import { Board } from './_components/board'
import Charts from './_components/charts'

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      <Charts />
      <Board />
    </main>
  )
}
