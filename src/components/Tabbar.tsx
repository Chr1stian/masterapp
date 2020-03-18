import React from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";
import { Task } from "../App";

interface TabbarProps {
  tabIndex: number;
  changeTab: (selectedTab: number) => void;
  className: string;
  task: Task;
}

const Tabbar: React.FC<TabbarProps> = (props: TabbarProps) => {
  const { tabIndex, changeTab, className, task } = props;

  const handleChange = (event: React.ChangeEvent<{}>, value: number): void => {
    changeTab(value);
  };

  return (
    <div>
      <AppBar className={className}>
        <Toolbar>
          <Tabs
            value={tabIndex}
            aria-label="task_steps_bar"
            onChange={handleChange}
          >
            <Tab label="Step One" />
            {task && task.code && <Tab label="Step Two" />}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Tabbar;
