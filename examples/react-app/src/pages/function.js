import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';
import { Box } from '@material-ui/core';



const useStyles = makeStyles(pageClasses);

export default function FunctionPage() {
    const classes = useStyles(); 
 
    const example1 = { 
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

            success = !(b + c <= a);
            if(!success)error_message="Side is either too large or small to form a trangle";

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

            success = !(a + c <= b);
            if(!success)error_message="Side is either too large or small to form a trangle";

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

            success = !(a + b <= c );
            if(!success)error_message="Side is either too large or small to form a trangle";

            return {success,error_message};
          }
        } 
      ]
    };
    const [example1_state , setExample1State] = React.useState({json_object:example1.json_object , params:example1.params}); 
    const Example1Callback = (cb_data)=>setExample1State(cb_data); 
    const example2 = { 
      json_object:  
        {
          github_id:"bahram-ghahari",
          repos:100 
        } ,
      params: 
      [
        {
          name:"github_id",
          type:"STRING" 
        },
        {
          name:"repos",
          type:"NUMBER",
          dynamicValidation:function(body){
            let success = true;
            let error_message = ""; 
            let repos = +body.repos;

            

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
            Dynamic Validator
        </Typography>
        <Divider />
        <Typography className={classes.paragraph}>
         Dynamic validators can be used runtime validations. Make sure that validator function has correct input/output arguments. See below:
        </Typography>
        <div style={{ width: '100%' }}>
          <Box component="div" display="block" paddingLeft="10px"  paddingTop="20px" className={classes.code}>
            {`function(json_body){` }
          </Box>
          <Box component="div" display="block" paddingLeft="40px" className={classes.code}>
            {`      ...`}
          </Box> 
          <Box component="div" display="block" paddingLeft="40px" className={classes.code}>
            {`      return {success:true,error_message:"xxxx"}`}
          </Box>
          <Box component="div" display="block" paddingLeft="10px" paddingBottom="20px" className={classes.code}>
            {`}`}
          </Box>
    </div>
        <ValidationCard 
          data = {example1_state} 
          cb = {Example1Callback}
          title = 'provided Json object is valid. (this is an actual trangle)'
        />
 
 
    </div>
  );
}
