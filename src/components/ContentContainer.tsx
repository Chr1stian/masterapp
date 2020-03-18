import React from "react";
import { Task } from "../App";
import ContentView from "./ContentView";
import NavigationButtons from "./NavigationButtons";

interface ContentContainerProps {
  task: Task;
  changeTask: (task: Task) => void;
  changeTab: (selectedTab: number) => void;

  tabIndex: number;
}

const ContentContainer: React.FC<ContentContainerProps> = (
  props: ContentContainerProps
) => {
  const { task, changeTask, tabIndex, changeTab } = props;

  return (
    <div>
      {task && (
        <div>
          <ContentView
            tabIndex={tabIndex}
            task={task}
            changeTask={changeTask}
          />
          <NavigationButtons
            task={task}
            tabIndex={tabIndex}
            changeTab={changeTab}
          />
        </div>
      )}
    </div>
  );
};

export default ContentContainer;
