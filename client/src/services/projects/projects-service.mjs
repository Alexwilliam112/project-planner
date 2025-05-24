'use client'

import { apiClient } from '../api/api-client.mjs'
import { PROJECTS_API } from './endpoints.mjs'

const projectsService = {
  async getAll() {
    const response = await apiClient.get(PROJECTS_API.GET_ALL)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async create(payload) {
    const response = await apiClient.post(PROJECTS_API.CREATE, payload)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async delete(params) {
    const response = await apiClient.delete(PROJECTS_API.CREATE, { params })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
}

export { projectsService }
