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

interface SidebarProps {
  Tasks: {
    [key: number]: Task;
  };
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
    taskButton: {
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
  const { Tasks, selectedTask, setSelectedTask, handleExport, addTask } = props;

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
          {Object.entries(Tasks).map((task, index) => (
            <MenuItem
              button
              key={index}
              selected={selectedTask === index}
              onClick={(): void => setSelectedTask(index)}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={task[1].label + " " + index} />
            </MenuItem>
          ))}
        </List>
        <Button
          className={classes.taskButton}
          onClick={(): void =>
            addTask({
              label: "test" + (Object.keys(Tasks).length + 1),
              code: "lagt til med knapp",
              splitCode: []
            })
          }
        >
          Add task
        </Button>
      </Drawer>
    </div>
  );
};

export default Sidebar;
