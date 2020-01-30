import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./App.css";
import { Typography, Toolbar } from "@material-ui/core";
import Sidebar from "./sidebar/Sidebar";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { UnControlled as CodeMirror } from "react-codemirror2";
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2)
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [value] = React.useState(0);
  const [tasks, setTasks] = React.useState(["Test"]);
  const addTask = (newTask: string): void => {
    const newTasks: string[] = [...tasks, newTask];
    setTasks(newTasks);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Tabs value={value} aria-label="task_steps_bar">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Sidebar tasks={tasks} addTask={addTask}></Sidebar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CodeMirror
          value="<h1>I ♥ react-codemirror2</h1>"
          options={{
            mode: "xml",
            theme: "material",
            lineNumbers: true
          }}
          onChange={(editor, data, value) => {}}
        />
        <Typography paragraph>Lorem ipsum.</Typography>
        <Typography paragraph>Dolores it.</Typography>
      </main>
    </div>
  );
};

export default App;
