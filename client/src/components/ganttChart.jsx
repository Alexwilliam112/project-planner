"use client";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useState } from "react";
import { getStartEndDateForProject } from "../utils/helpers.js";
import { ViewSwitcher } from "../components/viewSwitcher";

const ganttStyles = {
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
  todayColor: "rgba(255, 167, 167, 0.5)",
};

export default function App() {
  const [view, setView] = useState(ViewMode.Day);
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
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div>
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        {...ganttStyles}
      />
    </div>
  );
}
