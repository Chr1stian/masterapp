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
      padding: "5px",
      minHeight: "68vh"
    }
  })
);

interface CodeOutputProps {
  task: Task;
  changeTask: (task: Task) => void;
}

const CodeOutput: React.FC<CodeOutputProps> = (props: CodeOutputProps) => {
  const classes = useStyles();
  const { task, changeTask } = props;

  return (
    <div className={classes.wrapper}>
      <DirectionCard
        text={"Highlight text/code to be cut and press the crop icon"}
      ></DirectionCard>
      <Card className={classes.card}>
        <CodeOutputGaps task={task} changeTask={changeTask} />
        <CodeOutputView task={task} changeTask={changeTask} />
      </Card>
    </div>
  );
};

export default CodeOutput;
