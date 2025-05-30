'use client'

import React from 'react'
import { DataTable } from '@/components/table/data-table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { tasksService } from '@/services/index.mjs'
import { createTaskSummaryColumns } from './task-summary-columns'
import TaskOverlay from '../../dashboard/_components/task-overlay-read-only'
import { toast } from 'sonner'

export default function TaskSummaryTable({ taskSummaryQuery }) {
  const queryClient = useQueryClient()

  // States

  const [open, setOpen] = React.useState(false)
  const [selectedTask, setSelectedTask] = React.useState(null)

  // Mutations
  const createMutation = useMutation({
    mutationFn: tasksService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      toast.success('Task created successfully')
      setOpen(false)
    },
    onError: (error) => {
      toast.error(`Error creating task: ${error.message}`)
    },
  })
  const updateMutation = useMutation({
    mutationFn: tasksService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      toast.success('Task updated successfully')
      setOpen(false)
    },
    onError: (error) => {
      toast.error(`Error updating task: ${error.message}`)
    },
  })
  const deleteMutation = useMutation({
    mutationFn: tasksService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      toast.success('Task deleted successfully')
      setOpen(false)
    },
    onError: (error) => {
      toast.error(`Error deleting task: ${error.message}`)
    },
  })

  // Handlers
  const handleEditTask = (task) => {
    setSelectedTask(task)
    setOpen(true)
  }

  const handleSubmit = (formData) => {
    if (selectedTask) {
      updateMutation.mutate({ id_task: selectedTask.id_task, payload: formData })
    } else {
      createMutation.mutate({
        id_project: formData.project_id.id_project,
        payload: formData,
      })
    }
  }

  const handleDelete = async () => {
    console.log({ selectedTask })
    await deleteMutation.mutateAsync({ id_task: selectedTask.id_task })
  }

  const columns = createTaskSummaryColumns({ handleEdit: handleEditTask })

  return (
    <div className="space-y-2 mb-30">
      <DataTable columns={columns} data={taskSummaryQuery.data || []} />

      <TaskOverlay
        open={open}
        onOpenChange={setOpen}
        task={selectedTask}
        isSubmitting={
          createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading
        }
        isDeleting={deleteMutation.isLoading}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  )
}
