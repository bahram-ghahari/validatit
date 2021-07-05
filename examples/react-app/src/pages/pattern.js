import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles(pageClasses);

export default function PatternPage() {
    const classes = useStyles(); 
 
    const example1 = { 
      json_object:  
        {
          country:"Canada",
        } ,
      params: 
      [
        {
          name:"country",
          pattern:/((U|u)nited (S|s)tates)|((C|c)anada)/
        }
      ]
    };
    const [example1_state , setExample1State] = React.useState({json_object:example1.json_object , params:example1.params}); 
    const Example1Callback = (cb_data)=>setExample1State(cb_data); 
 

    const example3 = { 
      json_object:  
        {
          country:"England",
        } ,
      params: 
      [
        {
          name:"country",
          pattern:/((U|u)nited (S|s)tates)|((C|c)anada)/,
          pattern_error_message:"we do not provide any service in your area"
        }
      ]
    };
    const [example3_state , setExample3State] = React.useState({json_object:example3.json_object , params:example3.params}); 
    const Example3Callback = (cb_data)=>setExample3State(cb_data);



    const example4 = { 
      json_object:  
        {
          country:"England",
        } ,
      params: 
      [
        {
          name:"country",
          pattern:/((U|u)nited (S|s)tates)|((C|c)anada)/,
          pattern_error_message:"$param.$name is outside of our covered area"
        }
      ]
    };
    const [example4_state , setExample4State] = React.useState({json_object:example4.json_object , params:example4.params}); 
    const Example4Callback = (cb_data)=>setExample4State(cb_data);


  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Pattern
        </Typography>
        <Divider />
        <Typography className={classes.paragraph}>
        You can use regular expressions to validate fields.
        </Typography>
        <ValidationCard 
          data = {example1_state} 
          cb = {Example1Callback}
          title = 'provided Json object is valid. (country is set to usa or canada)'
        />
 
        <Typography className={classes.paragraph}>
            Use type_error_message to set a customzed error message.
        </Typography>

        <ValidationCard 
          data = {example3_state} 
          cb = {Example3Callback}
          title = 'provided Json object is invalid.'
        />

        <Typography className={classes.paragraph}>
            Use $param.$name placeholder in required_error_message to include name in your customzed error message.
        </Typography>

        <ValidationCard 
          data = {example4_state} 
          cb = {Example4Callback}
          title = 'provided Json object is invalid.'
        />

        
    </div>
  );
}
