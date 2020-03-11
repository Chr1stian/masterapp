import React, { ReactNodeArray } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { Sidebar, Tabbar, ContentContainer } from "./components";
import { saveAs } from "file-saver";

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
  splitCode: ReactNodeArray[];
}

export interface Tasks {
  [key: number]: Task;
}

const App: React.FC = () => {
  const classes = useStyles();
  // Handling of selection in drawer and tabs
  const [tabIndex, setTabIndex] = React.useState(0);
  const [selectedTask, setSelectedTask] = React.useState(0);

  const [tasks, setTasks] = React.useState<Task[]>([
    {
      label: "Task 1",
      code: "testcode1\nline 2",
      splitCode: [["testcode1"], ["line 2"]]
    },
    {
      label: "Task 2",
      code: "testcode2\nline 2",
      splitCode: [["testcode2"], ["line 2"]]
    },
    {
      label: "Task 3",
      code: "testcode3\nline 2",
      splitCode: [["testcode3"], ["line 2"]]
    }
  ]);

  const updateTask = (key: number, task: Task): void => {
    const newTasks = [...tasks];
    newTasks[key] = task;
    setTasks(newTasks);
  };

  const addTask = (task: Task): void => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const changeTab = (
    event: React.ChangeEvent<{}>,
    selectedTab: number
  ): void => {
    setTabIndex(selectedTab);
  };

  const handleExport = async (): Promise<void> => {
    fetch("/api/zip-download?name=README.md&name=HELP.md", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks[0])
    }).then(async response => {
      const blob = await response.blob();
      saveAs(blob, "testfil.zip");
    });
    console.log(JSON.stringify(tasks[0]));
    /*
    await fetch("/api/test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks[0])
    })
      .then(response => response.text())
      .then(response => console.log(response));
    
    */
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
        addTask={addTask}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ContentContainer
          tabIndex={tabIndex}
          tasks={tasks}
          changeTask={updateTask}
          selectedTask={selectedTask}
        />
      </main>
    </div>
  );
};

export default App;
