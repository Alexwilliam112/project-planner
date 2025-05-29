'use client'

import { DataTable } from '@/components/table/data-table'
import { projectsColumns } from './projects-columns'
import { useQuery } from '@tanstack/react-query'
import { projectsService } from '@/services'
import { masterService } from '@/services'
import { useState, useEffect } from 'react'
import { DatePickerFilter } from '@/components/filter/date-picker-filter'
import { SelectFilter } from '@/components/filter/select-filter'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import ProjectsOverlay from './projects-overlay'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

export default function ProjectsTable() {
  const [globalFilter, setGlobalFilter] = useState('')
  const debouncedSearch = useDebounce(globalFilter, 500)

  const [division_id, setDivisionId] = useState('')
  const [category_id, setCategoryId] = useState('')
  const [project_owner_id, setProjectOwnerId] = useState('')
  const [priority_id, setPriorityId] = useState('')
  const [status_id, setStatusId] = useState('')
  const [date_start, setDateStart] = useState('')
  const [date_end, setDateEnd] = useState('')

  const handleResetFilters = () => {
    setDivisionId('')
    setCategoryId('')
    setProjectOwnerId('')
    setPriorityId('')
    setStatusId('')
    setDateStart('')
    setDateEnd('')
    setGlobalFilter('')
  }

  const projectsQuery = useQuery({
    queryKey: [
      'projects',
      {
        division_id,
        category_id,
        project_owner_id,
        priority_id,
        status_id,
        date_start,
        date_end,
      },
    ],
    queryFn: () =>
      projectsService.getAll({
        params: {
          division_id,
          category_id,
          project_owner_id,
          priority_id,
          status_id,
          date_start,
          date_end,
        },
      }),
  })
  const statusQuery = useQuery({
    queryKey: ['task-status'],
    queryFn: () => masterService.getStatuses({ params: { type: 'PROJECT' } }),
  })
  const divisionQuery = useQuery({
    queryKey: ['division'],
    queryFn: masterService.getDivisions,
  })
  const priorityQuery = useQuery({
    queryKey: ['priority'],
    queryFn: masterService.getPriorities,
  })
  const projectOwnerQuery = useQuery({
    queryKey: ['squad'],
    queryFn: masterService.getProjectOwner,
  })
  const categoryQuery = useQuery({
    queryKey: ['category'],
    queryFn: masterService.getCategories,
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <DatePickerFilter
          date={date_start}
          setDate={setDateStart}
          placeholder="Filter by date start"
        />

        <DatePickerFilter date={date_end} setDate={setDateEnd} placeholder="Filter by date end" />

        <SelectFilter
          value={division_id}
          onValueChange={setDivisionId}
          placeholder="Search by division..."
          options={divisionQuery.data || []}
        />

        <SelectFilter
          value={category_id}
          onValueChange={setCategoryId}
          placeholder="Search by category..."
          options={categoryQuery.data || []}
        />

        <SelectFilter
          value={project_owner_id}
          onValueChange={setProjectOwnerId}
          placeholder="Search by project owner..."
          options={projectOwnerQuery.data || []}
        />

        <SelectFilter
          value={priority_id}
          onValueChange={setPriorityId}
          placeholder="Search by priority..."
          options={priorityQuery.data || []}
        />

        <SelectFilter
          value={status_id}
          onValueChange={setStatusId}
          placeholder="Search by status..."
          options={statusQuery.data || []}
        />

        <Input
          className="text-sm"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search by name..."
        />

        <Button variant="secondary" className="w-full" onClick={handleResetFilters}>
          <RefreshCcw /> Reset filter
        </Button>
      </div>

      <div>
        <ProjectsOverlay />
      </div>

      {projectsQuery.isPending ? (
        <Skeleton className="w-full h-[80vh]" />
      ) : (
        <DataTable
          columns={projectsColumns}
          data={projectsQuery.data || []}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />
      )}
    </div>
  )
}
