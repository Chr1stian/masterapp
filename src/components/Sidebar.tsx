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
  tasks: Task[];
  addTask: (newTask: string) => void;
  selectedTask: number;
  setSelectedTask: (taskIndex: number) => void;
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
    }
  })
);

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const classes = useStyles();
  const { tasks, addTask, selectedTask, setSelectedTask } = props;

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
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {tasks.map((task, index) => (
            <MenuItem
              button
              key={index}
              selected={selectedTask === index}
              onClick={(): void => setSelectedTask(index)}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={task.label + " " + (index + 1)} />
            </MenuItem>
          ))}
        </List>
        <Button
          className={classes.taskButton}
          onClick={(): void => addTask("tekst")}
        >
          Add task
        </Button>
      </Drawer>
    </div>
  );
};

export default Sidebar;
