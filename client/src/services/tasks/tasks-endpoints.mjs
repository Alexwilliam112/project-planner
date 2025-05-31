'use client'

const TASKS_API = {
  CREATE: '/ops-center/task/v1/create',
  UPDATE: '/ops-center/task/v1/update',
  DELETE: '/ops-center/task/v1/delete',
  GET_ALL: '/ops-center/task/v1/index',
  GET_RESOURCE_CAPACITY: '/ops-center/resource/v1/capacity',
  GET_WORK_DAYS: '/ops-center/work-days/v1/get',
  GET_DEFAULT_START_DATE: '/ops-center/task/v1/get-default-date-start',
  GET_HOLIDAYS_AND_TIMEOFF: '/ops-center/task/v1/get-holidays-and-timeoffs',
}

export { TASKS_API }
