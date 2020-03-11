import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";

interface DirectionCardProps {
  text: string;
}
const DirectionCard: React.SFC<DirectionCardProps> = (
  props: DirectionCardProps
) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DirectionCard;
