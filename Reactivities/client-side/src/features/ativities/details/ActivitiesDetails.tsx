import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

import { Activity } from '../../../app/models/Activity';

interface Props {
  activity: Activity;
  cancelSelectedAcitivity: () => void;
  openForm: (id: string)  => void

}

const ActivitiesDetails = ({ activity, cancelSelectedAcitivity, openForm }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/assets/Images/categoryImages/${activity.category}.jpg`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => openForm(activity.id)} >Edit</Button>
        <Button size="small" onClick={cancelSelectedAcitivity} >Cancel</Button>
      </CardActions>
    </Card>
  );
};

export default ActivitiesDetails;
