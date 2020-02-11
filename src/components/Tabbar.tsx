import React from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";

interface TabbarProps {
  tabIndex: number;
  changeTab: (event: React.ChangeEvent<{}>, selectedTab: number) => void;
  className: string;
}

const Tabbar: React.FC<TabbarProps> = (props: TabbarProps) => {
  const { tabIndex, changeTab, className } = props;

  return (
    <div>
      <AppBar className={className}>
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
    </div>
  );
};

export default Tabbar;
