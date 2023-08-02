import React, { useState, useEffect, Fragment } from 'react';

import './App.css';

import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import AcitivityDashboard from '../../features/ativities/dashboard/AcitivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectActivity, setSelectedActivity] = useState<Activity | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(true);
  }

  function handleCreateOrEditAcitivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      });
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false)
    })
    
  }

  if (loading) {
    return <LoadingComponent open={loading} />;
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <AcitivityDashboard
        activities={activities}
        selectActivity={handleSelectActivity}
        cancelSelectedActivity={handleCancelSelectedActivity}
        selectedActivity={selectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditAcitivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
      />
    </Fragment>
  );
}

export default App;
