import React, { ReactNodeArray } from "react";
import { Task } from "../App";
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  Typography,
  CardContent,
  Button
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import reactStringReplace from "react-string-replace";

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
  const [selectedText, setSelectedText] = React.useState<undefined | string>(
    ""
  );

  // Update component when code is changed
  React.useEffect(() => {
    // const newSplitCode = [...task.splitCode];
    const newSplitCode: ReactNodeArray[] = [];
    const split = task.code.split("\n");
    console.log("useEffect, splitCode: ", newSplitCode);
    split.forEach(element => {
      newSplitCode.push([element]);
    });
    task.splitCode = newSplitCode;
  }, [task.code]);

  // Populate component on mount
  React.useEffect(() => {
    const newSplitCode: ReactNodeArray[] = [];
    const split = task.code.split("\n");
    split.forEach(element => {
      newSplitCode.push([element]);
    });
    task.splitCode = newSplitCode;
  }, []);

  const handleMouseUp = (): void => {
    const selection = window.getSelection()
      ? window.getSelection()?.toString()
      : "";
    if (window.getSelection()) {
      setSelectedText(selection);
    }
    // TODO: Handle when nothing is selected
  };

  const handleOnClick = (index: number, value: string): void => {
    const replacedString = reactStringReplace(
      value,
      selectedText,
      (match: string) => match
    );
    task.splitCode[index] = replacedString;
    changeTask(selectedTask, task);
  };

  return (
    <div className={classes.wrapper}>
      <Button
        onClick={() => {
          console.log(task.splitCode);
        }}
      ></Button>
      <div className={classes.container} onMouseUp={handleMouseUp}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              Mark text/code and press cut to extract selection
            </Typography>
          </CardContent>
        </Card>
        <List className={classes.list}>
          {task.splitCode.map((value: any, index: number) => {
            return (
              <ListItem key={index} dense>
                {value.length === 1 && (
                  <ListItemText primary={value}></ListItemText>
                )}
                {value.length !== 1 && (
                  <ListItemText
                    primary={value[0] + " ".repeat(value[1].length) + value[2]}
                  ></ListItemText>
                )}
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={(): void => handleOnClick(index, value)}
                  >
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
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

export default CodeOutput;
