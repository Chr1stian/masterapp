import React, { ReactNodeArray } from "react";
import { Task } from "../App";
import { makeStyles, createStyles, Card, Typography } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    container: {},
    card: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      minHeight: "26px",
      margin: "5px",
      padding: "5px"
    },
    cardContent: {},
    gap: {
      width: "100px",
      margin: "2px"
    },
    typography: {
      textAlign: "center"
    }
  })
);

interface CodeOutputGapsProps {
  task: Task;
}

const CodeOutputGaps: React.FC<CodeOutputGapsProps> = (
  props: CodeOutputGapsProps
) => {
  const classes = useStyles();
  const { task } = props;

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        {task.splitCode.map((value: ReactNodeArray) => {
          return (
            typeof value !== "string" &&
            value[1] && (
              <div className={classes.cardContent}>
                <Card className={classes.gap} variant="outlined">
                  <Typography className={classes.typography}>
                    {value[1]}
                  </Typography>
                </Card>
              </div>
            )
          );
        })}
      </Card>
    </div>
  );
};

export default CodeOutputGaps;
