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

  const updateTask = (key: number, task: Task): void => {
    setTasks(prevTasks => ({ ...prevTasks, [key]: task }));
  };

  const changeTab = (
    event: React.ChangeEvent<{}>,
    selectedTab: number
  ): void => {
    setTabIndex(selectedTab);
  };

  const handleExport = async (): Promise<void> => {
    /*
    fetch("/api/tasks/" + JSON.stringify(tasks))
      .then(response => response.text())
      .then(response => {
        console.log(response);
      });
      */

    await fetch("/api/test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    })
      .then(response => response.text())
      .then(response => console.log(response));
    console.log(JSON.stringify(tasks));
  };

  return (
    <div className={classes.root}>
      <Tabbar
        tabIndex={tabIndex}
        changeTab={changeTab}
        className={classes.appBar}
      />
      <Sidebar
        handleExport={handleExport}
        Tasks={tasks}
        addTask={updateTask}
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
