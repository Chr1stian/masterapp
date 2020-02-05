import React from "react";
import { Task } from "../App";
import { CodeInput } from ".";

interface ContentContainerProps {
  className?: string;
  task: Task;
  changeTask: (task: Task) => void;
}

const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps
) => {
  const { task, className, changeTask } = props;

  return (
    <div className={className}>
      <CodeInput code={task.code} changeTask={changeTask} task={task} />
    </div>
  );
};

export default ContentContainer;
