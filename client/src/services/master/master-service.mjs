'use client'

import { MASTER_API } from './master-endpoints.mjs'
import { apiClient } from '../api/api-client.mjs'

const masterService = {
  async getDivisions() {
    const response = await apiClient.get(MASTER_API.GET_DIVISIONS)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getProducts() {
    const response = await apiClient.get(MASTER_API.GET_PRODUCTS)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getCategories() {
    const response = await apiClient.get(MASTER_API.GET_CATEGORIES)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getProjectOwner() {
    const response = await apiClient.get(MASTER_API.GET_PROJECT_OWNER)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getPriorities() {
    const response = await apiClient.get(MASTER_API.GET_PRIORITY)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getStatuses({ params } = { params: { type: 'PROJECT' } }) {
    const response = await apiClient.get(MASTER_API.GET_STATUS, { params })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getResources() {
    const response = await apiClient.get(MASTER_API.GET_RESOURCE)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getProjects() {
    const response = await apiClient.get(MASTER_API.GET_PROJECTS)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
}

export { masterService }
