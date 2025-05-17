"use client";
import React, { useState } from "react";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function GanttPage() {
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
      project: "P1", // 🔗 belongs to Main Project
      start: new Date(2025, 4, 1),
      end: new Date(2025, 4, 15),
      progress: 60,
      hideChildren: false,
      styles: { backgroundColor: "#ffc107", progressColor: "#e0a800" },
    },
    {
      id: "T1",
      name: "Task A1",
      type: "task",
      project: "SP1", // 🔗 belongs to Subproject A
      start: new Date(2025, 4, 2),
      end: new Date(2025, 4, 5),
      progress: 100,
      styles: { backgroundColor: "#ffc107", progressColor: "#e0a800" },
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
      styles: { backgroundColor: "#ffc107", progressColor: "#e0a800" },
    },
    {
      id: "SP2",
      name: "Subproject B",
      type: "project",
      project: "P1", // 🔗 also belongs to Main Project
      start: new Date(2025, 4, 16),
      end: new Date(2025, 4, 30),
      progress: 20,
      hideChildren: false,
      styles: { backgroundColor: "#ffc107", progressColor: "#e0a800" },
    },
    {
      id: "T3",
      name: "Task B1",
      type: "task",
      project: "SP2",
      start: new Date(2025, 4, 17),
      end: new Date(2025, 4, 20),
      progress: 10,
      styles: { backgroundColor: "#ffc107", progressColor: "#e0a800" },
    },
  ]);

  // 🟩 The key logic to toggle hideChildren for a project
  const handleExpanderClick = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, hideChildren: !t.hideChildren };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gantt with Grouping & Collapse</h1>
      <div style={{ height: 600 }}>
        <Gantt
          tasks={tasks}
          viewMode={ViewMode.Day}
          onExpanderClick={handleExpanderClick}
        />
      </div>
    </div>
  );
}
