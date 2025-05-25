'use client'

import React from 'react'
import { cn, getContrastColor } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function TaskCard({ task, className, ...props }) {
  return (
    <Card key={task.id_task} className={cn('p-3 gap-2 hover:bg-gray-50', className)} {...props}>
      <div className="mb-0 text-sm font-medium w-full p-0 pb-2" style={{ wordBreak: 'break-word' }}>
        {task.name}
      </div>

      {/* TASK TYPE*/}
      <div className="flex items-center gap-2 text-xs">
        <svg
          className={`h-4 w-4 text-[${task.task_type_id?.color}]`}
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
            color: task.task_type_id?.color,
            borderColor: task.task_type_id?.color,
          }}
        >
          {task.task_type_id?.name.toUpperCase()}
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
              backgroundColor: task.product_id?.color,
              // color: getContrastColor(task.product_id?.color),
            }}
          >
            {task.product_id?.name}
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
  )
}
