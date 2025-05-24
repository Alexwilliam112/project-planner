'use client'

import { Form } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import { masterService } from '@/services/index.mjs'

const createProjectSchema = z.object({
  zoho_url: z.string(),
  project_owner_id: z.string(),
  product_id: z.string(),
  category_id: z.string(),
  priority_id: z.string(),
  status_id: z.string(),
  note: z.string(),
  date_start: z.date(),
  date_end: z.date(),
  name: z.string(),
  company: z.string(),
  est_mh: z.coerce.number(),
  division_id: z.string(),
})

export default function ProjectsOverlay({ data }) {
  const [open, setOpen] = React.useState(false)

  // Mutations

  const createMutation = useMutation({
    mutationKey: ['create-project'],
    mutationFn: projectsService.create,
  })
  const updateMutation = useMutation({
    mutationKey: ['update-project'],
    mutationFn: projectsService.update,
  })

  //Queries

  const divisionQuery = useQuery({
    queryKey: ['division'],
    queryFn: masterService.getDivisions,
  })
  const productQuery = useQuery({
    queryKey: ['product'],
    queryFn: masterService.getProducts,
  })
  const categoryQuery = useQuery({
    queryKey: ['category'],
    queryFn: masterService.getCategories,
  })
  const projectOwnerQuery = useQuery({
    queryKey: ['project-owner'],
    queryFn: masterService.getProjectOwner,
  })
  const priorityQuery = useQuery({
    queryKey: ['priority'],
    queryFn: masterService.getPriorities,
  })
  const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: masterService.getStatuses,
  })

  // Form

  const defaultValues = data
    ? {
        ...data,
        date_start: new Date(data.date_start),
        date_end: new Date(data.date_end),
      }
    : undefined
  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues,
  })

  const onSubmit = async (values) => {
    console.log(values)
    const project_owner_id = projectOwnerQuery.data.find((i) => i.id === values.project_owner_id)
    const product_id = productQuery.data.find((i) => i.id === values.product_id)
    const division_id = divisionQuery.data.find((i) => i.id === values.division_id)
    const category_id = categoryQuery.data.find((i) => i.id === values.category_id)
    const priority_id = priorityQuery.data.find((i) => i.id === values.priority_id)
    const status_id = statusQuery.data.find((i) => i.id === values.status_id)
    const date_start = new Date(values.date_start).getTime()
    const date_end = new Date(values.date_end).getTime()

    await createMutation.mutateAsync({
      ...values,
      project_owner_id,
      product_id,
      division_id,
      category_id,
      priority_id,
      status_id,
      date_start,
      date_end,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[85vh] overflow-auto pl-4"
          >
            <InputField name={'name'} label={'Project Name'} />
            <InputField name={'company'} label={'Company'} />
            <InputField name={'zoho_url'} label={'Zoho URL'} />
            <SelectField
              name={'project_owner_id'}
              label={'Project Owner'}
              options={projectOwnerQuery.data}
              optionLabel="name"
              optionValue="id"
            />
            <SelectField
              name={'product_id'}
              label={'Project Type'}
              options={productQuery.data}
              optionLabel="name"
              optionValue="id"
            />
            <SelectField
              name={'division_id'}
              label={'Division'}
              options={divisionQuery.data}
              optionLabel="name"
              optionValue="id"
            />
            <SelectField
              name={'category_id'}
              label={'Category'}
              options={categoryQuery.data}
              optionLabel="name"
              optionValue="id"
            />
            <SelectField
              name={'priority_id'}
              label={'Priority'}
              options={priorityQuery.data}
              optionLabel="name"
              optionValue="id"
            />
            <SelectField
              name={'status_id'}
              label={'Status'}
              options={statusQuery.data}
              optionLabel="name"
              optionValue="id"
            />
            <InputField name={'est_mh'} label={'Man-hour Estimation'} type="number" />
            <CalendarField name={'date_start'} label={'Start Date'} />
            <CalendarField name={'date_end'} label={'End Date'} />
            <div className="col-span-1 md:col-span-2">
              <TextareaField name={'note'} label={'Note'} />
            </div>

            <div className="space-y-2 mt-4 col-span-1 md:col-span-2">
              <Button type="submit" className={'w-full'} disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
