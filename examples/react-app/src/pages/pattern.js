import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  groupTitle: { 
    color:"#252525",
    paddingLeft:theme.spacing(1),
    fontSize:"2rem"
  }
}));

export default function PatternPage() {
  const classes = useStyles(); 
 
 
  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Pattern
        </Typography>
        <Divider />
        <ValidationCard />
    </div>
  );
}
