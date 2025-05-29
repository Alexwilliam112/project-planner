'use client'

import axios from 'axios'
import { storageService } from '../storage/storage-service.mjs'

const BASE_URL = 'https://api-oos.jojonomic.com/27407'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    const token = storageService.getToken()

    config.headers.Authorization = token

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  async (response) => {
    // Error handling
    if (response.data.error) {
      console.log('API CLIENT ===> Error while fetching:', response.config.url)
      const message = response.data.message || 'Error while fetching'

      throw new Error(message)
    }

    return response
  },
  async (error) => {
    // Handle network errors or errors thrown by Axios itself
    if (error.response && error.response.data) {
      return error.response
    }

    return Promise.reject(error)
  }
)

export { apiClient }
