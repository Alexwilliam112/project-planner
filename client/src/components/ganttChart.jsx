"use client";
import React, { useState, useEffect, useRef } from "react";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function GanttPage() {
  const [viewMode, setViewMode] = useState(ViewMode.Day);
  const ganttContainerRef = useRef(null);

  const [tasks, setTasks] = useState([
    {
      id: "P1",
      name: "Main Project",
      type: "project",
      start: new Date(2025, 4, 1),
      end: new Date(2025, 4, 30),
      progress: 40,
      hideChildren: false,
      styles: { backgroundColor: "#ffc107", progressColor: "#e0a800" },
    },
    {
      id: "SP1",
      name: "Subproject A",
      type: "project",
      project: "P1",
      start: new Date(2025, 4, 1),
      end: new Date(2025, 4, 15),
      progress: 60,
      hideChildren: false,
      styles: { backgroundColor: "#ffe082", progressColor: "#ffd54f" },
    },
    {
      id: "T1",
      name: "Task A1",
      type: "task",
      project: "SP1",
      start: new Date(2025, 4, 2),
      end: new Date(2025, 4, 5),
      progress: 100,
      styles: { backgroundColor: "#aed581", progressColor: "#7cb342" },
    },
    {
      id: "T2",
      name: "Task A2",
      type: "task",
      project: "SP1",
      start: new Date(2025, 4, 6),
      end: new Date(2025, 4, 10),
      dependencies: ["T1"],
      progress: 50,
      styles: { backgroundColor: "#81d4fa", progressColor: "#0288d1" },
    },
    {
      id: "SP2",
      name: "Subproject B",
      type: "project",
      project: "P1",
      start: new Date(2025, 4, 16),
      end: new Date(2025, 4, 30),
      progress: 20,
      hideChildren: false,
      styles: { backgroundColor: "#ffab91", progressColor: "#ff7043" },
    },
    {
      id: "T3",
      name: "Task B1",
      type: "task",
      project: "SP2",
      start: new Date(2025, 4, 17),
      end: new Date(2025, 4, 20),
      progress: 10,
      styles: { backgroundColor: "#b39ddb", progressColor: "#5e35b1" },
    },
  ]);

  const ganttStyles = {
    headerHeight: 50,
    ganttHeight: 500,
    columnWidth: 80,
    listCellWidth: "200px", // wider task list column
    rowHeight: 50,
    barCornerRadius: 4,
    barFill: 60,
    handleWidth: 8,
    fontFamily: "Segoe UI, Arial, sans-serif",
    fontSize: "15px",
    barProgressColor: "#4caf50",
    barProgressSelectedColor: "#388e3c",
    barBackgroundColor: "#e0e0e0",
    barBackgroundSelectedColor: "#bdbdbd",
    arrowColor: "#616161",
    arrowIndent: 10,
    todayColor: "#ffe082",
  };

  const handleExpanderClick = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, hideChildren: !t.hideChildren };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const container = ganttContainerRef.current;

    const handleWheel = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY < 0) {
          setViewMode((prev) =>
            prev === ViewMode.Month
              ? ViewMode.Week
              : prev === ViewMode.Week
              ? ViewMode.Day
              : ViewMode.Day
          );
        } else {
          setViewMode((prev) =>
            prev === ViewMode.Day
              ? ViewMode.Week
              : prev === ViewMode.Week
              ? ViewMode.Month
              : ViewMode.Month
          );
        }
      }
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <div ref={ganttContainerRef} style={{ height: 600 }}>
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          onExpanderClick={handleExpanderClick}
          {...ganttStyles}
        />
      </div>
    </div>
  );
}