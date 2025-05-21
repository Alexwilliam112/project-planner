import React from 'react'
import Header from './_components/header'

export default function PanelsLayout({ children }) {
  return (
    <div className="p-6 space-y-8">
      <Header />
      {children}
    </div>
  )
}
