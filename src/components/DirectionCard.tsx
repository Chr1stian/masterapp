import React from "react";
import { Card, Typography, createStyles, makeStyles } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

interface DirectionCardProps {
  text: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "row",
      padding: "4px"
    },
    icon: {
      color: "secondary"
    }
  })
);
const DirectionCard: React.SFC<DirectionCardProps> = (
  props: DirectionCardProps
) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <InfoIcon
        className={classes.icon}
        fontSize={"default"}
        color="secondary"
        viewBox={"0 0 25 20"}
      />
      <Typography style={{ textAlign: "center" }} variant="subtitle1">
        {props.text}
      </Typography>
    </Card>
  );
};

export default DirectionCard;
