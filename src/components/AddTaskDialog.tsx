import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  createStyles,
  makeStyles
} from "@material-ui/core";
import { Task } from "../App";
import AlertDialog from "./AlertDialog";

interface AddTaskDialogProps {
  tasks: Task[];
  addTask: (newTask: Task) => void;
}

const drawerWidth = 200;
const useStyles = makeStyles(() =>
  createStyles({
    taskButton: {
      width: drawerWidth
    }
  })
);

const AddTaskDialog: React.FC<AddTaskDialogProps> = (
  props: AddTaskDialogProps
) => {
  const classes = useStyles();
  const { tasks, addTask } = props;
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [taskName, setTaskName] = React.useState("Task " + (tasks.length + 1));

  const handleClickOpen = (): void => {
    if (tasks.length >= 1) {
      setAlertOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = () => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTaskName(event.target.value);
  };

  const handleCreate = (): void => {
    addTask({ label: taskName, code: "", splitCode: [], language: "python" });
    handleClose();
  };

  return (
    <div>
      <Button
        className={classes.taskButton}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add task
      </Button>
      <AlertDialog
        title={"Only one task"}
        text={
          "In this version it is only possible to create and export a single task"
        }
        open={alertOpen}
        setOpen={setAlertOpen}
      ></AlertDialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={false}
        maxWidth={"xs"}
      >
        <DialogTitle id="form-dialog-title">Create new task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of your task here. It will be displayed above the
            created task description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="text"
            fullWidth
            value={taskName}
            onChange={handleChange()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTaskDialog;
