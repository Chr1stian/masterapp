import React from "react";
import { Task } from "../App";
import { makeStyles, createStyles } from "@material-ui/core";
import CodeOutputGaps from "./CodeOutputGaps";
import CodeOutputView from "./CodeOutputView";
import DirectionCard from "./DirectionCard";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "column"
    }
  })
);

interface CodeOutputProps {
  task: Task;
  changeTask: (key: number, task: Task) => void;
  selectedTask: number;
}

const CodeOutput: React.FC<CodeOutputProps> = (props: CodeOutputProps) => {
  const classes = useStyles();
  const { task, changeTask, selectedTask } = props;

  return (
    <div className={classes.wrapper}>
      <DirectionCard
        text={"Highlight text/code to be cut and press the crop icon"}
      ></DirectionCard>
      <CodeOutputGaps task={task} />
      <CodeOutputView
        task={task}
        changeTask={changeTask}
        selectedTask={selectedTask}
      />
    </div>
  );
};

export default CodeOutput;
