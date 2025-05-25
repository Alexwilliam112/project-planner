'use client'

import { Board } from './_components/board'
import Charts from './_components/charts'

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      <Charts />

      <div className="overflow-x-auto min-h-screen">
        <Board />
      </div>
    </main>
  )
}
