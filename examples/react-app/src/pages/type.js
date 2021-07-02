import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  groupTitle: {
    background:"#416141",
    color:"#fff",
    paddingLeft:theme.spacing(1),
    fontSize:"12px"
  }
}));

export default function TypePage() {
  const classes = useStyles(); 
 
 
  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Type
        </Typography>
        <ValidationCard />
    </div>
  );
}
