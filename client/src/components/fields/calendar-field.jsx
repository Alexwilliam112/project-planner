'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { useFormContext } from 'react-hook-form'
import { format, getMonth, getYear } from 'date-fns'
import { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const years = Array.from({ length: 124 }, (_, i) => getYear(new Date()) - i)
const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

export default function CalendarField({ name, label, placeholder, description, disabled }) {
  const form = useFormContext()

  // State for currently viewed month/year in the calendar
  const [calendarView, setCalendarView] = useState({
    month: getMonth(new Date()),
    year: getYear(new Date()),
  })

  // Function to change the calendar view
  const handleCalendarChange = (type, value) => {
    setCalendarView((prev) => ({
      ...prev,
      [type]: parseInt(value),
    }))
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild disabled={disabled}>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? format(field.value, 'PPP') : <span>{placeholder}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex p-3 bg-white space-x-2">
                  <Select
                    value={calendarView.month.toString()}
                    onValueChange={(value) => handleCalendarChange('month', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={calendarView.year.toString()}
                    onValueChange={(value) => handleCalendarChange('year', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  month={new Date(calendarView.year, calendarView.month)}
                  onMonthChange={(newMonth) => {
                    setCalendarView({
                      month: getMonth(newMonth),
                      year: getYear(newMonth),
                    })
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
