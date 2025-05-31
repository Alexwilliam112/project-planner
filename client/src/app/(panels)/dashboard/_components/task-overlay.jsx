'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { DateTimeRangeFormField, DateTimeRangePicker } from '@/components/ui/date-range-picker'
import { useQuery } from '@tanstack/react-query'
import { masterService, tasksService } from '@/services/index.mjs'
import CalendarField from '@/components/fields/calendar-field'
import SelectField from '@/components/fields/select-field'
import { utc7Offset } from '@/lib/utils'
import { toast } from 'sonner'
import { format } from 'date-fns'

const taskSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  note: z.string().optional(),
  est_mh: z.coerce.number().min(0, 'Must be positive'),
  date_range: z.object({
    from: z.date(),
    to: z.date(),
  }),
  deadline: z.date(),
  project_id: z.string(),
  assignee_id: z.string().min(1, 'Assignee is required'),
  priority_id: z.string().optional(),
  milestone_id: z.string().optional(),
  status_id: z.string().optional(),
  product_id: z.string().optional(),
  progress: z.coerce.number().optional(),
})

export default function TaskOverlay({
  task = {},
  open,
  onOpenChange,
  onSubmit,
  onDelete,
  isSubmitting,
  isDeleting,
}) {
  const form = useForm({
    resolver: zodResolver(
      taskSchema.superRefine((data, ctx) => {
        if (task) {
          if (!data.priority_id || data.priority_id.trim() === '') {
            ctx.addIssue({
              path: ['priority_id'],
              code: z.ZodIssueCode.custom,
            })
          }

          if (!data.status_id || data.status_id.trim() === '') {
            ctx.addIssue({
              path: ['status_id'],
              code: z.ZodIssueCode.custom,
            })
          }

          if (data.progress < 0 || data.progress === undefined) {
            ctx.addIssue({
              path: ['progress'],
              code: z.ZodIssueCode.custom,
            })
          }
        }
      })
    ),
    defaultValues: {
      name: task?.name || '',
      note: task?.note || '',
      est_mh: task?.est_mh || 0,
      date_range: {
        from: task?.date_start ? new Date(task?.date_start) : new Date(),
        to: task?.date_end ? new Date(task?.date_end) : new Date(),
      },
      deadline: task?.deadline ? new Date(task?.deadline) : new Date(),
      priority_id: task?.priority_id?.id || '',
      assignee_id: task?.assignee_id?.id || '',
    },
  })

  const projectId = form.watch('project_id')
  const assignee_id = form.watch('assignee_id')
  const est_mh = form.watch('est_mh')

  const priorityQuery = useQuery({
    queryKey: ['priority'],
    queryFn: masterService.getPriorities,
  })
  const assigneeQuery = useQuery({
    queryKey: ['assignee'],
    queryFn: masterService.getResources,
  })
  const projectsQuery = useQuery({
    queryKey: ['select-project'],
    queryFn: masterService.getProjects,
  })
  const mileStoneQuery = useQuery({
    queryKey: ['milestones', { project_id: projectId }],
    queryFn: () => masterService.getMilestone({ params: { id_project: projectId } }),
  })
  const taskStatusQuery = useQuery({
    queryKey: ['task-status'],
    queryFn: () => masterService.getStatuses({ params: { type: 'TASK' } }),
  })
  const prouductQuery = useQuery({
    queryKey: ['products'],
    queryFn: masterService.getProducts,
  })
  const defaultStartDateQuery = useQuery({
    queryKey: ['tasksService.getDefaultStartDate', assignee_id],
    queryFn: () => tasksService.getDefaultStartDate({ params: { assignee_id } }),
    enabled: !!assignee_id,
  })
  const dayOffQuery = useQuery({
    queryKey: ['tasksService.getHolidaysAndTimeoff', assignee_id],
    queryFn: () => tasksService.getHolidaysAndTimeoff({ params: { assignee_id } }),
    enabled: !!assignee_id,
  })

  const getBorderColor = (fieldName) =>
    form.formState.errors[fieldName] ? 'border-red-500' : 'border-gray-300'

  const handleSubmit = (values) => {
    const assignee_id = assigneeQuery.data?.find((a) => a.id === values.assignee_id)
    const project_id = projectsQuery.data?.find((a) => a.id === values.project_id)
    const priority_id = priorityQuery.data?.find((a) => a.id === values.priority_id)
    const status_id = taskStatusQuery.data?.find((a) => a.id === values.status_id)
    const milestone_id = mileStoneQuery.data?.find((a) => a.id === values.milestone_id)
    const product_id = prouductQuery.data?.find((a) => a.id === values.product_id)
    const date_start = new Date(values.date_range.from).getTime() + utc7Offset
    const date_end = new Date(values.date_range.to).getTime() + utc7Offset
    const deadline = new Date(values.deadline).getTime() + utc7Offset

    const submitValues = {
      ...values,
      assignee_id: {
        id: assignee_id.id,
        name: assignee_id.name,
      },
      project_id: {
        id: project_id.id,
        name: project_id.name,
      },
      date_start,
      date_end,
      deadline,
    }
    submitValues.priority_id = priority_id
      ? {
          id: priority_id.id,
          name: priority_id.name,
          color: priority_id.color,
        }
      : undefined
    submitValues.status_id = status_id
      ? {
          id: status_id.id,
          name: status_id.name,
          color: status_id.color,
        }
      : undefined
    submitValues.milestone_id = milestone_id
      ? {
          id: milestone_id.id,
          name: milestone_id.name,
          color: milestone_id.color,
        }
      : undefined
    submitValues.product_id = product_id
      ? {
          id: product_id.id,
          name: product_id.name,
        }
      : undefined

    onSubmit(submitValues)
    form.reset()
  }
  const handleDelete = () => {
    onDelete()
  }

  React.useEffect(() => {
    form.reset({
      name: task?.name || '',
      note: task?.note || '',
      est_mh: task?.est_mh || 0,
      date_range: {
        from: task?.date_start ? new Date(task?.date_start) : new Date(),
        to: task?.date_end ? new Date(task?.date_end) : new Date(),
      },
      deadline: task?.deadline ? new Date(task?.deadline) : new Date(),
      priority_id: task?.priority_id?.id || '',
      assignee_id: task?.assignee_id?.id || '',
      project_id: task?.project_id?.id || '',
      milestone_id: task?.milestone_id?.id || '',
      status_id: task?.status_id?.id || '',
      product_id: task?.product_id?.id || '',
      progress: task?.progress || 0,
    })
  }, [task])

  const { errors } = form.formState
  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error(errors)
      toast.error('Please fix the errors in the form before submitting.', {
        description: Object.values(errors)
          .map((error) => error.message)
          .join(', '),
      })
    }
  }, [errors])

  React.useEffect(() => {
    if (defaultStartDateQuery.data && dayOffQuery.data) {
      const calculateDates = async () => {
        const startDate = new Date(defaultStartDateQuery.data.date_start)
        const estimatedHours = est_mh || 0 // Use getValues instead of watch

        // First set the start date
        await form.setValue('date_range.from', startDate, { shouldValidate: true })

        // Process holidays/day offs
        const dayOffDates = [...dayOffQuery.data.holidays, ...dayOffQuery.data.timeoffs].map(
          (item) => new Date(item.date).setHours(0, 0, 0, 0)
        ) // Compare dates by timestamp

        const calculateEndDate = (start, totalHours = 0) => {
          const WORKING_HOURS_PER_DAY = 9
          const WORKING_START_HOUR = 9
          const WORKING_END_HOUR = 18

          let currentDate = new Date(start) + utc7Offset
          let remainingHours = totalHours

          // Normalize start time
          let currentHour = Math.max(currentDate.getHours(), WORKING_START_HOUR)
          if (currentDate.getHours() >= WORKING_END_HOUR) {
            currentDate.setDate(currentDate.getDate() + 1)
            currentHour = WORKING_START_HOUR
          }
          currentDate.setHours(currentHour, 0, 0, 0)

          // Helper to check if date is a working day
          const isWorkingDay = (date) => {
            const day = date.getDay()
            const dateTimestamp = date.setHours(0, 0, 0, 0)
            return day !== 0 && day !== 6 && !dayOffDates.includes(dateTimestamp)
          }

          // Skip initial non-working days
          while (!isWorkingDay(currentDate)) {
            currentDate.setDate(currentDate.getDate() + 1)
            currentDate.setHours(WORKING_START_HOUR, 0, 0, 0)
          }

          while (remainingHours > 0) {
            if (!isWorkingDay(currentDate)) {
              currentDate.setDate(currentDate.getDate() + 1)
              currentDate.setHours(WORKING_START_HOUR, 0, 0, 0)
              continue
            }

            const availableHours = WORKING_END_HOUR - currentDate.getHours()
            const hoursToAdd = Math.min(availableHours, remainingHours)

            if (hoursToAdd > 0) {
              currentDate.setHours(currentDate.getHours() + hoursToAdd)
              remainingHours -= hoursToAdd
            }

            if (remainingHours > 0) {
              currentDate.setDate(currentDate.getDate() + 1)
              currentDate.setHours(WORKING_START_HOUR, 0, 0, 0)
            }
          }

          // Cap at end of working day if needed
          if (currentDate.getHours() >= WORKING_END_HOUR) {
            currentDate.setHours(WORKING_END_HOUR - 1, 59, 59)
          }

          return currentDate
        }

        if (estimatedHours > 0) {
          const endDate = calculateEndDate(startDate, estimatedHours)
          await form.setValue('date_range.to', endDate, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })
        }
      }

      calculateDates()
    }
  }, [defaultStartDateQuery.data, dayOffQuery.data, form, est_mh]) // Removed est_mh dependency

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80vw]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-h-[80vh] overflow-auto pb-10 pl-2 pr-1"
          >
            <DialogHeader>
              <DialogTitle>{task?._id ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Task name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SelectField
                label={'Assignee'}
                name={'assignee_id'}
                optionLabel="name"
                optionValue="id"
                options={assigneeQuery.data || []}
                placeholder="Task assignee"
              />

              <FormField
                control={form.control}
                name="est_mh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Hours</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SelectField
                label={'Project'}
                name={'project_id'}
                optionLabel="name"
                optionValue="id"
                options={projectsQuery.data || []}
                placeholder="Task project"
              />

              <SelectField
                label={'Milestone'}
                name={'milestone_id'}
                optionLabel="name"
                optionValue="id"
                disabled={!form.watch('project_id')}
                options={mileStoneQuery.data || []}
                placeholder="Task milestone"
              />

              <DateTimeRangeFormField
                name="date_range"
                control={form.control}
                label="Start date - end date"
                required={true}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input disabled value={format(form.getValues('date_range.to'), 'PPP')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Task description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {task && (
                <>
                  <SelectField
                    label={'Product'}
                    name={'product_id'}
                    optionLabel="name"
                    optionValue="id"
                    options={prouductQuery.data || []}
                    placeholder=""
                  />

                  <SelectField
                    label={'Priority'}
                    name={'priority_id'}
                    optionLabel="name"
                    optionValue="id"
                    options={priorityQuery.data || []}
                  />

                  <SelectField
                    label={'Status'}
                    name={'status_id'}
                    optionLabel="name"
                    optionValue="id"
                    options={taskStatusQuery.data || []}
                  />

                  <FormField
                    control={form.control}
                    name="progress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Progress</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <DialogFooter>
              <div className="flex flex-col w-full gap-2 mt-4">
                <Button className={'w-full'} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Task'}
                </Button>
                <Button
                  className={'w-full'}
                  type="button"
                  variant={'destructive'}
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Task'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
