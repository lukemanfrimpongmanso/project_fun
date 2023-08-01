import React from 'react';
import { Activity } from '../../../app/models/Activity';
import ActivityList from './ActivityList';
import { Box, Grid, Paper } from '@mui/material';
import ActivitiesDetails from '../details/ActivitiesDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

export const AcitivityDashboard = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectedActivity,
  editMode,
  openForm,
  closeForm,
  createOrEdit
}: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={6} sx={{ margin: '20px' }}>
          <Paper>
            <ActivityList
              activities={activities}
              selectActivity={selectActivity}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            {selectedActivity && !editMode && (
              <ActivitiesDetails
                activity={selectedActivity}
                cancelSelectedAcitivity={cancelSelectedActivity}
                openForm={openForm}
              />
            )}
            {editMode && (
              <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AcitivityDashboard;
