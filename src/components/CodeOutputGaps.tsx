import React from "react";
import { Task } from "../App";
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    container: {},
    card: {},
    cardContent: {
      display: "flex",
      flexDirection: "row"
    },
    list: {
      display: "flex",
      flexDirection: "row"
    },
    listItemText: {
      height: "30px"
    },
    gap: {
      width: "100px"
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
        {task.splitCode.map((value: any) => {
          return (
            typeof value !== "string" &&
            value[1] && (
              <div className={classes.cardContent}>
                <Card className={classes.gap} variant="outlined">
                  <CardContent>
                    <Typography>{value[1]}</Typography>
                  </CardContent>
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
