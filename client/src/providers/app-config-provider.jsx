'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Fragment } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
})

export default function AppConfigProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>{children}</Fragment>
    </QueryClientProvider>
  )
}
