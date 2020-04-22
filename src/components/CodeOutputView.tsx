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
  Typography,
} from "@material-ui/core";
import CropIcon from "@material-ui/icons/Crop";
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    container: {},
    list: {
      width: "max-content",
      display: "inline-flex",
      flexDirection: "column",
    },
    listItem: {
      whiteSpace: "pre-wrap",
      minHeight: "32px",
      borderBottom: "2px dotted grey",
      margin: "2px",
    },
    card: {
      width: "25%",
      alignSelf: "auto",
    },
    cardContent: {
      display: "flex",
      flexDirection: "row",
    },
    gap: {
      borderStyle: "dashed",
      marginLeft: "5px",
      marginRight: "5px",
    },
    content: {
      marginRight: "35px",
    },
  })
);

interface CodeOutputViewProps {
  task: Task;
  changeTask: (task: Task) => void;
  gapWidth: number;
}

const CodeOutputView: React.FC<CodeOutputViewProps> = (
  props: CodeOutputViewProps
) => {
  const classes = useStyles();
  const { task, changeTask, gapWidth } = props;
  const [anchorOffset, setAnchorOffset] = React.useState<undefined | number>(0);
  const [focusOffset, setFocusOffset] = React.useState<undefined | number>(0);
  const [alertTitle, setAlertTitle] = React.useState("Error");
  const [alertText, setAlertText] = React.useState(
    "Something went wrong. Contact the developer with information on how you produced this error."
  );

  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleMouseUp = (): void => {
    const selection = window.getSelection();
    if (window.getSelection()) {
      setAnchorOffset(selection?.anchorOffset);
      setFocusOffset(selection?.focusOffset);
    }
  };

  const handleOnClick = (index: number, value: string): void => {
    if (value.length >= 3) {
      setAlertTitle("One split only");
      setAlertText(
        "You can only split the text once per line. Contact the developer if this is something you think should be changed"
      );
      setAlertOpen(true);
    } else {
      if (
        value[0] === window.getSelection()?.anchorNode?.nodeValue?.toString()
      ) {
        if (anchorOffset !== undefined && focusOffset !== undefined) {
          const startpoint = Math.min(anchorOffset, focusOffset);
          const endpoint = Math.max(anchorOffset, focusOffset);
          value = value[0];
          const replacedString = [
            value.substring(0, startpoint),
            value.substring(startpoint, endpoint),
            value.substring(endpoint, value.length),
          ];
          task.splitCode[index] = replacedString;
          changeTask(task);
        }
      } else {
        setAlertTitle("Wrong selection");
        setAlertText(
          "You need to select text and press the button that belongs to the same line"
        );
        setAlertOpen(true);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <List className={classes.list}>
          {task.splitCode.map((value: any, index: number) => {
            return (
              <ListItem
                key={index}
                dense
                className={classes.listItem}
                onMouseUp={handleMouseUp}
              >
                {value.length === 1 && <Typography>{value}</Typography>}
                {value.length !== 1 && (
                  <div className={classes.cardContent}>
                    <Typography>{value[0]}</Typography>
                    <Card
                      className={classes.gap}
                      variant="outlined"
                      style={{ width: gapWidth }}
                    ></Card>
                    <Typography>{value[2]}</Typography>
                  </div>
                )}

                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="crop"
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
      <AlertDialog
        open={alertOpen}
        setOpen={setAlertOpen}
        title={alertTitle}
        text={alertText}
      ></AlertDialog>
    </div>
  );
};

export default CodeOutputView;
