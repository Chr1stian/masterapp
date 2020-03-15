import React from "react";
import { Task } from "../App";
import { makeStyles, createStyles, Card } from "@material-ui/core";
import CodeOutputGaps from "./CodeOutputGaps";
import CodeOutputView from "./CodeOutputView";
import DirectionCard from "./DirectionCard";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "column"
    },
    card: {
      marginTop: "5px",
      padding: "5px"
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
      <Card className={classes.card}>
        <CodeOutputGaps task={task} />
        <CodeOutputView
          task={task}
          changeTask={changeTask}
          selectedTask={selectedTask}
        />
      </Card>
    </div>
  );
};

export default CodeOutput;
