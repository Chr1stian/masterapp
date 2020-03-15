import React from "react";
import { Task } from "../App";
import {
  makeStyles,
  createStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Card,
  Typography
} from "@material-ui/core";
import CropIcon from "@material-ui/icons/Crop";
import reactStringReplace from "react-string-replace";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    container: {},
    list: { width: "100%" },
    listItem: {
      whiteSpace: "pre-wrap",
      minHeight: "32px",
      borderBottom: "2px dotted grey",
      margin: "2px"
    },
    card: {
      width: "25%",
      alignSelf: "auto"
    },
    cardContent: {
      display: "flex",
      flexDirection: "row"
    },
    gap: {
      width: "100px",
      borderStyle: "dashed",
      marginLeft: "5px",
      marginRight: "5px"
    }
  })
);

interface CodeOutputViewProps {
  task: Task;
  changeTask: (task: Task) => void;
}

const CodeOutputView: React.FC<CodeOutputViewProps> = (
  props: CodeOutputViewProps
) => {
  const classes = useStyles();
  const { task, changeTask } = props;
  const [selectedText, setSelectedText] = React.useState<undefined | string>(
    ""
  );

  const handleMouseUp = (): void => {
    const selection = window.getSelection()?.toString();
    if (window.getSelection()) {
      setSelectedText(selection);
    }
  };

  const handleOnClick = (index: number, value: string): void => {
    if (task.splitCode[index].length === 3) {
      alert("Can only split once per line");
    } else if (selectedText) {
      const replacedString = reactStringReplace(
        value,
        selectedText,
        (match: string) => match
      );
      task.splitCode[index] = replacedString;
      changeTask(task);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container} onMouseUp={handleMouseUp}>
        <List className={classes.list}>
          {task.splitCode.map((value: any, index: number) => {
            return (
              <ListItem key={index} dense className={classes.listItem}>
                {value.length === 1 && <Typography>{value}</Typography>}
                {value.length !== 1 && (
                  <div className={classes.cardContent}>
                    <Typography>{value[0]}</Typography>
                    <Card className={classes.gap} variant="outlined"></Card>
                    <Typography>{value[2]}</Typography>
                  </div>
                )}
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={(): void => handleOnClick(index, value)}
                  >
                    <CropIcon />
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
