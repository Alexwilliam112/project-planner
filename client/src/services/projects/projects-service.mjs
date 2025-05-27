'use client'

import { apiClient } from '../api/api-client.mjs'
import { PROJECTS_API } from './projects-endpoints.mjs'

const projectsService = {
  async getAll({ params }) {
    const response = await apiClient.get(PROJECTS_API.GET_ALL, { params })

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
  async update({ id_project, payload }) {
    const response = await apiClient.post(PROJECTS_API.UPDATE, payload, { params: { id_project } })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async updatePIC({ id_project, payload }) {
    const response = await apiClient.post(PROJECTS_API.UPDATE_PIC, payload, {
      params: { id_project },
    })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async delete(id_project) {
    const response = await apiClient.delete(PROJECTS_API.DELETE, { params: { id_project } })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
}

export { projectsService }
