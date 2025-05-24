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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2">
        <InputField name={'zoho_url'} label={'Zoho URL'} />
        <SelectField name={'project_owner_id'} label={'Project Owner'} />
        <SelectField name={'product_id'} label={'Project Type'} />
        <SelectField name={'category_id'} label={'Category'} />
        <SelectField name={'priority_id'} label={'Priority'} />
        <SelectField name={'status_id'} label={'Status'} />
        <TextareaField name={'note'} label={'Note'} />
      </form>
    </Form>
  )
}
