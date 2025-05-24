'use client'

import { Form } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { projectsService } from '@/services/index.mjs'
import InputField from '@/components/fields/input-field'
import SelectField from '@/components/fields/select-field'
import TextareaField from '@/components/fields/textarea-field'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CalendarField from '@/components/fields/calendar-field'

const createProjectSchema = z.object({
  zoho_url: z.string(),
  project_owner_id: z.string(),
  product_id: z.string(),
  category_id: z.string(),
  priority_id: z.string(),
  status_id: z.string(),
  note: z.string(),
  date_start: z.number(),
  date_end: z.number(),
  name: z.string(),
  company: z.string(),
  est_mh: z.coerce.number(),
  division_id: z.string(),
})

export default function ProjectsCreateOverlay() {
  const createMutation = useMutation({
    mutationKey: ['create-project'],
    mutationFn: projectsService.create,
  })

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
  })

  const onSubmit = (values) => {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <InputField name={'name'} label={'Project Name'} />
            <InputField name={'company'} label={'Company'} />
            <InputField name={'zoho_url'} label={'Zoho URL'} />
            <SelectField name={'project_owner_id'} label={'Project Owner'} />
            <SelectField name={'product_id'} label={'Project Type'} />
            <SelectField name={'division_id'} label={'Division'} />
            <SelectField name={'category_id'} label={'Category'} />
            <SelectField name={'priority_id'} label={'Priority'} />
            <SelectField name={'status_id'} label={'Status'} />
            <CalendarField name={'date_start'} label={'Start Date'} />
            <CalendarField name={'date_end'} label={'End Date'} />
            <InputField name={'est_mh'} label={'Man-hour Estimation'} type="number" />
            <div className="col-span-1 md:col-span-2">
              <TextareaField name={'note'} label={'Note'} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
