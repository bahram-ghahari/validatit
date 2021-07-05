import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';
import { Box } from '@material-ui/core';



const useStyles = makeStyles(pageClasses);

export default function NestedPage() {
    const classes = useStyles(); 
 
    const example1 = { 
      json_object:  
        {
          first_name:"zig",
          last_name:"zag",
          address:{
              street:"1 yonge st",
              city:"toronto",
              province:"on"
          }
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
        },
        {
          name:"address",
          params:[
            {
                name:"street",
                required:true
            },
            {
                name:"city",
                required:true
            },
            {
                name:"province",
                required:true
            }

          ]
        } 
      ]
    };
    const [example1_state , setExample1State] = React.useState({json_object:example1.json_object , params:example1.params}); 
    const Example1Callback = (cb_data)=>setExample1State(cb_data); 
    
    
    
    const example2 = { 
      json_object:  
        {
          a:1,
          b:1,
          c:1 
        } ,
      params: 
      [
        {
          name:"a",
          type:"NUMBER",
          dynamicValidation:function(body){
            let success = true;
            let error_message = "";
            const a = +body.a;
            const b = +body.b; 
            const c = +body.c;

            success = !(a + b <= c || a + c <= b || b + c <= a);
            if(!success)error_message="this is an invalid triangle";

            return {success,error_message};
          }
        },
        {
          name:"b",
          type:"NUMBER",
          dynamicValidation:function(body){
            let success = true;
            let error_message = "";
            const a = +body.a;
            const b = +body.b; 
            const c = +body.c;

            success = !(a + b <= c || a + c <= b || b + c <= a);
            if(!success)error_message="this is an invalid triangle";

            return {success,error_message};
          }
        },
        {
          name:"c",
          type:"NUMBER",
          dynamicValidation:function(body){
            let success = true;
            let error_message = "";
            const a = +body.a;
            const b = +body.b; 
            const c = +body.c;

            success = !(a + b <= c || a + c <= b || b + c <= a);
            if(!success)error_message="this is an invalid triangle";

            return {success,error_message};
          }
        } 
      ]
    };
    const [example2_state , setExample2State] = React.useState({json_object:example2.json_object , params:example2.params}); 
    const Example2Callback = (cb_data)=>setExample2State(cb_data);

 

  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Nested Objects
        </Typography>
        <Divider />
        <Typography className={classes.paragraph}>
         Use the same rules to validates nested object. See the example below:
        </Typography> 
        <ValidationCard 
          data = {example1_state} 
          cb = {Example1Callback}
          title = 'provided Json object is valid. (Address is valid)'
        />
 
 
    </div>
  );
}
