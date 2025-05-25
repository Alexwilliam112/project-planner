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
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useQuery } from '@tanstack/react-query'
import { masterService } from '@/services/index.mjs'
import CalendarField from '@/components/fields/calendar-field'
import SelectField from '@/components/fields/select-field'
import { projectsService } from '@/services'
import { utc7Offset } from '@/lib/utils'

const taskSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  note: z.string().optional(),
  est_mh: z.coerce.number().min(0, 'Must be positive'),
  date_range: z.object({
    from: z.date(),
    to: z.date(),
  }),
  deadline: z.date(),
  priority_id: z.string().min(1, 'Priority is required'),
  assignee_id: z.string().min(1, 'Assignee is required'),
})

export default function TaskOverlay({
  task = {},
  milestone,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}) {
  const priorityQuery = useQuery({
    queryKey: ['priority'],
    queryFn: masterService.getPriorities,
  })

  const assigneeQuery = useQuery({
    queryKey: ['assignee'],
    queryFn: masterService.getResources,
  })

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getAll,
  })
  const statusesQuery = useQuery({
    queryKey: ['task-status'],
    queryFn: () => masterService.getStatuses({ params: { type: 'MILESTONE' } }),
  })

  const form = useForm({
    resolver: zodResolver(taskSchema),
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

  const getBorderColor = (fieldName) =>
    form.formState.errors[fieldName] ? 'border-red-500' : 'border-gray-300'

  const handleSubmit = (values) => {
    const milestone_id = statusesQuery.data.find((a) => a.id === milestone.id)
    const assignee_id = assigneeQuery.data?.find((a) => a.id === values.assignee_id)
    const project_id = projectsQuery.data?.find((a) => a.id === values.project_id)
    const priority_id = projectsQuery.data?.find((a) => a.id === values.priority_id)
    const date_start = new Date(values.date_range.from).getTime() + utc7Offset
    const date_end = new Date(values.date_range.to).getTime() + utc7Offset

    onSubmit({
      ...values,
      milestone_id,
      assignee_id,
      project_id,
      priority_id,
      date_start,
      date_end,
    })
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
    })
  }, [task])

  const watchRange = form.watch('date_start')
  React.useEffect(() => {
    console.log(watchRange)
  }, [watchRange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-h-[90vh] overflow-auto pb-10 pl-2 pr-1"
          >
            <DialogHeader>
              <DialogTitle>{task?._id ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Task name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date - End Date</FormLabel>
                    <FormControl>
                      <DateRangePicker
                        value={field.value}
                        onChange={(range) => field.onChange(range)}
                        placeholder="Select a date range"
                        className={getBorderColor('selectedRange')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Task description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CalendarField label={'Deadline'} name={'deadline'} />

              <SelectField
                label={'Project'}
                name={'project_id'}
                optionLabel="name"
                optionValue="id_project"
                options={projectsQuery.data || []}
              />

              <SelectField
                label={'Priority'}
                name={'priority_id'}
                optionLabel="name"
                optionValue="id"
                options={priorityQuery.data || []}
              />

              <SelectField
                label={'Assignee'}
                name={'assignee_id'}
                optionLabel="name"
                optionValue="id"
                options={assigneeQuery.data || []}
              />
            </div>

            <DialogFooter>
              <Button className={'w-full'} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Task'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
