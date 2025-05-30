import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export const CustomTaskListHeader = ({
  headerHeight,
  rowWidth,
  fontFamily,
  fontSize,
}) => (
  <div
    style={{
      height: headerHeight,
      width: rowWidth,
      fontFamily,
      fontSize,
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
    }}
    className="flex border-y"
  >
    <div className="flex px-2 font-semibold items-center whitespace-nowrap w-70">
      <p>Projects</p>
    </div>
    <div className="flex px-2 font-semibold items-center whitespace-nowrap w-40">
      <p>Project Owner</p>
    </div>
    <div className="flex px-2 font-semibold items-center whitespace-nowrap w-30">
      <p>Status</p>
    </div>
    <div className="flex px-2 font-semibold items-center whitespace-nowrap w-25">
      <p>Start Date</p>
    </div>
    <div className="flex px-2 font-semibold items-center whitespace-nowrap w-25">
      <p>End Date</p>
    </div>
  </div>
);

export const CustomTaskListTable = ({
  rowHeight,
  rowWidth,
  fontFamily,
  fontSize,
  tasks,
  selectedTaskId,
  setSelectedTask,
  allTasks,
  onExpanderClick,
}) => {
  const hasChildren = (task) =>
    (allTasks || tasks).some((t) => t.project === task.id);

  const getVisibleTasks = () => {
    const visible = [];
    const hiddenProjects = new Set();
    for (const task of tasks) {
      if (
        task.type !== "project" &&
        task.project &&
        hiddenProjects.has(task.project)
      )
        continue;
      visible.push(task);

      if (task.type === "project" && task.hideChildren)
        hiddenProjects.add(task.id);
    }
    return visible;
  };

  const getTaskDepth = (task, allTasks) => {
    let depth = 0;
    let current = task;
    while (current.project) {
      depth += 1;
      current = (allTasks || []).find((t) => t.id === current.project);
      if (!current) break;
    }
    return depth;
  };

  return (
    <div style={{ width: rowWidth, fontFamily, fontSize }}>
      {getVisibleTasks().map((task) => (
        <div
          key={task.id}
          className={cn(task.status && "border-y")}
          style={{
            height: rowHeight,
            background: task.id === selectedTaskId ? "#f0f0f0" : "transparent",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setSelectedTask(task.id)}
        >
          <div
            className="pl-3 flex-none px-2 whitespace-nowrap w-70 text-wrap flex items-center"
            style={{
              paddingLeft: `${getTaskDepth(task, allTasks) * 20 + 12}px`,
            }}
          >
            {/* Always show expander for projects that have (or could have) children */}
            {(task.type === "project" || hasChildren(task)) && (
              <Button
                className="mr-2 focus:outline-none"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  // e.stopPropagation()
                  onExpanderClick && onExpanderClick(task);
                }}
                title={task.hideChildren ? "Expand" : "Collapse"}
              >
                <ChevronDown
                  className={cn(
                    task.hideChildren ? "-rotate-90" : "",
                    "transition-transform duration-300"
                  )}
                />
              </Button>
            )}
            <p className="text-wrap">{task.name}</p>
          </div>
          <div className="flex-none px-2 whitespace-nowrap w-40">
            {task.project_owner ? (
              <p className="text-wrap">{task.project_owner}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex-none px-2 whitespace-nowrap w-30">
            {task.status ? (
              <Badge
                style={{
                  backgroundColor: task.status_color || "#B35B0E",
                  color: "#fff",
                }}
              >
                {task.status}
              </Badge>
            ) : (
              ""
            )}
          </div>
          <div className="flex-none px-2 whitespace-nowrap w-25">
            {task.start instanceof Date
              ? task.start.toLocaleDateString()
              : ""}
          </div>
          <div className="flex-none px-2 whitespace-nowrap w-25">
            {task.end instanceof Date
              ? task.end.toLocaleDateString()
              : ""}
          </div>
        </div>
      ))}
    </div>
  );
};
