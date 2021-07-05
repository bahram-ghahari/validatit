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
          dynamicValidation:async function(body){
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
          dynamicValidation:async function(body){
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
          dynamicValidation:async function(body){
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
          github_handle:"bahram-ghahari",
          minimum_repos:100 
        } ,
      params: 
      [  
        {   
          name:"repos",
          dynamicValidation:async (body)=>{

            const axios = require('axios').default;
            const json = await axios.get(`https://api.github.com/users/${body.github_handle}`);  
            let claimed_repos = +body.minimum_repos;
            let public_repos = +json.data.public_repos;
            let success = claimed_repos<public_repos;
            
            return {success , error_message:`${body.github_handle} has only ${public_repos} which is less than ${claimed_repos}` };
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


        <ValidationCard 
          data = {example2_state} 
          cb = {Example2Callback}
          title = 'second example '
        />
 
 
    </div>
  );
}
