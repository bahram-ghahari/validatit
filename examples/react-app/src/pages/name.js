import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';
import { Box } from '@material-ui/core';



const useStyles = makeStyles(pageClasses);

export default function NamePage() {
    const classes = useStyles(); 
 
    const example1 = { 
      json_object:  
        {
          first_name:"zig",
          last_name:"zag" 
        } ,
      params: 
      [
        {
          name:"*first_name" 
        },
        {
          name:"*last_name" 
        },
        {
          name:"*age" 
        } 
      ]
    };
    const [example1_state , setExample1State] = React.useState({json_object:example1.json_object , params:example1.params}); 
    const Example1Callback = (cb_data)=>setExample1State(cb_data); 
    
    
    
    const example2 = { 
      json_object:  
        {
            first_name:"zig",
            last_name:"zag" ,
            age:22,
            phone:"not available"
        } ,
        params: 
        [
          {
            name:"*first_name:STRING" 
          },
          {
            name:"*last_name:STRING" 
          },
          {
            name:"*age:NUMBER" 
          } ,
          {name:"phone:PHONE"}
        ]
    };
    const [example2_state , setExample2State] = React.useState({json_object:example2.json_object , params:example2.params}); 
    const Example2Callback = (cb_data)=>setExample2State(cb_data);

 

  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Name
        </Typography>
        <Divider />
        <Typography className={classes.paragraph}>
         Represents parameter's name. If parameter is required you can use * at the beginning of the name value. See example below:
        </Typography> 
        <ValidationCard 
          data = {example1_state} 
          cb = {Example1Callback}
          title = 'provided Json object is invalid. (age is required!)'
        />

        <Typography className={classes.paragraph}>
         Use name:type to define parameter's type. See the Type section for more information about valid types.
        </Typography> 
        <ValidationCard 
          data = {example2_state} 
          cb = {Example2Callback}
          title = 'provided Json object is invalid. (phone type is invalid!)'
        />
 
 
    </div>
  );
}
