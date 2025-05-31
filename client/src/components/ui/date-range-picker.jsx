'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from './button'

export function DateTimeRangePicker({
  value,
  onChange,
  placeholder = 'Select date and time range',
  disabled = false,
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [dateRange, setDateRange] = useState(value || { from: null, to: null })
  const [timeRange, setTimeRange] = useState({
    from: value?.from ? new Date(value.from).toTimeString().substring(0, 5) : '00:00',
    to: value?.to ? new Date(value.to).toTimeString().substring(0, 5) : '00:00',
  })
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const pickerRef = useRef(null)

  const handleDateChange = (range) => {
    const updatedRange = {
      from: range?.from || null,
      to: range?.to || null,
    }
    setDateRange(updatedRange)
  }

  const handleTimeChange = (type, value) => {
    // Ensure minutes are always 00
    const [hours] = value.split(':')
    const timeValue = `${hours}:00`

    const newTimeRange = { ...timeRange, [type]: timeValue }
    setTimeRange(newTimeRange)

    // Update the date range with time
    if (dateRange.from && dateRange.to) {
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)

      const [fromHours] = newTimeRange.from.split(':').map(Number)
      const [toHours] = newTimeRange.to.split(':').map(Number)

      fromDate.setHours(fromHours, 0) // Force minutes to 0
      toDate.setHours(toHours, 0) // Force minutes to 0

      const updatedRange = {
        from: fromDate,
        to: toDate,
      }

      onChange(updatedRange)
    }
  }

  const handleCompleteSelection = () => {
    if (dateRange.from && dateRange.to) {
      const fromDate = new Date(dateRange.from)
      const toDate = new Date(dateRange.to)

      const [fromHours, fromMinutes] = timeRange.from.split(':').map(Number)
      const [toHours, toMinutes] = timeRange.to.split(':').map(Number)

      fromDate.setHours(fromHours, fromMinutes)
      toDate.setHours(toHours, toMinutes)

      const updatedRange = {
        from: fromDate,
        to: toDate,
      }

      onChange(updatedRange)
      setIsCalendarOpen(false)
    }
  }

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setIsCalendarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {}, [value])

  const formatDateTime = (date) => {
    if (!date) return ''
    const dateStr = new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    const timeStr = new Date(date).toTimeString().substring(0, 5)
    return `${dateStr} ${timeStr}`
  }

  // Generate years for dropdown (10 years back and 10 years forward)
  const years = Array.from({ length: 20 }, (_, i) => selectedYear - 10 + i)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const handleYearChange = (year) => {
    setSelectedYear(year)
    // Update calendar view
    const newDate = new Date(dateRange.from || new Date())
    newDate.setFullYear(year)
    setDateRange({ ...dateRange, from: newDate })
  }

  const handleMonthChange = (monthIndex) => {
    setSelectedMonth(monthIndex)
    // Update calendar view
    const newDate = new Date(dateRange.from || new Date())
    newDate.setMonth(monthIndex)
    setDateRange({ ...dateRange, from: newDate })
  }

  return (
    <div className="relative text-sm" ref={pickerRef}>
      {/* Input Field */}
      <div
        className={`border p-2 rounded w-full ${
          disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'cursor-pointer'
        }`}
        onClick={() => !disabled && setIsCalendarOpen(!isCalendarOpen)}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      >
        {dateRange.from && dateRange.to ? (
          `${formatDateTime(dateRange.from)} - ${formatDateTime(dateRange.to)}`
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>

      {/* Calendar and Time Picker */}
      {isCalendarOpen && !disabled && (
        <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg p-4 w-auto">
          {/* Year and Month Selectors */}
          <div className="flex gap-2 mb-4">
            <select
              className="border rounded p-1"
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className="border rounded p-1"
              value={selectedMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateChange}
            month={new Date(selectedYear, selectedMonth)}
            onMonthChange={(date) => {
              setSelectedYear(date.getFullYear())
              setSelectedMonth(date.getMonth())
            }}
          />

          {/* Time Picker */}
          <div className="flex gap-4 mt-4 items-center w-full">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                value={timeRange.from}
                onChange={(e) => handleTimeChange('from', e.target.value)}
                className="border rounded p-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={timeRange.to}
                onChange={(e) => handleTimeChange('to', e.target.value)}
                className="border rounded p-1"
              />
            </div>
          </div>

          <Button
            onClick={handleCompleteSelection}
            disabled={!dateRange.from || !dateRange.to}
            className="w-full mt-4"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  )
}
