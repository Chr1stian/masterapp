import React from "react";
import { Task } from "../App";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      whiteSpace: "pre-wrap"
    }
  })
);

interface CodeOutputProps {
  task: Task;
}

const CodeOutput: React.FC<CodeOutputProps> = (props: CodeOutputProps) => {
  const classes = useStyles();
  const { task } = props;

  const handleMouseUp = (): void => {
    console.log(window.getSelection()?.toString());
    // TODO: Handle when nothing is selected
  };

  return (
    <div className={classes.div} onMouseUp={handleMouseUp}>
      {task.code}
    </div>
  );
};

export default CodeOutput;
