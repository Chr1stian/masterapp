import React from "react";
import { Task, Tasks } from "../App";
import { CodeInput, CodeOutput } from ".";
// import { Button } from "@material-ui/core";

interface ContentContainerProps {
  className?: string;
  tasks: Tasks;
  selectedTask: number;
  changeTask: (key: number, task: Task) => void;
  tabIndex: number;
}

const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps
) => {
  const { tasks, selectedTask, className, changeTask, tabIndex } = props;

  return (
    <div className={className}>
      {tabIndex === 0 && (
        <CodeInput
          selectedTask={selectedTask}
          code={tasks[selectedTask].code}
          changeTask={changeTask}
          task={tasks[selectedTask]}
        />
      )}
      {tabIndex === 1 && (
        <CodeOutput
          task={tasks[selectedTask]}
          selectedTask={selectedTask}
          changeTask={changeTask}
        />
      )}
    </div>
  );
};

export default ContentContainer;
