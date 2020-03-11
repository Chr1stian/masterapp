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
    wrapper: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row"
    },
    container: {
      whiteSpace: "pre-wrap"
    },
    card: {},
    list: { display: "flex", flexDirection: "row" },
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
        <List className={classes.list}>
          {task.splitCode.map((value: any, index: number) => {
            return (
              typeof value !== "string" &&
              value[1] && (
                <ListItem key={index} dense>
                  <ListItemText
                    primary={
                      <Card className={classes.gap} variant="outlined">
                        <CardContent>
                          <Typography>{value[1]}</Typography>
                        </CardContent>
                      </Card>
                    }
                  ></ListItemText>
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
