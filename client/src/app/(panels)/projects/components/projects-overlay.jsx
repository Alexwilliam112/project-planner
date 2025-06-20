'use client'

import { Form } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import { Pencil } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { utc7Offset } from '@/lib/utils'
import { toast } from 'sonner'

const generalInfoSchema = z.object({
  zoho_url: z.string(),
  project_owner_id: z.string(),
  product_id: z.string(),
  category_id: z.string(),
  priority_id: z.string(),
  status_id: z.string().optional(),
  note: z.string().optional(),
  date_start: z.date(),
  date_end: z.date(),
  name: z.string(),
  company: z.string(),
  est_mh: z.coerce.number(),
  division_id: z.string(),
  progress: z.coerce.number().optional(),
})

const picSchema = z.object({
  pic: z.object({ pic_name: z.string(), role_name: z.string() }).array(),
})

export default function ProjectsOverlay({ data }) {
  const queryClient = useQueryClient()

  const [open, setOpen] = React.useState(false)

  // Mutations

  const createMutation = useMutation({
    mutationKey: ['create-project'],
    mutationFn: projectsService.create,
    onSuccess: () => {
      setOpen(false)
      queryClient.refetchQueries(['projects'])
    },
    onError: (error) => {
      toast.error('Failed', {
        description: `Failed to create project: ${error.message}`,
      })
    },
  })
  const updateMutation = useMutation({
    mutationKey: ['update-project'],
    mutationFn: projectsService.update,
    onSuccess: () => {
      setOpen(false)
      toast.success('Project updated successfully')
      queryClient.refetchQueries(['projects'])
    },
    onError: (error) => {
      toast.error('Failed', {
        description: `Failed to update project: ${error.message}`,
      })
    },
  })
  const updatePicMutation = useMutation({
    mutationKey: ['update-project'],
    mutationFn: projectsService.updatePIC,
    onSuccess: () => {
      setOpen(false)
      toast.success('Project updated successfully')
      queryClient.refetchQueries(['projects'])
    },
    onError: (error) => {
      toast.error(`Failed to update project PIC: ${error.message}`)
    },
  })
  const deleteMutation = useMutation({
    mutationKey: ['delete-project'],
    mutationFn: projectsService.delete,
    onSuccess: () => {
      setOpen(false)
      queryClient.refetchQueries(['projects'])
    },
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
    queryKey: ['project-status'],
    queryFn: () => masterService.getStatuses({ params: { type: 'PROJECT' } }),
  })

  // Form

  const generalInfoForm = useForm({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: data
      ? {
          ...data,
          project_owner_id: data.project_owner_id.id,
          product_id: data.product_id.id,
          division_id: data.division_id.id,
          category_id: data.category_id.id,
          priority_id: data.priority_id.id,
          status_id: data.status_id.id,
          date_start: new Date(data.date_start),
          date_end: new Date(data.date_end),
        }
      : {
          note: '',
        },
  })

  const picForm = useForm({
    resolver: zodResolver(picSchema),
    defaultValues: {
      pic: data?.pic,
    },
  })

  const onSubmitGeneral = async (values) => {
    const project_owner_id = projectOwnerQuery.data.find((i) => i.id === values.project_owner_id)
    const product_id = productQuery.data.find((i) => i.id === values.product_id)
    const division_id = divisionQuery.data.find((i) => i.id === values.division_id)
    const category_id = categoryQuery.data.find((i) => i.id === values.category_id)
    const priority_id = priorityQuery.data.find((i) => i.id === values.priority_id)
    const status_id = statusQuery.data.find((i) => i.id === values.status_id)
    const date_start = new Date(values.date_start).getTime() + utc7Offset
    const date_end = new Date(values.date_end).getTime() + utc7Offset

    if (data) {
      await updateMutation.mutateAsync({
        id_project: data.id_project,
        payload: {
          ...values,
          project_owner_id,
          product_id,
          division_id,
          category_id,
          priority_id,
          status_id,
          date_start,
          date_end,
        },
      })
    } else {
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

    generalInfoForm.reset()
  }

  const onSubmitPic = async (values) => {
    await updatePicMutation.mutateAsync({ id_project: data.id_project, payload: values })
  }

  const onDelete = async () => {
    await deleteMutation.mutateAsync(data.id_project)
  }

  const disableAction =
    createMutation.isPending ||
    updateMutation.isPending ||
    updatePicMutation.isPending ||
    deleteMutation.isPending

  const { errors } = generalInfoForm.formState
  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error(errors)

      toast.error('Please fix the errors in the form before submitting.')
    }
  }, [errors])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {data ? (
          <Button size={'icon'} className={'w-7 h-7'} variant={'ghost'}>
            <Pencil className="w-2 h-2" />
          </Button>
        ) : (
          <Button>Add</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>{data ? 'Update Project' : 'Create New Project'}</DialogTitle>
        </DialogHeader>
        <Tabs className="max-h-[80vh] overflow-auto pb-8 px-1" defaultValue="general">
          <TabsList className="w-full" hidden={!data}>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="pic">PIC</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Form {...generalInfoForm}>
              <form
                onSubmit={generalInfoForm.handleSubmit(onSubmitGeneral)}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <InputField className="md:col-span-2" name={'name'} label={'Project Name'} />
                <InputField name={'company'} label={'Company'} />
                <InputField name={'zoho_url'} label={'Zoho ID / URL'} />
                <SelectField
                  name={'project_owner_id'}
                  label={'Project Owner'}
                  options={projectOwnerQuery.data}
                  optionLabel="name"
                  optionValue="id"
                />
                <SelectField
                  name={'product_id'}
                  label={'Product'}
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
                {data && (
                  <>
                    <SelectField
                      name={'status_id'}
                      label={'Status'}
                      options={statusQuery.data}
                      optionLabel="name"
                      optionValue="id"
                    />

                    <InputField name={'progress'} label={'Progress'} type="number" />
                  </>
                )}
                <InputField name={'est_mh'} label={'Man-hour Estimation'} type="number" />
                <CalendarField
                  name={'date_start'}
                  label={'Start Date'}
                  disabledAfter={new Date(generalInfoForm.watch('date_end'))}
                />
                <CalendarField
                  name={'date_end'}
                  label={'End Date'}
                  disabled={data}
                  disabledBefore={new Date(generalInfoForm.watch('date_start'))}
                />
                <div className="col-span-1 md:col-span-2">
                  <TextareaField name={'note'} label={'Note'} />
                </div>

                <div className="space-y-2 mt-4 col-span-1 md:col-span-2">
                  <Button type="submit" className={'w-full'} disabled={disableAction}>
                    {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                  </Button>
                  {data && (
                    <Button
                      type="button"
                      className={'w-full'}
                      variant={'destructive'}
                      onClick={onDelete}
                      disabled={disableAction}
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </TabsContent>
          {data && (
            <TabsContent value="pic" className="h-full">
              <Form {...picForm}>
                <form
                  onSubmit={picForm.handleSubmit(onSubmitPic)}
                  className="flex flex-col gap-4 justify-between h-full"
                >
                  <div className="grid md:grid-cols-2 gap-3">
                    {data.pic.map((p, i) => (
                      <InputField key={i} name={`pic.${i}.pic_name`} label={p.role_name} />
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button type="submit" className={'w-full'} disabled={disableAction}>
                      {createMutation.isPending ||
                      updateMutation.isPending ||
                      updatePicMutation.isPending
                        ? 'Saving...'
                        : 'Save'}
                    </Button>
                    {data && (
                      <Button
                        type="button"
                        className={'w-full'}
                        variant={'destructive'}
                        onClick={onDelete}
                        disabled={disableAction}
                      >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
