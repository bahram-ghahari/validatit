import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { Divider } from '@material-ui/core';
import { pageClasses } from './classes';

const useStyles = makeStyles(pageClasses);


export default function PatternPage() {
  const classes = useStyles(); 
 
 
  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Pattern
        </Typography>
        <Divider />
         
    </div>
  );
}
