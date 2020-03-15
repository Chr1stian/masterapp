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

interface ExportTaskDialogProps {
  tasks: Task[];
  handleExport: (fileName: string) => void;
}

const drawerWidth = 200;
const useStyles = makeStyles(() =>
  createStyles({
    taskButton: {
      width: drawerWidth,
      height: "100%"
    },
    div: { height: "100%" },
    image: { width: "100%", margin: "10px" }
  })
);

const ExportTaskDialog: React.FC<ExportTaskDialogProps> = (
  props: ExportTaskDialogProps
) => {
  const classes = useStyles();
  const { handleExport } = props;
  const [open, setOpen] = React.useState(false);
  const [fileName, setfileName] = React.useState("Inspera_tasks");

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChange = () => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setfileName(event.target.value);
  };

  const handleCreate = (): void => {
    handleExport(fileName);
    handleClose();
  };

  return (
    <div className={classes.div}>
      <Button
        className={classes.taskButton}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Export task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={false}
        maxWidth={"md"}
      >
        <DialogTitle id="form-dialog-title">Export task(s)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Exporting of tasks will create and download a ZIP-file with your
            choosen name. Upload the file in the Inspera admin-interface by
            navigating as displayed in the images below.
          </DialogContentText>
          <img
            className={classes.image}
            src={require("../images/author_questions.png")}
          />
          <img
            className={classes.image}
            src={require("../images/dropdown_importQTI.png")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Filename"
            type="text"
            fullWidth
            value={fileName}
            onChange={handleChange()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate} color="primary">
            Download ZIP
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExportTaskDialog;
