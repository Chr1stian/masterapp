import React, { ReactNodeArray } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { Sidebar, Tabbar, ContentContainer } from "./components";

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

export interface Task {
  label: string;
  code: string;
  splitCode: ReactNodeArray;
}

export interface Tasks {
  [key: number]: Task;
}

const App: React.FC = () => {
  const classes = useStyles();
  // Handling of selection in drawer and tabs
  const [tabIndex, setTabIndex] = React.useState(0);
  const [selectedTask, setSelectedTask] = React.useState(0);

  const [tasks, setTasks] = React.useState<Tasks>({
    1: { label: "test1", code: "testcode1\nline 2", splitCode: [] },
    2: { label: "test2", code: "testcode2\nline 2", splitCode: [] },
    3: { label: "test3", code: "testcode3\nline 2", splitCode: [] }
  });

  /* Helper functions
  const addTask = (taskLabel: string): void => {
    const newTask = { label: taskLabel, code: "" };
    const newTasks: Task[] = [...tasks, newTask];
    setTasks(newTasks);
  };
  const changeTask = (task: Task): void => {
    const oldTasks = [...tasks];
    oldTasks[selectedTask] = task;
    setTasks(tasks);
  };
  */

  const updateTask = (key: number, task: Task): void => {
    setTasks(prevTasks => ({ ...prevTasks, [key]: task }));
  };

  const changeTab = (
    event: React.ChangeEvent<{}>,
    selectedTab: number
  ): void => {
    setTabIndex(selectedTab);
  };

  return (
    <div className={classes.root}>
      <Tabbar
        tabIndex={tabIndex}
        changeTab={changeTab}
        className={classes.appBar}
      />
      <Sidebar
        Tasks={tasks}
        // addTask={addTask}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ContentContainer
          tasks={tasks}
          changeTask={updateTask}
          selectedTask={selectedTask}
        />
      </main>
    </div>
  );
};

export default App;
