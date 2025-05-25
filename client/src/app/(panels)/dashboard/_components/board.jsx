'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { masterService, tasksService } from '@/services/index.mjs'
import TaskCard from './task-card'
import TaskOverlay from './task-overlay'

export function Board() {
  const queryClient = useQueryClient()
  const [open, setOpen] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState(null)
  const [selectedMilestone, setSelectedMilestone] = React.useState(null)

  // Fetch data
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: tasksService.getAll,
  })

  const { data: statuses, isLoading: statusesLoading } = useQuery({
    queryKey: ['task-status'],
    queryFn: () => masterService.getStatuses({ params: { type: 'TASK' } }),
  })

  // Mutations
  const createMutation = useMutation({
    mutationFn: tasksService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      setOpen(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: tasksService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      setOpen(false)
    },
  })

  // Handlers
  const handleCreateTask = (milestone) => {
    setSelectedMilestone(milestone)
    setSelectedTask(null)
    setOpen(true)
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setSelectedMilestone(task.milestone_id)
    setOpen(true)
  }

  const handleSubmit = (formData) => {
    if (selectedTask) {
      updateMutation.mutate({ id_task: formData.id_task, payload: formData })
    } else {
      createMutation.mutate({
        payload: formData,
      })
    }
  }

  // Loading state
  if (tasksLoading || statusesLoading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="relative flex h-fit w-full shrink">
      {statuses?.map((status) => (
        <div
          key={status._id}
          className="flex min-h-full w-[280px] flex-none flex-col border-r last:border-r-0"
        >
          {/* Column Header */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between p-2"
            style={{
              backgroundColor: status.color || '#f3f4f6',
              color: '#fff',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                {renderStatusIcon(status.status_type)}
              </div>
              <span className="text-sm font-medium">{status.name}</span>
              <Badge variant="secondary" className="bg-white/20 text-xs">
                {tasks?.filter((task) => task.status_id.id === status.id).length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/20"
              onClick={() => handleCreateTask(status)}
            >
              + Add
            </Button>
          </div>

          {/* Column Content */}
          <div className="flex flex-1 flex-col gap-3 p-2">
            {tasks
              ?.filter((task) => task.status_id.id === status.id)
              .map((task) => (
                <TaskCard key={task._id} task={task} onClick={() => handleEditTask(task)} />
              ))}
          </div>
        </div>
      ))}

      <TaskOverlay
        open={open}
        onOpenChange={setOpen}
        task={selectedTask}
        milestone={selectedMilestone}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isLoading || updateMutation.isLoading}
      />
    </div>
  )
}

// Helper function (keep your existing implementation)
function renderStatusIcon(statusType) {
  switch (statusType) {
    case 'BACKLOG':
      return (
        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="4" />
        </svg>
      )
    case 'PROGRESS':
      return (
        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    case 'COMPLETE':
      return (
        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    default:
      return null
  }
}
