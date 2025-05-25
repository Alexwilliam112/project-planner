'use client'

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useQuery } from '@tanstack/react-query'
import { calendarService } from '@/services/index.mjs'

export default function CalendarPage() {
  const [events, setEvents] = React.useState([])
  const calendarQuery = useQuery({
    queryKey: ['calendar'],
    queryFn: calendarService.getAll,
  })

  React.useEffect(() => {
    if (calendarQuery.isSuccess) {
      const newEvents =
        calendarQuery.data?.map((e) => ({
          id: e.id,
          title: e.name,
          start: e.date_start,
          end: e.date_end,
          extendedProps: e,
        })) || []
      setEvents(newEvents)
    }
  }, [calendarQuery.isSuccess])
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={{
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridWeek,dayGridMonth,dayGridYear',
      }}
    />
  )
}
