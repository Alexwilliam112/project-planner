import { Task } from 'gantt-task-react'

export const getStartEndDateForProject = (tasks, projectId) => {
  const projectTasks = tasks.filter((t) => t.project === projectId)
  if (projectTasks.length === 0) return [null, null]

  let start = new Date(projectTasks[0].start)
  let end = new Date(projectTasks[0].end)

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i]
    const taskStart = new Date(task.start)
    const taskEnd = new Date(task.end)
    if (start.getTime() > taskStart.getTime()) {
      start = taskStart
    }
    if (end.getTime() < taskEnd.getTime()) {
      end = taskEnd
    }
  }

  if (projectId === 'rvp59PDyI7qGCwq6') {
    console.log({ start, end })
  }

  return [start, end]
}
