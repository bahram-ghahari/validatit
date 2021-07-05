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
      json_object:  
        {
          first_name:"Jamie"
        } ,
      params: 
      [
        {
          name:"first_name",
          required:true
        }
      ]
    };
    const [example1_state , setExample1State] = React.useState({json_object:example1.json_object , params:example1.params}); 
    const Example1Callback = (cb_data)=>setExample1State(cb_data); 
    const example2 = { 
      json_object:  
        {
          first_name:"Jamie"
        } ,
      params: 
      [
        {
          name:"first_name",
          required:true
        },
        {
          name:"last_name",
          required:true
        }
      ]
    };
    const [example2_state , setExample2State] = React.useState({json_object:example2.json_object , params:example2.params}); 
    const Example2Callback = (cb_data)=>setExample2State(cb_data);



    const example3 = { 
      json_object:  
        {
          first_name:"Jamie"
        } ,
      params: 
      [
        {
          name:"first_name",
          required:true
        },
        {
          name:"名称",
          required:true,
          required_error_message:'有一些缺失的字段'
        }
      ]
    };
    const [example3_state , setExample3State] = React.useState({json_object:example3.json_object , params:example3.params}); 
    const Example3Callback = (cb_data)=>setExample3State(cb_data);



    const example4 = { 
      json_object:  
        {
          first_name:"Jamie"
        } ,
      params: 
      [
        {
          name:"first_name",
          required:true
        },
        {
          name:"名称",
          required:true,
          required_error_message:'$param.$name 丢失'
        }
      ]
    };
    const [example4_state , setExample4State] = React.useState({json_object:example4.json_object , params:example4.params}); 
    const Example4Callback = (cb_data)=>setExample4State(cb_data);


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
          data = {example1_state} 
          cb = {Example1Callback}
          title = 'provided Json object is valid. (first_name is provided)'
        />
        <ValidationCard 
          data = {example2_state} 
          cb = {Example2Callback}
          title = 'provided Json object is invalid. (last_name is required but not provided)'
        />

        <Typography className={classes.paragraph}>
            Use required_error_message to set a customzed error message.
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
