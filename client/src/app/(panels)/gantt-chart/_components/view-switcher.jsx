import React from 'react'
import 'gantt-task-react/dist/index.css'
import { ViewMode } from 'gantt-task-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const ViewSwitcher = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
  onViewMilestoneChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4">
      <div className="flex gap-2">
        {/* <button
          className="px-4 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => onViewModeChange(ViewMode.QuarterDay)}
        >
          Quarter of Day
        </button>
        <button
          className="px-4 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => onViewModeChange(ViewMode.HalfDay)}
        >
          Half of Day
        </button> */}
        <Button variant="outline" onClick={() => onViewModeChange(ViewMode.Day)}>
          Day
        </Button>
        <Button variant="outline" onClick={() => onViewModeChange(ViewMode.Week)}>
          Week
        </Button>
        <Button variant="outline" onClick={() => onViewModeChange(ViewMode.Month)}>
          Month
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked={isChecked} onCheckedChange={() => onViewListChange(!isChecked)} />
        <Label>Show Task List</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          onCheckedChange={(checked) => onViewMilestoneChange(checked)}
          defaultChecked={true}
        />
        <Label>Show Show All Milestones</Label>
      </div>
    </div>
  )
}
