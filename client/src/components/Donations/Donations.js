import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Donation from './Donation/Donation';
import useStyles from './styles';

const Donations = ({ setCurrentId }) => {
    const {donations, isLoading} = useSelector((state) => state.donations);
    
    //const { donation, isLoading } = useSelector((state) => state.donations);
    const classes = useStyles();

    if (!donations.length && !isLoading) return 'No donations';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {donations.map((donation) => (
                    <Grid key={donation._id} item xs={12} sm={6} md={6} lg={3}>
                        <Donation donation={donation} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Donations;