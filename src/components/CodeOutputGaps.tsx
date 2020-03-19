import React, { ReactNodeArray } from "react";
import { Task } from "../App";
import { makeStyles, createStyles, Card, Typography } from "@material-ui/core";
import AddDistractors from "./AddDistractors";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    container: {},
    card: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      minHeight: "26px",
      marginTop: "5px",
      padding: "5px",
      backgroundColor: "#e6ebf2"
    },
    cardContent: {},
    gap: {
      width: "100px",
      margin: "2px"
    },
    typography: {
      textAlign: "center"
    },
    distractors: { marginLeft: "auto" }
  })
);

interface CodeOutputGapsProps {
  task: Task;
  changeTask: (task: Task) => void;
}

const CodeOutputGaps: React.FC<CodeOutputGapsProps> = (
  props: CodeOutputGapsProps
) => {
  const classes = useStyles();
  const { task, changeTask } = props;

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        {task.splitCode.map((value: ReactNodeArray, index) => {
          return (
            typeof value !== "string" &&
            value[1] && (
              <div className={classes.cardContent} key={index}>
                <Card className={classes.gap} variant="outlined">
                  <Typography className={classes.typography}>
                    {value[1]}
                  </Typography>
                </Card>
              </div>
            )
          );
        })}
        {task.distractors.map((value: string) => {
          return (
            <div className={classes.cardContent} key={value}>
              <Card className={classes.gap} variant="outlined">
                <Typography className={classes.typography}>{value}</Typography>
              </Card>
            </div>
          );
        })}
        <div className={classes.distractors}>
          <AddDistractors task={task} changeTask={changeTask} />
        </div>
      </Card>
    </div>
  );
};

export default CodeOutputGaps;
