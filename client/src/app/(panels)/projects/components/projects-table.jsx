'use client'

import { DataTable } from '@/components/table/data-table'
import { projectsColumns } from './projects-columns'
import { mockProjects } from '@/lib/dummy/projects.mjs'

export default function ProjectsTable() {
  return <DataTable columns={projectsColumns} data={mockProjects} />
}
