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
import { Controlled as CodeMirror } from "react-codemirror2";
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

interface Task {
  label: string;
  items?: string[]; //React.Component
  code: string;
}

interface TaskList {
  tasks: Task[];
}

const App: React.FC = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [tasks, setTasks] = React.useState(["Test"]);
  const [code, setCode] = React.useState("<h1>I love xml</h1>");
  // Helper functions
  const addTask = (newTask: string): void => {
    const newTasks: string[] = [...tasks, newTask];
    setTasks(newTasks);
  };
  const changeTab = (
    event: React.ChangeEvent<{}>,
    selectedTab: number
  ): void => {
    setTabIndex(selectedTab);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Tabs
            value={tabIndex}
            aria-label="task_steps_bar"
            onChange={changeTab}
          >
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
          value={code}
          options={{
            mode: "xml",
            theme: "material",
            lineNumbers: true
          }}
          onBeforeChange={(_editor, _data, value): void => {
            setCode(value);
          }}
          onChange={(): void => {
            console.log("code:", code);
          }}
        />
        <Typography paragraph>Lorem ipsum.</Typography>
        <Typography paragraph>Dolores it.</Typography>
      </main>
    </div>
  );
};

export default App;
