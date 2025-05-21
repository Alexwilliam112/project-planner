import React from 'react'
import 'gantt-task-react/dist/index.css'
import { ViewMode } from 'gantt-task-react'

export const ViewSwitcher = ({ onViewModeChange, onViewListChange, isChecked }) => {
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
        <button
          className="px-4 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => onViewModeChange(ViewMode.Day)}
        >
          Day
        </button>
        <button
          className="px-4 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => onViewModeChange(ViewMode.Week)}
        >
          Week
        </button>
        <button
          className="px-4 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => onViewModeChange(ViewMode.Month)}
        >
          Month
        </button>
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={isChecked}
            onChange={() => onViewListChange(!isChecked)}
          />
          <span className="ml-2 text-gray-700">Show Task List</span>
        </label>
      </div>
    </div>
  )
}
