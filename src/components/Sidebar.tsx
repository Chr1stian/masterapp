import React from "react";
import {
  Drawer,
  Button,
  List,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";

import MailIcon from "@material-ui/icons/Mail";
import { Task } from "../App";
import AddTaskDialog from "./AddTaskDialog";

interface SidebarProps {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  selectedTask: number;
  setSelectedTask: (taskIndex: number) => void;
  handleExport: () => void;
}

const drawerWidth = 200;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    dialogContainer: {
      width: drawerWidth,
      marginTop: "auto"
    },
    exportButton: {
      zIndex: 1
    }
  })
);

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const classes = useStyles();
  const { tasks, selectedTask, setSelectedTask, handleExport, addTask } = props;

  return (
    <div>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Button
          className={classes.toolbar}
          variant="contained"
          onClick={handleExport}
        >
          Export
        </Button>
        <Divider />
        <List>
          {Object.entries(tasks).map((task, index) => (
            <MenuItem
              button
              key={index}
              selected={selectedTask === index}
              onClick={(): void => setSelectedTask(index)}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={task[1].label} />
            </MenuItem>
          ))}
        </List>
        <div className={classes.dialogContainer}>
          <AddTaskDialog addTask={addTask} tasks={tasks} />
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
