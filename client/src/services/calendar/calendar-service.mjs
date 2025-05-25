'use client'

import { CALENDAR_API } from './calendar-endpoints.mjs'

const calendarService = {
  async getAll() {
    const response = await apiClient.get(CALENDAR_API.GET_ALL)

    const { error, message, data } = response.data

    if (error) throw new Error(message)

    return data
  },
}

export { calendarService }
