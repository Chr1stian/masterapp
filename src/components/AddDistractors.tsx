import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Task } from "../App";
import { TextField } from "@material-ui/core";

interface AddDistractorsProps {
  task: Task;
  changeTask: (task: Task) => void;
}

const AddDistractors: React.FC<AddDistractorsProps> = (
  props: AddDistractorsProps
) => {
  const { task, changeTask } = props;
  const [open, setOpen] = React.useState(false);
  const [distractor, setDistractor] = React.useState("");

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleCreate = (): void => {
    task.distractors.push(distractor);
    changeTask(task);
    handleClose();
  };

  const handleChange = () => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDistractor(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Distractor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Distractors"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              "A distractor is an incorrect answer option. It is usually similar to a correct answer to test the person undertaking the test"
            }
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter your distractor here"
            type="text"
            fullWidth
            value={distractor}
            onChange={handleChange()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate} color="primary" autoFocus>
            Add distractor
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDistractors;
