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
    list: { width: "100%" },
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
      width: "100px",
      borderStyle: "dashed",
      marginLeft: "5px",
      marginRight: "5px",
    },
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
  const [anchorOffset, setAnchorOffset] = React.useState<undefined | number>(0);
  const [focusOffset, setFocusOffset] = React.useState<undefined | number>(0);

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
      setAlertOpen(true);
    } else if (anchorOffset && focusOffset) {
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
      <AlertDialog
        open={alertOpen}
        setOpen={setAlertOpen}
        title={"One split only"}
        text={
          "You can only split the text once per line. Contact the developer if this is something you think should be changed."
        }
      ></AlertDialog>
    </div>
  );
};

export default CodeOutputView;
