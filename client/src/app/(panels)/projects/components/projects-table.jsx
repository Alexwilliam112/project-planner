'use client'

import { DataTable } from '@/components/table/data-table'
import { projectsColumns } from './projects-columns'
import { useQuery } from '@tanstack/react-query'
import { projectsService } from '@/services'
import { useEffect } from 'react'

export default function ProjectsTable() {
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
  })

  return <DataTable columns={projectsColumns} data={projectsQuery.data || []} />
}
