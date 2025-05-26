'use client'

import { apiClient } from '../api/api-client.mjs'
import { DASHBOARD_API } from './dashboard-endpoints.mjs'

const dashboardService = {
  async getOverallhealth({ params }) {
    const response = await apiClient.get(DASHBOARD_API.GET_OVERALL_HEALTH, { params })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getTaskByResource({ params }) {
    const response = await apiClient.get(DASHBOARD_API.GET_TASK_BY_RESOURCE, { params })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
  async getTaskProgress({ params }) {
    const response = await apiClient.get(DASHBOARD_API.GET_TASK_PROGRESS, { params })

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
}

export { dashboardService }
