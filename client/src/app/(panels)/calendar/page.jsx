'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function CalendarPage() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridWeek,dayGridMonth,dayGridYear',
      }}
    />
  )
}
