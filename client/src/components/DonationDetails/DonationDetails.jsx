import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getDonation, getDonationsBySearch } from '../../actions/donations';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Donation = () => {
  const { donation, donations, isLoading } = useSelector((state) => state.donations);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDonation(id));
  }, [id]);

  useEffect(() => {
    if (donation) {
      dispatch(getDonationsBySearch({ search: 'none', tags: donation?.tags.join(',') }));
    }
  }, [donation]);

  if (!donation) return null;

  const openDonation = (_id) => history.push(`/donations/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedDonations = donations.filter(({ _id }) => _id !== donation._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h4" component="h2">{donation.title}</Typography>
          <Typography variant="h6" component="h2">Cities Available To</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{donation.tags.map((tag) => (
            <Typography display="block" style={{ textDecoration: 'none', }}>
              {` ${tag} `}
            </Typography>
          ))}
          </Typography>
          <Typography gutterBottom variant="h5" component="p">{donation.tag}</Typography>
          <Typography variant="h4" component="h2">Description</Typography>
          <Typography gutterBottom style={{whiteSpace: 'pre-wrap'}} variant="h5" component="p">{donation.message}</Typography>
          <Typography variant="body2">
            Created by:
            <Link to={`/creators/${donation.creator}/${donation.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${donation.name}`}
            </Link>
          </Typography>
          <Typography variant="body2">{moment(donation.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection donation={donation} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={donation.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={donation.title} />
        </div>
      </div>
      {!!recommendedDonations.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedDonations}>
            {recommendedDonations.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openDonation(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Donation;
