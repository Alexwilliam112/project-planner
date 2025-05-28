'use client'

import React from 'react'
import { Gantt, ViewMode } from 'gantt-task-react'
import { useState } from 'react'
import { getStartEndDateForProject } from '@/utils/helpers.js'
import { ViewSwitcher } from './view-switcher.jsx'
import { CustomTaskListTable, CustomTaskListHeader } from './task-list-table.jsx'
import { useQuery } from '@tanstack/react-query'
import { ganttService } from '@/services/index.mjs'

const ganttStyles = {
  rowHeight: 50,
  barCornerRadius: 4,
  barFill: 60,
  handleWidth: 8,
  fontFamily: 'Segoe UI, Arial, sans-serif',
  fontSize: '15px',
  barProgressColor: '#388e3c',
  barProgressSelectedColor: '#388e3c',
  barBackgroundColor: '#683E3E',
  barBackgroundSelectedColor: '#683E3E',
  arrowColor: '#616161',
  arrowIndent: 10,
  todayColor: 'rgba(194, 194, 194, 0.5)',
}

export default function GanttChart({
  division_id,
  priority_id,
  status_id,
  squad_id,
  date_start,
  date_end,
}) {
  const ganttQuery = useQuery({
    queryKey: [
      'gantt',
      {
        division_id,
        priority_id,
        status_id,
        squad_id,
        date_start,
        date_end,
      },
    ],
    queryFn: () =>
      ganttService.getAll({
        params: {
          division_id,
          priority_id,
          status_id,
          project_owner_id: squad_id,
          date_start: new Date(date_start).getTime(),
          date_end: new Date(date_end).getTime(),
        },
      }),
  })

  const [view, setView] = useState(ViewMode.Week)
  const [tasks, setTasks] = useState([
    {
      id: 'P1',
      name: 'No Data',
      type: 'project',
      block_type: 'project',
      category: 'No Data',
      type_of_custom: 'No Data',
      type_of_project: 'No Data',
      status: 'No Data',
      start: new Date(),
      end: new Date(),
      progress: 9,
      hideChildren: false,
      styles: { backgroundColor: '#B35B0E', progressColor: '#B35B0E' },
    },
  ])
  const [isChecked, setIsChecked] = useState(true)
  let columnWidth = 60
  if (view === ViewMode.Month) {
    columnWidth = 300
  } else if (view === ViewMode.Week) {
    columnWidth = 250
  }

  React.useEffect(() => {
    if (ganttQuery.data) {
      if (ganttQuery.data.length > 0) {
        const newTasks = ganttQuery.data?.map((data) => ({
          id: data.id,
          name: data.name,
          type: data.type,
          block_type: data.block_type,
          category: data.category_id?.name || '',
          type_of_custom: data.product_id?.name || '',
          type_of_project: data.product_id?.name || '',
          status: data.status_id?.name || '',
          start: data.date_start ? new Date(data.date_start) : new Date(),
          end: data.date_end ? new Date(data.date_end) : new Date(),
          progress: data.progress,
          hideChildren: false,
          styles: data.styles,
          dependencies: data.dependencies,
          project: data.project_id?.name || '',
        }))

        setTasks(newTasks)
      } else {
        setTasks([
          {
            id: 'P1',
            name: 'No Data',
            type: 'project',
            block_type: 'project',
            category: 'No Data',
            type_of_custom: 'No Data',
            type_of_project: 'No Data',
            status: 'No Data',
            start: new Date(),
            end: new Date(),
            progress: 9,
            hideChildren: false,
            styles: { backgroundColor: '#B35B0E', progressColor: '#B35B0E' },
          },
        ])
      }
    }
  }, [ganttQuery.data])

  const MyTooltip = ({ task, fontSize, fontFamily }) => (
    <div style={{ fontSize, fontFamily, padding: 8 }} className="bg-white">
      <div>
        <strong>{task.name}</strong>
      </div>
      {task.category === 'project' && (
        <div>
          <div className="font-medium">Type of Custom: {task.type_of_custom}</div>
          <div className="font-medium">Type of Project: {task.type_of_project}</div>
          <div className="">Status: {task.status}</div>
        </div>
      )}
      {task.category === 'core' && (
        <div>
          <div className="font-medium">Technical Program Manager: {task.pm}</div>
          <div className="font-medium">Product Manager: {task.assignee}</div>
          <div className="">Status: {task.status}</div>
        </div>
      )}
      {task.category === 'appBuilder' && (
        <div>
          <div className="font-medium">Project Manager: {task.pm}</div>
          <div className="font-medium">System Analyst: {task.assignee}</div>
          <div className="">Status: {task.status}</div>
        </div>
      )}
      {task.category === 'enablement' && (
        <div>
          <div className="font-medium">Project Manager: {task.pm}</div>
          <div className="font-medium">Solution Engineer: {task.assignee}</div>
          <div className="">Status: {task.status}</div>
        </div>
      )}
      <div>Start: {task.start.toLocaleDateString()}</div>
      <div>End: {task.end.toLocaleDateString()}</div>
    </div>
  )

  const handleTaskChange = (task) => {
    console.log('On date change Id:' + task.id)
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t))

    let currentTask = task
    while (currentTask.project) {
      const [start, end] = getStartEndDateForProject(newTasks, currentTask.project)
      const projectIndex = newTasks.findIndex((t) => t.id === currentTask.project)
      if (projectIndex === -1) break
      const project = newTasks[projectIndex]
      if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
        const changedProject = { ...project, start, end }
        newTasks = newTasks.map((t) => (t.id === project.id ? changedProject : t))
        currentTask = changedProject
      } else {
        break
      }
    }

    setTasks(newTasks)
  }

  const handleTaskDelete = (task) => {
    const conf = window.confirm('Are you sure about ' + task.name + ' ?')
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id))
    }
    return conf
  }

  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
    console.log('On progress change Id:' + task.id)
  }

  const handleDblClick = (task) => {
    alert('On Double Click event Id:' + task.id)
  }

  const handleSelect = (task, isSelected) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'))
  }

  const handleExpanderClick = (task) => {
    setTasks((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, hideChildren: !t.hideChildren } : t))
    )
  }

  return (
    <div className="border rounded-md">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        tasks={tasks}
        allTasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        listCellWidth={isChecked ? 'auto' : ''}
        columnWidth={columnWidth}
        TaskListHeader={CustomTaskListHeader}
        onExpanderClick={handleExpanderClick}
        TooltipContent={MyTooltip}
        TaskListTable={(props) => (
          <CustomTaskListTable {...props} allTasks={tasks} onExpanderClick={handleExpanderClick} />
        )}
        {...ganttStyles}
      />
    </div>
  )
}
