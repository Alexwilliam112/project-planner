'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, Edit, EllipsisVertical, Plus, UserCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useSearchParams } from 'next/navigation'
import { mocksTasks } from '@/lib/dummy/tasks.mjs'
import { useQuery } from '@tanstack/react-query'
import { masterService, tasksService } from '@/services/index.mjs'

function getContrastColor(hexColor) {
  // Remove the hash if it exists
  const color = hexColor.replace('#', '')

  // Convert to RGB
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Return black for light backgrounds, white for dark backgrounds
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

export function Board() {
  const taskQuery = useQuery({
    queryKey: ['tasksService.getAll'],
    queryFn: tasksService.getAll,
  })
  const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: masterService.getStatuses,
  })

  const [indexStatus, setIndexStatus] = useState([
    {
      _id: '6815dbfa2398e8a9b9124993',
      color: '#000000',
      created_at: 1746263034046,
      created_by: 178566,
      id_record: 'lNRkDKdPXq53iV94',
      name: 'BACKLOG',
      next_status_id: {
        id: 'bqPvMmVMSumQZ1mL',
        name: 'IN PROGRESS',
      },
      order: 1,
      status_type: 'BACKLOG',
      updated_at: 1746368728923,
      updated_by: 178566,
      workspace_id: 'SxKfPgXcDS5bICvE',
    },
  ])

  const renderStatusIcon = (statusType) => {
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

  return (
    <div className="relative flex h-fit w-full shrink">
      {statusQuery.data?.map((status) => (
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
                {taskQuery.data?.filter((task) => task.status_id.id === status.id).length}
              </Badge>
            </div>
            {/* <div className="flex items-center gap-1">
              <CreateModalTrigger
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 border-radius-full hover:bg-white/20"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                }
                modalTitle="Create Task"
                parentTaskId={'0'}
                modalSubtitle={''}
                sidebarContent={<p></p>}
                fetchTasks={fetchTasks}
                initialValues={{
                  team,
                  folder,
                  lists,
                }}
                selectData={{
                  indexTaskType,
                  indexStatus,
                  indexPriority,
                  indexProduct,
                  indexMember,
                  indexTeam,
                  indexFolder,
                  indexList,
                }}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div> */}
          </div>

          {/* Column Content */}
          <div className="flex flex-1 flex-col gap-3 p-2">
            {taskQuery.data
              ?.filter((task) => task.status_id.id === status.id)
              .map((task) => (
                <Card key={task.id_task} className="p-3 gap-2 hover:bg-gray-50">
                  <div
                    className="mb-0 text-sm font-medium w-full p-0 pb-2"
                    style={{ wordBreak: 'break-word' }}
                  >
                    {task.name}
                  </div>

                  {/* TASK TYPE*/}
                  <div className="flex items-center gap-2 text-xs">
                    <svg
                      className={`h-4 w-4 text-[${task.task_type_id.color}]`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                    </svg>
                    <span
                      className="text-xs px-2 py-0.75 border border-muted-foreground/20 rounded-sm font-medium"
                      style={{
                        color: task.task_type_id.color,
                        borderColor: task.task_type_id.color,
                      }}
                    >
                      {task.task_type_id.name.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* PRODUCT*/}
                    <div className="flex items-center gap-2 text-xs">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 12H2M16 6l6 6-6 6M8 6l-6 6 6 6" />
                      </svg>
                      <span
                        className="text-xs px-2 py-0.75 border border-muted-foreground/20 rounded-sm"
                        style={{
                          backgroundColor: task.product_id.color,
                          color: getContrastColor(task.product_id.color),
                        }}
                      >
                        {task.product_id.name}
                      </span>
                    </div>

                    {/* PRIORITY*/}
                    <div className="flex items-center gap-2 text-xs">
                      <svg
                        className="h-4 w-4 text-muted-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 12H2M16 6l6 6-6 6M8 6l-6 6 6 6" />
                      </svg>
                      <span
                        className="text-xs px-2 py-0.75 border border-muted-foreground/20 rounded-sm"
                        style={{
                          backgroundColor: task.priority_id.color,
                          color: getContrastColor(task.priority_id.color),
                        }}
                      >
                        {task.priority_id.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      {/* DATE RANGE */}
                      <div className="flex items-center gap-2 min-w-[150px]">
                        <svg
                          className="h-4 w-4 text-muted-foreground"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="text-black font-medium">
                          {new Date(task.date_start).toLocaleDateString()} -{' '}
                          {new Date(task.date_end).toLocaleDateString()}
                        </span>
                      </div>

                      {/* ASSIGNEES */}
                      <div className="flex items-center gap-1 ml-auto">
                        {task.assignee_ids?.map((assignee, idx) => {
                          const initials = assignee.name
                            .split(' ')
                            .map((word) => word.charAt(0))
                            .slice(0, 2)
                            .join('')

                          return (
                            <Tooltip key={idx}>
                              <TooltipTrigger asChild>
                                <div
                                  className="relative border rounded-full border-gray-700"
                                  style={{
                                    marginLeft: idx === 0 ? '0' : '-13%', // Overlap by 15%
                                  }}
                                >
                                  <Avatar>
                                    <AvatarImage src={assignee.avatar} alt={assignee.name} />
                                    <AvatarFallback
                                      style={{
                                        backgroundColor: '#F5B1FF',
                                        color: getContrastColor('#F5B1FF'),
                                        cursor: 'pointer',
                                      }}
                                    >
                                      {initials}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <span>{assignee.name}</span>
                              </TooltipContent>
                            </Tooltip>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
