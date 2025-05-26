'use client'

import React from 'react'
import ResourceCapacityTable from './_components/resource-capacity-table'
import TaskSummaryTable from './_components/task-summary-table'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format } from 'date-fns'
import { CalendarIcon, RefreshCcw } from 'lucide-react'
import { cn, utc7Offset } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { masterService, tasksService } from '@/services/index.mjs'

export default function TaskSummaryPage() {
  // Query Params
  const date = new Date()
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)

  const [search, setSearch] = React.useState('')
  const [division_id, setDivisionId] = React.useState('')
  const [assignee_id, setAssigneeId] = React.useState('')
  const [priority_id, setPriorityId] = React.useState('')
  const [status_id, setStatusId] = React.useState('')
  const [squad_id, setSquadId] = React.useState('')
  const [date_start, setDateStart] = React.useState(firstDay)
  const [date_end, setDateEnd] = React.useState(lastDay)

  const taskSummaryQuery = useQuery({
    queryKey: [
      'task-summary',
      {
        search,
        division_id,
        assignee_id,
        priority_id,
        status_id,
        squad_id,
        date_start,
        date_end,
      },
    ],
    queryFn: () =>
      tasksService.getAll({
        params: {
          search,
          division_id,
          assignee_id,
          priority_id,
          status_id,
          squad_id,
          date_start: new Date(date_start).getTime() + utc7Offset,
          date_end: new Date(date_end).getTime() + utc7Offset,
        },
      }),
  })
  const resourceCapacityQuery = useQuery({
    queryKey: [
      'resource-capacity',
      {
        search,
        division_id,
        assignee_id,
        priority_id,
        status_id,
        squad_id,
        date_start,
        date_end,
      },
    ],
    queryFn: () =>
      tasksService.getResourceCapacity({
        params: {
          search,
          division_id,
          assignee_id,
          priority_id,
          status_id,
          squad_id,
          date_start: new Date(date_start).getTime() + utc7Offset,
          date_end: new Date(date_end).getTime() + utc7Offset,
        },
      }),
  })
  const wordaysQuery = useQuery({
    queryKey: [
      'workdays',
      {
        search,
        division_id,
        assignee_id,
        priority_id,
        status_id,
        squad_id,
        date_start,
        date_end,
      },
    ],
    queryFn: () =>
      tasksService.getWorkDays({
        params: {
          search,
          division_id,
          assignee_id,
          priority_id,
          status_id,
          squad_id,
          date_start: new Date(date_start).getTime() + utc7Offset,
          date_end: new Date(date_end).getTime() + utc7Offset,
        },
      }),
  })
  const statusQuery = useQuery({
    queryKey: ['task-status'],
    queryFn: () => masterService.getStatuses({ params: { type: 'TASK' } }),
  })
  const divisionQuery = useQuery({
    queryKey: ['division'],
    queryFn: masterService.getDivisions,
  })
  const assigneeQuery = useQuery({
    queryKey: ['assignee'],
    queryFn: masterService.getResources,
  })
  const priorityQuery = useQuery({
    queryKey: ['priority'],
    queryFn: masterService.getPriorities,
  })
  const squadQuery = useQuery({
    queryKey: ['squad'],
    queryFn: masterService.getProjectOwner,
  })

  const sumCurrentMh = resourceCapacityQuery.data?.reduce((acc, obj) => acc + obj.current_mh, 0)
  const sumTotalMh = resourceCapacityQuery.data?.reduce((acc, obj) => acc + obj.total_mh, 0)

  const handleReset = () => {
    setSearch('')
    setDivisionId('')
    setAssigneeId('')
    setPriorityId('')
    setStatusId('')
    setSquadId('')
    setDateStart(firstDay)
    setDateEnd(lastDay)
  }

  return (
    <main className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />

        <SelectFilter
          value={division_id}
          onValueChange={setDivisionId}
          placeholder="Search by division..."
          options={divisionQuery.data || []}
        />

        <SelectFilter
          value={assignee_id}
          onValueChange={setAssigneeId}
          placeholder="Search by assignee..."
          options={assigneeQuery.data || []}
        />

        <SelectFilter
          value={priority_id}
          onValueChange={setPriorityId}
          placeholder="Search by priority..."
          options={priorityQuery.data || []}
        />

        <SelectFilter
          value={squad_id}
          onValueChange={setSquadId}
          placeholder="Search by squad..."
          options={squadQuery.data || []}
        />

        <SelectFilter
          value={status_id}
          onValueChange={setStatusId}
          placeholder="Search by status..."
          options={statusQuery.data || []}
        />

        <DatePickerFilter
          date={date_start}
          setDate={setDateStart}
          placeholder="Filter by date start"
        />

        <DatePickerFilter date={date_end} setDate={setDateEnd} placeholder="Filter by date end" />

        <Button variant="secondary" className="w-full" onClick={handleReset}>
          <RefreshCcw /> Reset filter
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
          <p className="text-lg text-muted-foreground">Holidays</p>
          <p className="text-2xl font-semibold">{wordaysQuery?.data?.holidays}</p>
        </div>

        <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
          <p className="text-lg text-muted-foreground">Max MH</p>
          <p className="text-2xl font-semibold">{wordaysQuery?.data?.holidays}</p>
        </div>

        <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
          <p className="text-lg text-muted-foreground">Nett Workdays</p>
          <p className="text-2xl font-semibold">{wordaysQuery?.data?.nett_work_days}</p>
        </div>

        <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
          <p className="text-lg text-muted-foreground">Weekend</p>
          <p className="text-2xl font-semibold">{wordaysQuery?.data?.weekend}</p>
        </div>

        <div className="flex flex-col w-full text-center border rounded-md py-3 px-2">
          <p className="text-lg text-muted-foreground">Total Capacity</p>
          <p className="text-2xl font-semibold">
            {Number(sumCurrentMh && sumTotalMh ? sumCurrentMh / sumTotalMh : 0).toFixed(2)}
          </p>
        </div>
      </div>

      <ResourceCapacityTable resourceCapacityQuery={resourceCapacityQuery} />

      <TaskSummaryTable taskSummaryQuery={taskSummaryQuery} />
    </main>
  )
}

function SelectFilter({ value, onValueChange, options, placeholder }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.id} value={o.id}>
            {o.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function DatePickerFilter({ date, setDate, placeholder }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
