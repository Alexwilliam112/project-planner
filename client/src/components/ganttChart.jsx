"use client";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useState } from "react";
import { getStartEndDateForProject } from "../utils/helpers.js";
import { ViewSwitcher } from "../components/viewSwitcher";
import { CustomTaskListTable, CustomTaskListHeader } from "./taskListTable.jsx";

const ganttStyles = {
  rowHeight: 50,
  barCornerRadius: 4,
  barFill: 60,
  handleWidth: 8,
  fontFamily: "Segoe UI, Arial, sans-serif",
  fontSize: "15px",
  barProgressColor: "#388e3c",
  barProgressSelectedColor: "#388e3c",
  barBackgroundColor: "#683E3E",
  barBackgroundSelectedColor: "#683E3E",
  arrowColor: "#616161",
  arrowIndent: 10,
  todayColor: "rgba(194, 194, 194, 0.5)",
};

export default function GanttChart() {
  const [view, setView] = useState(ViewMode.Week);
  const [tasks, setTasks] = useState([
    {
      id: "P1",
      name: "Karyamas Adinusantara",
      type: "project",
      block_type: "project",
      type_of_custom: "Core + Officeless",
      type_of_project: "App Builder",
      status: "On Progress",
      start: new Date(2025, 4, 1),
      end: new Date(2025, 4, 30),
      progress: 40,
      hideChildren: false,
      styles: { backgroundColor: "#B35B0E", progressColor: "#B35B0E" },
    },
    {
      id: "SP1",
      name: "Talenta",
      type: "project",
      block_type: "subproject_core",
      tpm: "Nata Liong",
      pm: "Krisna Atteyendra",
      status: "Development",
      project: "P1",
      start: new Date(2025, 4, 1),
      end: new Date(2025, 4, 15),
      progress: 60,
      hideChildren: false,
      styles: { backgroundColor: "#AC0E0E", progressColor: "#AC0E0E" },
    },
    {
      id: "T1",
      name: "RFC Creation",
      type: "task",
      project: "SP1",
      start: new Date(2025, 4, 2),
      end: new Date(2025, 4, 5),
      progress: 100,
    },
    {
      id: "T2",
      name: "Development",
      type: "task",
      project: "SP1",
      start: new Date(2025, 4, 6),
      end: new Date(2025, 4, 10),
      dependencies: ["T1"],
      progress: 50,
    },
    {
      id: "T20",
      name: "E2E Testing",
      type: "task",
      project: "SP1",
      start: new Date(2025, 4, 6),
      end: new Date(2025, 4, 10),
      dependencies: ["T2", "T3"],
      progress: 50,
    },
    {
      id: "SP2",
      name: "Officeless",
      type: "project",
      block_type: "subproject_oos",
      pm: "Daffa",
      sa: "Caroline",
      status: "Development",
      project: "P1",
      start: new Date(2025, 4, 1),
      end: new Date(2025, 4, 15),
      progress: 60,
      hideChildren: false,
      styles: { backgroundColor: "#550EAC", progressColor: "#550EAC" },
    },
    {
      id: "T3",
      name: "Development",
      type: "task",
      project: "SP2",
      start: new Date(2025, 4, 17),
      end: new Date(2025, 4, 20),
      progress: 10,
    },
  ]);
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const MyTooltip = ({ task, fontSize, fontFamily }) => (
    <div style={{ fontSize, fontFamily, padding: 8 }} className="bg-white">
      <div>
        <strong>{task.name}</strong>
      </div>
      {task.block_type === "project" && (
        <div>
          <div className="font-medium">
            Type of Custom: {task.type_of_custom}
          </div>
          <div className="font-medium">
            Type of Project: {task.type_of_project}
          </div>
          <div className="">Status: {task.status}</div>
        </div>
      )}
      {task.block_type === "subproject_core" && (
        <div>
          <div className="font-medium">Product Manager: {task.pm}</div>
          <div className="font-medium">
            Technical Program Manager: {task.tpm}
          </div>
          <div className="">Status: {task.status}</div>
        </div>
      )}
      {task.block_type === "subproject_oos" && (
        <div>
          <div className="font-medium">Project Manager: {task.pm}</div>
          <div className="font-medium">System Analyst: {task.sa}</div>
          <div className="">Status: {task.status}</div>
        </div>
      )}
      <div>Start: {task.start.toLocaleDateString()}</div>
      <div>End: {task.end.toLocaleDateString()}</div>
      {/* Add any custom info here */}
    </div>
  );

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
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...t, hideChildren: !t.hideChildren } : t
      )
    );
  };

  return (
    <div>
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <Gantt
        tasks={tasks}
        allTasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        listCellWidth={isChecked ? "auto" : ""}
        columnWidth={columnWidth}
        TaskListHeader={CustomTaskListHeader}
        onExpanderClick={handleExpanderClick}
        TooltipContent={MyTooltip}
        TaskListTable={(props) => (
          <CustomTaskListTable
            {...props}
            allTasks={tasks}
            onExpanderClick={handleExpanderClick}
          />
        )}
        {...ganttStyles}
      />
    </div>
  );
}
