'use client'

import React from 'react'
import { DataTable } from '@/components/table/data-table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { masterService, tasksService } from '@/services/index.mjs'
import { createTaskSummaryColumns } from './task-summary-columns'
import TaskOverlay from '../../dashboard/_components/task-overlay'
import { Button } from '@/components/ui/button'

export default function TaskSummaryTable() {
  const queryClient = useQueryClient()
  const [open, setOpen] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState(null)
  const [selectedMilestone, setSelectedMilestone] = React.useState(null)

  // Fetch data
  const taskSummaryQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: tasksService.getAll,
  })

  const statusQuery = useQuery({
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
  const handleCreateTask = () => {
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
        id_project: formData.project_id.id_project,
        payload: formData,
      })
    }
  }

  const columns = createTaskSummaryColumns({ handleEdit: handleEditTask })

  return (
    <div className="space-y-2">
      <Button size="sm" onClick={handleCreateTask}>
        Add
      </Button>
      <DataTable columns={columns} data={taskSummaryQuery.data || []} />

      <TaskOverlay
        open={open}
        onOpenChange={setOpen}
        task={selectedTask}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isLoading || updateMutation.isLoading}
      />
    </div>
  )
}
