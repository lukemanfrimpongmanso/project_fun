import { Box, Button, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Activity } from '../../../app/models/Activity';

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEdit: (activity: Activity) => void;
}

const ActivityForm = ({
  closeForm,
  activity: selectedActivity,
  createOrEdit,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: 'id',
    title: 'title',
    category: 'category',
    description: 'description',
    date: 'date',
    city: 'city',
    venue: 'venue'
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
        name="Description"
        onChange={handleInputChange}
      />
      <TextField
        label="Category"
        variant="outlined"
        value={activity.category}
        name="Category"
        onChange={handleInputChange}
      />
      <TextField
        label="Date"
        variant="outlined"
        value={activity.date}
        name="Date"
        onChange={handleInputChange}
      />
      <TextField
        label="City"
        variant="outlined"
        value={activity.city}
        name="City"
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
