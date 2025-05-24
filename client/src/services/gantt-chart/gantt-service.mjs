'use client'

import { apiClient } from '../api/api-client.mjs'
import { GANTT_API } from './gantt-endpoints.mjs'

const ganttService = {
  async getAll() {
    const response = await apiClient.get(GANTT_API.GET_ALL)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
}

export { ganttService }
