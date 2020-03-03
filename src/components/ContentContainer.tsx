import React from "react";
import { Task, Tasks } from "../App";
import { CodeInput, CodeOutput } from ".";
// import { Button } from "@material-ui/core";

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
  /*
  const handleOnClick = (): void => {
    tasks[selectedTask + 1].splitCode = tasks[selectedTask + 1].code.split(
      "\n"
    );
    changeTask(selectedTask + 1, tasks[selectedTask + 1]);
  };
  */

  return (
    <div className={className}>
      <CodeInput
        selectedTask={selectedTask}
        code={tasks[selectedTask].code}
        changeTask={changeTask}
        task={tasks[selectedTask]}
      />
      {/*
      <Button variant="contained" onClick={handleOnClick}>
        Generate
      </Button>
       */}
      <CodeOutput
        task={tasks[selectedTask]}
        selectedTask={selectedTask}
        changeTask={changeTask}
      />
    </div>
  );
};

export default ContentContainer;
