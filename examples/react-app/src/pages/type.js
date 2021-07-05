import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';



const useStyles = makeStyles(pageClasses);

export default function TypePage() {
    const classes = useStyles(); 
 
    const example1 = { 
      json_object:  
        {
          first_name:"Jamie",
          phone:"+18889830099",
          email_address:"sample.email@gmail.com",
          cars:[],
          address:{street:"111 yonge st"}
        } ,
      params: 
      [
        {
          name:"phone",
          type:"PHONE"
        },
        {
          name:"email",
          type:"EMAIL"
        },
        {
          name:"cars",
          type:"ARRAY"
        },
        {
          name:"address",
          type:"OBJECT"
        }
      ]
    };
    const [example1_state , setExample1State] = React.useState({json_object:example1.json_object , params:example1.params}); 
    const Example1Callback = (cb_data)=>setExample1State(cb_data); 
    const example2 = { 
      json_object:  
        {
          first_name:"Jamie",
          phone:"8889830099",
          email_address:"@gmail.com",
          cars:"nissan",
          address:"111 yonge st",
          age:"nineteen"
        } ,
      params: 
      [
        {
          name:"phone",
          type:"PHONE"
        },
        {
          name:"email",
          type:"EMAIL"
        },
        {
          name:"cars",
          type:"ARRAY"
        },
        {
          name:"address",
          type:"OBJECT"
        },
        {
          name:"age",
          type:"NUMBER"
        }
      ]
    };
    const [example2_state , setExample2State] = React.useState({json_object:example2.json_object , params:example2.params}); 
    const Example2Callback = (cb_data)=>setExample2State(cb_data);



    const example3 = { 
      json_object:  
        {
          first_name:"Jamie",
          phone:"8889830099" 
        } ,
      params: 
      [
        {
          name:"phone",
          type:"PHONE",
          type_error_message:"Make sure that Phone is in E.164 format."
        } 
      ]
    };
    const [example3_state , setExample3State] = React.useState({json_object:example3.json_object , params:example3.params}); 
    const Example3Callback = (cb_data)=>setExample3State(cb_data);



    const example4 = { 
      json_object:  
        {
          first_name:"Jamie",
          phone:"8889830099" 
        } ,
      params: 
      [
        {
          name:"phone",
          type:"PHONE",
          type_error_message:"Make sure that $param.$name is in E.164 format."
        } 
      ]
    };
    const [example4_state , setExample4State] = React.useState({json_object:example4.json_object , params:example4.params}); 
    const Example4Callback = (cb_data)=>setExample4State(cb_data);


  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Type
        </Typography>
        <Divider />
        <Typography className={classes.paragraph}>
        Use one of the following: ARRAY, OBJECT, BOOLEAN, STRING, NUMBER, FUNCTION, DATE, CREDIT_CARD, EMAIL, PHONE, ANY 
        </Typography>
        <ValidationCard 
          data = {example1_state} 
          cb = {Example1Callback}
          title = 'provided Json object is valid. (phone is has E.164 format)'
        />


        <ValidationCard 
          data = {example2_state} 
          cb = {Example2Callback}
          title = 'provided Json object is invalid. (All parameters have invalid format)'
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
