import { Typography, Divider } from "@material-ui/core";
import React from "react";

import useStyles from './styles';

const AboutUs = () => {
    const classes = useStyles();

    return(
        <div>
            <Typography className={classes.title}>About Us</Typography>
            <Divider style={{ margin: '0 175px 50px 175px', height: '2px' }} />
            <Typography className={classes.body}>
            This Website was created by a group of college students as a project for a Software Design class. 
            We doubt anyone will ever see this, but if you do it means that we really care about what we are doing. 
            Our goal was to make a website making cooking easier for new chefs, with our primary audience meant to be College students, 
            but we never felt that they would be our only audience. If you are using this...
            </Typography>
            <Typography className={classes.thx}>Thank You!</Typography>
            <Typography className={classes.hi}>We hope you find it useful.</Typography>
        </div>
        
        
    )
}

export default AboutUs;