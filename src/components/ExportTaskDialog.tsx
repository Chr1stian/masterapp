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
    doubleCard: { margin: "5px", display: "flex", flexDirection: "row" },
    doubleMedia: {
      height: 350,
      width: "50%",
      marginLeft: "2%",
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

  const checkIfSplit = (): boolean => {
    const isSplit = tasks[0]?.splitCode?.map((code) => {
      return code.length !== 3;
    });
    return !isSplit?.includes(false);
  };

  return (
    <div className={classes.div}>
      <Button
        className={classes.taskButton}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        disabled={checkIfSplit()}
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
          <Card className={classes.doubleCard}>
            <CardMedia
              className={classes.doubleMedia}
              image={require("../images/handle_duplicates.png")}
            />
            <CardMedia
              className={classes.doubleMedia}
              image={require("../images/preview_task.png")}
            />
          </Card>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#f0f2f0" }}>
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
          <Button onClick={handleCreate} color="primary" variant="outlined">
            Download ZIP
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExportTaskDialog;
