import React, { ReactNodeArray } from "react";
import { Task } from "../App";
import { makeStyles, createStyles, Card, Typography } from "@material-ui/core";
import AddDistractors from "./AddDistractors";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    container: {},
    card: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      minHeight: "26px",
      marginTop: "5px",
      padding: "5px",
      backgroundColor: "#e6ebf2",
    },
    cardContent: {},
    gap: {
      margin: "5px",
    },
    typography: {
      textAlign: "center",
    },
    distractors: { marginLeft: "auto" },
  })
);

interface CodeOutputGapsProps {
  task: Task;
  changeTask: (task: Task) => void;
}

const CodeOutputGaps: React.FC<CodeOutputGapsProps> = (
  props: CodeOutputGapsProps
) => {
  const classes = useStyles();
  const { task, changeTask } = props;

  const computeGapWidth = (): number => {
    let lineLengths = task.splitCode.map((code) => {
      if (code.length === 3) {
        if (code[1] !== undefined && code[1]) {
          return code[1].toString().length;
        }
      }
      return 0;
    });
    const distractorLengths = task.distractors.map((code) => {
      return code.length;
    });
    lineLengths = lineLengths.concat(distractorLengths);
    return Math.max(...lineLengths) * 10;
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        {task.splitCode.map((value: ReactNodeArray, index) => {
          return (
            typeof value !== "string" &&
            value[1] && (
              <div className={classes.cardContent} key={index}>
                <Card
                  className={classes.gap}
                  variant="outlined"
                  style={{ width: computeGapWidth() }}
                >
                  <Typography className={classes.typography}>
                    {value[1]}
                  </Typography>
                </Card>
              </div>
            )
          );
        })}
        {task.distractors.map((value: string) => {
          return (
            <div className={classes.cardContent} key={value}>
              <Card
                className={classes.gap}
                variant="outlined"
                style={{ width: computeGapWidth() }}
              >
                <Typography className={classes.typography}>{value}</Typography>
              </Card>
            </div>
          );
        })}
        <div className={classes.distractors}>
          <AddDistractors task={task} changeTask={changeTask} />
        </div>
      </Card>
    </div>
  );
};

export default CodeOutputGaps;
