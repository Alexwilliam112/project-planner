'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      richColors
      theme={theme}
      className="toaster group"
      style={{
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--foreground)',
        '--normal-border': 'var(--border)',
      }}
      {...props}
    />
  )
}

export { Toaster }
