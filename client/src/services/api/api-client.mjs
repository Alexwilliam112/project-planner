'use client'

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

export { apiClient }
