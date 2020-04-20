import React from "react";
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  createStyles,
  makeStyles,
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
      height: "100%",
    },
    div: { height: "100%" },
    card: { margin: "5px" },
    media: {
      height: 0,
      paddingTop: "18.25%", // 16:9
    },
  })
);

const ExportTaskDialog: React.FC<ExportTaskDialogProps> = (
  props: ExportTaskDialogProps
) => {
  const classes = useStyles();
  const { handleExport, tasks } = props;
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
        disabled={tasks[0]?.splitCode[0]?.length !== 3}
      >
        Export tasks
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
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={require("../images/author_questions.png")}
            />
          </Card>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={require("../images/dropdown_importQTI.png")}
            />
          </Card>

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
