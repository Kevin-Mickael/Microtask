import React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const TasksSummary = (props) => {
  let sumTasks = 0;
  let sumMinutes = 0;
  let sumSeconds = 0;
  let sumHours = 0;

  for (let i = 0; i < props.items.length; i++) {
    sumTasks += parseInt(props.items[i].count);
    sumMinutes +=
      parseInt(props.items[i].minute) * parseInt(props.items[i].count);
    sumSeconds +=
      parseInt(props.items[i].second) * parseInt(props.items[i].count);
  }

  sumHours += (sumMinutes * 60 + sumSeconds) / 60 / 60;

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" component="div">
              {`Total tasks: ${sumTasks}`}
            </Typography>
            <Typography variant="body1" component="div">
              {`Total hours: ${sumHours.toFixed(2)}`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  );
};

export default TasksSummary;
