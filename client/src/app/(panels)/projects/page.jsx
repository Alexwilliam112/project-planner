'use client'

import ProjectsOverlay from './components/projects-overlay'
import ProjectsTable from './components/projects-table'

export default function ProjectsPage() {
  return (
    <main className="space-y-4">
      <ProjectsOverlay />
      <ProjectsTable />
    </main>
  )
}
