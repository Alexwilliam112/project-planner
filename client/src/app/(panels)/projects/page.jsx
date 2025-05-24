'use client'

import ProjectsCreateOverlay from './components/projects-create-overlay'
import ProjectsTable from './components/projects-table'

export default function ProjectsPage() {
  return (
    <main className="space-y-4">
      <ProjectsCreateOverlay />
      <ProjectsTable />
    </main>
  )
}
