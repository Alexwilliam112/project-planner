'use client'

import { Form } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const idName = z.object({
  id: z.string(),
  name: z.string(),
})

const badge = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
})

const createProjectSchema = z.object({
  zoho_url: z.string(),
  project_owner_id: idName,
  product_id: badge,
  category_id: idName,
  priority_id: badge,
  status_id: badge,
  note: z.string(),
  date_start: z.number(),
  date_end: z.number(),
  name: z.string(),
  company: z.string(),
  est_mh: z.number(),
  division_id: idName,
})

export default function ProjectsCreateOverlay() {
  const form = useForm({
    resolver: zodResolver(createProjectSchema),
  })

  const onSubmit = (values: z.infer<typeof createProjectSchema>) => {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2"
      ></form>
    </Form>
  )
}
