'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { useController } from 'react-hook-form'

export function DateTimeRangeFormField({
  name,
  control,
  label,
  description,
  placeholder = 'Select date and time range',
  disabled = false,
  required = false,
}) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: required ? { required: 'This field is required' } : undefined,
  })

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [dateRange, setDateRange] = useState(field.value || { from: null, to: null })
  const [timeRange, setTimeRange] = useState({
    from: field.value?.from ? new Date(field.value.from).toTimeString().substring(0, 5) : '00:00',
    to: field.value?.to ? new Date(field.value.to).toTimeString().substring(0, 5) : '00:00',
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

      field.onChange(updatedRange)
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

      field.onChange(updatedRange)
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

  // Sync with form field value changes
  useEffect(() => {
    if (field.value) {
      setDateRange(field.value)
      setTimeRange({
        from: field.value?.from
          ? new Date(field.value.from).toTimeString().substring(0, 5)
          : '00:00',
        to: field.value?.to ? new Date(field.value.to).toTimeString().substring(0, 5) : '00:00',
      })
    }
  }, [field.value])

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
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div className="relative text-sm" ref={pickerRef}>
          {/* Input Field */}
          <div
            className={`flex h-9 shadow-xs w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            } ${error ? 'border-destructive' : ''}`}
            onClick={() => !disabled && setIsCalendarOpen(!isCalendarOpen)}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
          >
            {dateRange.from && dateRange.to ? (
              `${formatDateTime(dateRange.from)} - ${formatDateTime(dateRange.to)}`
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>

          {/* Calendar and Time Picker */}
          {isCalendarOpen && !disabled && (
            <div className="absolute z-50 mt-2 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none w-auto">
              {/* Year and Month Selectors */}
              <div className="flex gap-2 mb-4">
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                className="rounded-md border shadow"
              />

              {/* Time Picker */}
              <div className="flex gap-4 mt-4 items-center w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={timeRange.from}
                    onChange={(e) => handleTimeChange('from', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={timeRange.to}
                    onChange={(e) => handleTimeChange('to', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
