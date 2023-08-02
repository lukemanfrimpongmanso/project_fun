import React from 'react';
import { Activity } from '../../../app/models/Activity';

import {
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Box,
  Chip,
} from '@mui/material';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) => {
  return (
    <Card>
      {activities.map((activity) => (
        <CardContent key={activity.id}>
          <Typography variant="h5" gutterBottom>
            {activity.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {activity.date}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <div>{activity.description}</div>
            <div>
              {activity.city}, {activity.venue}
            </div>
          </Typography>
          <Grid container justifyContent={'flex-end'}>
            <Grid item xs={12} sm={6} md={4}>
              <Box display="flex" justifyContent="flex-end">
                <Chip
                  label="View"
                  component="a"
                  clickable
                  color="primary"
                  onClick={() => selectActivity(activity.id)}
                />
                <Chip
                  label="Delete"
                  component="a"
                  clickable
                  color="secondary"
                  onClick={() => deleteActivity(activity.id)}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider />
        </CardContent>
      ))}
    </Card>
  );
};

export default ActivityList;
