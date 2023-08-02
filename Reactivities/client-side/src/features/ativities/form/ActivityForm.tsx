import { Box, Button, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Activity } from '../../../app/models/Activity';

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

const ActivityForm = ({
  closeForm,
  activity: selectedActivity,
  createOrEdit,
  submitting,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activity) {
      createOrEdit(activity);
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  }

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title"
        variant="outlined"
        value={activity.title}
        name="title"
        onChange={handleInputChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={activity.description}
        name="description"
        onChange={handleInputChange}
      />
      <TextField
        label="Category"
        variant="outlined"
        value={activity.category}
        name="category"
        onChange={handleInputChange}
      />
      <TextField
        label="Date"
        variant="outlined"
        value={activity.date}
        name="date"
        type="date"
        onChange={handleInputChange}
      />
      <TextField
        label="City"
        variant="outlined"
        value={activity.city}
        name="city"
        onChange={handleInputChange}
      />
      <TextField
        label="venue"
        variant="outlined"
        value={activity.venue}
        name="venue"
        onChange={handleInputChange}
      />

      <Box>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ActivityForm;
