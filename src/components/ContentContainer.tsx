import React from "react";
import { Task, Tasks } from "../App";
import { CodeInput, CodeOutput } from ".";

interface ContentContainerProps {
  className?: string;
  tasks: Tasks;
  selectedTask: number;
  changeTask: (key: number, task: Task) => void;
}

const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps
) => {
  const { tasks, selectedTask, className, changeTask } = props;

  return (
    <div className={className}>
      <CodeInput
        selectedTask={selectedTask}
        code={tasks[selectedTask + 1].code}
        changeTask={changeTask}
        task={tasks[selectedTask + 1]}
      />
      <CodeOutput task={tasks[selectedTask + 1]} />
    </div>
  );
};

export default ContentContainer;
