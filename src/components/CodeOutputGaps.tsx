import React from "react";
import { Task } from "../App";
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemText,
  Card
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row"
    },
    container: {
      whiteSpace: "pre-wrap"
    },
    span: {
      color: "red"
    },
    list: {},
    card: {
      // flex: "0 0 1",
      width: "25%",
      alignSelf: "auto" // TODO: move to right?
    },
    cardContent: {
      display: "flex",
      flexDirection: "row"
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
        <List>
          {task.splitCode.map((value: any, index: number) => {
            return (
              typeof value !== "string" &&
              value && (
                <ListItem key={index} dense>
                  <ListItemText primary={value[1]}></ListItemText>
                </ListItem>
              )
            );
          })}
        </List>
      </Card>
    </div>
  );
};

export default CodeOutputGaps;
