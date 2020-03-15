import React from "react";
import { Task } from "../App";
import { CodeInput, CodeOutput } from ".";

interface ContentContainerProps {
  className?: string;
  task: Task;
  changeTask: (task: Task) => void;
  tabIndex: number;
}

const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps
) => {
  const { task, className, changeTask, tabIndex } = props;

  return (
    <div className={className}>
      {tabIndex === 0 && task && (
        <CodeInput code={task.code} changeTask={changeTask} task={task} />
      )}
      {tabIndex === 1 && task && (
        <CodeOutput task={task} changeTask={changeTask} />
      )}
    </div>
  );
};

export default ContentContainer;
