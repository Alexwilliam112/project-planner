'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function SelectField({
  name,
  label,
  placeholder,
  description,
  options = [],
  optionValue = '',
  optionLabel = '',
  disabled = false,
}) {
  const form = useFormContext()
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                  disabled={disabled}
                >
                  {field.value
                    ? options.find((option) => option[optionValue] === field.value)?.[optionLabel]
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={`Search ${label}...`} />
                <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-auto">
                  {options.map((option) => (
                    <CommandItem
                      value={option[optionLabel]}
                      key={option[optionValue]}
                      onSelect={() => {
                        form.setValue(name, option[optionValue])
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          option[optionValue] === field.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option[optionLabel]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
