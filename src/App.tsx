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
  distractors: string[];
  language: string;
}

const App: React.FC = () => {
  const classes = useStyles();
  // Handling of selection in drawer and tabs
  const [tabIndex, setTabIndex] = React.useState(0);
  const [selectedTask, setSelectedTask] = React.useState(0);

  const [tasks, setTasks] = React.useState<Task[]>([]);

  const updateTask = (task: Task): void => {
    const newTasks = [...tasks];
    newTasks[selectedTask] = task;
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

  const handleExport = async (fileName: string): Promise<void> => {
    fetch("/api/zip-download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks[0])
    }).then(async response => {
      const blob = await response.blob();
      saveAs(blob, fileName + ".zip");
    });
    console.log(JSON.stringify(tasks[0]));
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
        tasks={tasks}
        addTask={addTask}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ContentContainer
          tabIndex={tabIndex}
          task={tasks[selectedTask]}
          changeTask={updateTask}
        />
      </main>
    </div>
  );
};

export default App;
