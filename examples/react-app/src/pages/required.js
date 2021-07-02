import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles(pageClasses);

export default function RequiredPage() {
    const classes = useStyles(); 
 
    const example1 = { 
      json_object:  {first_name:"Jamie"}
      ,
      params: [{name:"first_name",required:true}]
    };
    const [state , setState] = React.useState({data : example1}); 
    const cb = (cb_data)=>{
        setState({data:cb_data});
    };
  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            required
        </Typography>
        <Divider />
        <Typography className={classes.paragraph}>
            As the name suggests, it checks to see if the parameter is mandatory.
        </Typography>
        <ValidationCard 
        data = {state} 
        cb = {cb}
        />
    </div>
  );
}
