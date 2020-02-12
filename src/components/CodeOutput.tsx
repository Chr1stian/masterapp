import React from "react";
import { Task } from "../App";
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import reactStringReplace from "react-string-replace";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      whiteSpace: "pre-wrap"
    },
    span: {
      color: "red"
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

  React.useEffect(() => {
    task.splitCode = task.code.split("\n");
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
    changeTask(selectedTask + 1, task);
  };

  return (
    <div>
      <div className={classes.div} onMouseUp={handleMouseUp}>
        <List>
          {task.code.split("\n").map((value: string, index) => {
            return (
              <ListItem key={index} dense>
                <ListItemText primary={value}></ListItemText>
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
      <div>{task.splitCode?.toString()}</div>
    </div>
  );
};

export default CodeOutput;
