import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createDonation, updateDonation } from '../../actions/donations';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [donationData, setDonationData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const donation = useSelector((state) => (currentId ? state.donations.donations.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setDonationData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!donation?.title) clear();
    if (donation) setDonationData(donation);
  }, [donation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createDonation({ ...donationData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateDonation(currentId, { ...donationData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own Donations and like other's.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setDonationData({ ...donationData, tags: [...donationData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setDonationData({ ...donationData, tags: donationData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${donation?.title}"` : 'Creating a Donation'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={donationData.title} onChange={(e) => setDonationData({ ...donationData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={donationData.message} onChange={(e) => setDonationData({ ...donationData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={donationData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setDonationData({ ...donationData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
