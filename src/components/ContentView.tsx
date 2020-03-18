import React, { ReactElement } from "react";
import { Task } from "../App";
import { CodeInput, CodeOutput } from ".";

interface ContentViewProps {
  tabIndex: number;
  task: Task;
  changeTask: (task: Task) => void;
}

const ContentView: React.FC<ContentViewProps> = (
  props: ContentViewProps,
  children
) => {
  const { tabIndex, task, changeTask } = props;
  if (tabIndex === 0) {
    return <CodeInput code={task.code} changeTask={changeTask} task={task} />;
  } else if (tabIndex === 1) {
    return <CodeOutput task={task} changeTask={changeTask} />;
  }
  return children as ReactElement<unknown>;
};

export default ContentView;
