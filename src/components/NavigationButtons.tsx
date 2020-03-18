import * as React from "react";
import { Task } from "../App";
import { Button, makeStyles, createStyles } from "@material-ui/core";

interface NavigationButtonsProps {
  task: Task;
  tabIndex: number;
  changeTab: (selectedTab: number) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    buttons: { display: "flex", flexDirection: "row", marginTop: "5px" },
    nextButton: { marginLeft: "auto" },
    backButton: {}
  })
);

const NavigationButtons: React.FunctionComponent<NavigationButtonsProps> = (
  props: NavigationButtonsProps
) => {
  const classes = useStyles();
  const { task, tabIndex, changeTab } = props;
  return (
    <div className={classes.buttons}>
      {tabIndex === 1 && (
        <Button
          className={classes.backButton}
          variant="contained"
          color="secondary"
          onClick={() => changeTab(0)}
        >
          Back
        </Button>
      )}
      {tabIndex === 0 && task.code && (
        <Button
          className={classes.nextButton}
          variant="contained"
          color="secondary"
          onClick={() => changeTab(1)}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
