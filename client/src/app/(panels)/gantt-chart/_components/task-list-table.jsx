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
    className="flex"
  >
    <div className="pl-8 flex-none px-2 font-bold whitespace-nowrap w-70">
      Task Name
    </div>
    <div className="flex-none px-2 font-bold whitespace-nowrap w-30">
      Status
    </div>
    <div className="flex-none px-2 font-bold whitespace-nowrap w-25">
      Start Date
    </div>
    <div className="flex-none px-2 font-bold whitespace-nowrap w-25">
      End Date
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
  onAddTask,
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
            className="pl-3 flex-none px-2 whitespace-nowrap w-70 flex items-center"
            style={{
              paddingLeft: `${getTaskDepth(task, allTasks) * 20 + 12}px`,
            }}
          >
            {/* Always show expander for projects that have (or could have) children */}
            {task.type === "project" && hasChildren(task) && (
              <button
                className="mr-2 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  onExpanderClick && onExpanderClick(task);
                }}
                title={task.hideChildren ? "Expand" : "Collapse"}
              >
                {task.hideChildren ? "▶" : "▼"}
              </button>
            )}
            {task.block_type == "subproject" && (
              <button
                className="ml-1 mb-1 text-blue-600 hover:text-blue-800 text-lg font-bold focus:outline-none"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  lineHeight: 1,
                  cursor: "pointer",
                }}
                onClick={() => onAddTask && onAddTask()}
                title="Add subtask"
              >
                +
              </button>
            )}
            {task.name}
          </div>
          <div className="flex-none px-2 whitespace-nowrap w-30">
            {task.status ? task.status : task.progress + " %"}
          </div>
          <div className="flex-none px-2 whitespace-nowrap w-25">
            {task.start instanceof Date ? task.start.toLocaleDateString() : ""}
          </div>
          <div className="flex-none px-2 whitespace-nowrap w-25">
            {task.end instanceof Date ? task.end.toLocaleDateString() : ""}
          </div>
        </div>
      ))}
    </div>
  );
};
