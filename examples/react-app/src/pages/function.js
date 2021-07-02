import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles(pageClasses);



export default function FunctionPage() {
  const classes = useStyles(); 
 
 
  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Function
        </Typography>
        <Divider /> 
    </div>
  );
}
