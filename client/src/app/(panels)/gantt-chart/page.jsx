"use client";

import React from "react";
import GanttChart from "./_components/gantt-chart";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, RefreshCcw } from "lucide-react";
import { cn, utc7Offset } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { masterService } from "@/services/index.mjs";

export default function GanttChartPage() {
  // Query Params
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const [division_id, setDivisionId] = React.useState("");
  const [priority_id, setPriorityId] = React.useState("");
  const [status_id, setStatusId] = React.useState("");
  const [squad_id, setSquadId] = React.useState("");
  const [date_start, setDateStart] = React.useState(firstDay);
  const [date_end, setDateEnd] = React.useState(lastDay);

  // Fetch filter options
  const statusQuery = useQuery({
    queryKey: ["task-status"],
    queryFn: () => masterService.getStatuses({ params: { type: "PROJECT" } }),
  });
  const divisionQuery = useQuery({
    queryKey: ["division"],
    queryFn: masterService.getDivisions,
  });
  const priorityQuery = useQuery({
    queryKey: ["priority"],
    queryFn: masterService.getPriorities,
  });
  const squadQuery = useQuery({
    queryKey: ["squad"],
    queryFn: masterService.getProjectOwner,
  });

  const handleReset = () => {
    setDivisionId("");
    setPriorityId("");
    setStatusId("");
    setSquadId("");
    setDateStart(firstDay);
    setDateEnd(lastDay);
  };

  return (
    <main className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <SelectFilter
          value={division_id}
          onValueChange={setDivisionId}
          placeholder="Search by division..."
          options={divisionQuery.data || []}
        />

        <SelectFilter
          value={priority_id}
          onValueChange={setPriorityId}
          placeholder="Search by priority..."
          options={priorityQuery.data || []}
        />

        <SelectFilter
          value={squad_id}
          onValueChange={setSquadId}
          placeholder="Search by squad..."
          options={squadQuery.data || []}
        />

        <SelectFilter
          value={status_id}
          onValueChange={setStatusId}
          placeholder="Search by status..."
          options={statusQuery.data || []}
        />

        <DatePickerFilter
          date={date_start}
          setDate={setDateStart}
          placeholder="Filter by date start"
        />

        <DatePickerFilter
          date={date_end}
          setDate={setDateEnd}
          placeholder="Filter by date end"
        />

        <Button variant="secondary" className="w-full" onClick={handleReset}>
          <RefreshCcw /> Reset filter
        </Button>
      </div>

      <GanttChart
        division_id={division_id}
        priority_id={priority_id}
        status_id={status_id}
        squad_id={squad_id}
        date_start={date_start}
        date_end={date_end}
      />
    </main>
  );
}

function SelectFilter({ value, onValueChange, options, placeholder }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.id} value={o.id}>
            {o.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DatePickerFilter({ date, setDate, placeholder }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
