import React from "react";
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

interface CodeOutputViewProps {
  task: Task;
  changeTask: (key: number, task: Task) => void;
  selectedTask: number;
}

const CodeOutputView: React.FC<CodeOutputViewProps> = (
  props: CodeOutputViewProps
) => {
  const classes = useStyles();
  const { task, changeTask, selectedTask } = props;
  const [selectedText, setSelectedText] = React.useState<undefined | string>(
    ""
  );

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
      <div className={classes.container} onMouseUp={handleMouseUp}>
        <List className={classes.list}>
          {task.splitCode.map((value: any, index: number) => {
            return (
              <ListItem key={index} dense>
                {value.length === 1 && (
                  <ListItemText
                    primary={
                      <Card>
                        <CardContent>
                          <Typography>{value}</Typography>
                        </CardContent>
                      </Card>
                    }
                  ></ListItemText>
                )}
                {value.length !== 1 && (
                  <ListItemText
                    primary={
                      <Card>
                        <CardContent className={classes.cardContent}>
                          <Typography>{value[0]}</Typography>
                          <Card
                            className={classes.gap}
                            variant="outlined"
                          ></Card>
                          <Typography>{value[2]}</Typography>
                        </CardContent>
                      </Card>
                    }
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
    </div>
  );
};

export default CodeOutputView;