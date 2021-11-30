import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likeDonation, deleteDonation } from '../../../actions/donations';
import useStyles from './styles';

const Donation = ({ donation, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(donation?.likes);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedDonation = donation.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likeDonation(donation._id));
    
        if (hasLikedDonation) {
          setLikes(donation.likes.filter((id) => id !== userId));
        } else {
          setLikes([...donation.likes, userId]);
        }
      };

    const Likes = () => {
        if(likes.length > 0){
            return likes.find((like) => like === (userId))
            ? (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
            ) : (
                <><ThumbUpAltOutlined fontSIze="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'} </>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    };

    const openDonation = (e) => {
        // dispatch(getPost(donation._id, history));
    
        history.push(`/donations/${donation._id}`);
      };

      return (
        <Card className={classes.card} raised elevation={6}>
          <ButtonBase
            component="span"
            name="test"
            className={classes.cardAction}
            onClick={openDonation}
          >
            <CardMedia className={classes.media} image={donation.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={donation.title} />
            <div className={classes.overlay}>
              <Typography variant="h6">{donation.name}</Typography>
              <Typography variant="body2">{moment(donation.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === donation?.creator || user?.result?._id === donation?.creator) && (
            <div className={classes.overlay2} name="edit">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(donation._id);
                }}
                style={{ color: 'white' }}
                size="small"
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </div>
            )}
            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary" component="h2">{donation.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{donation.title}</Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">{donation.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
              <Likes />
            </Button>
            {(user?.result?.googleId === donation?.creator || user?.result?._id === donation?.creator) && (
              <Button size="small" color="secondary" onClick={() => dispatch(deleteDonation(donation._id))}>
                <DeleteIcon fontSize="small" /> &nbsp; Delete
              </Button>
            )}
          </CardActions>
        </Card>
      );
    };
    
    export default Donation;