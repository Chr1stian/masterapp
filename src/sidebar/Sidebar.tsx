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

interface SidebarProps {
  tasks: string[];
  addTask: (newTask: string) => void;
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
  const [selected, setSelected] = React.useState(0);
  const { tasks, addTask } = props;

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
          {tasks.map((text, index) => (
            <MenuItem
              button
              key={index}
              selected={selected === index}
              onClick={(): void => setSelected(index)}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text + " " + (index + 1)} />
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
