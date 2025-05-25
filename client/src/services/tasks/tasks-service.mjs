'use client'

import { apiClient } from '../api/api-client.mjs'
import { TASKS_API } from './tasks-endpoints.mjs'

const tasksService = {
  async getAll() {
    const response = await apiClient.get(TASKS_API.GET_ALL)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getResourceCapacity({ params }) {
    const response = await apiClient.get(TASKS_API.GET_RESOURCE_CAPACITY, { params })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getWorkDays({ params }) {
    const response = await apiClient.get(TASKS_API.GET_WORK_DAYS, { params })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async create({ payload, id_project }) {
    const response = await apiClient.post(TASKS_API.CREATE, payload, { params: { id_project } })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async update({ id_task, payload }) {
    const response = await apiClient.post(TASKS_API.UPDATE, payload, { params: id_task })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async delete({ id_task }) {
    const response = await apiClient.delete(TASKS_API.DELETE, { params: id_task })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
}

export { tasksService }
