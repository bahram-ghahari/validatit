import React from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import Typography from '@material-ui/core/Typography'; 
import ValidationCard from '../ValidationCard';
import { pageClasses } from './classes';
import { Divider } from '@material-ui/core';
import { Grid ,Paper  } from '@material-ui/core';  
import CodeBlock from '@tenon-io/tenon-codeblock';


const useStyles = makeStyles(pageClasses);

export default function FunctionPage() {
    const classes = useStyles(); 
 
    const func_srt =`
    dynamicValidation:async function(body){ 
      //...
      return {success:true,error_message:"xxxx"}//error_message is optional
    }
    `;
    const ex1=`
    const json_object=  
    {
      a:5,
      b:1,
      c:1 
    };
    
    const params =
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
    ];



    retult ={
      success: false,
      error: [
        {
          name: "a",
          error: [
            {
              error_message: "Side is either too large or small to form a trangle"
            }
          ]
        }
      ]
    };
    `;

    const ex2= `
    const json_object=  
    {
      github_handle:"bahram-ghahari",
      minimum_repos:100 
    };
    const params=
    [  
      {   
        name:"repos",
        dynamicValidation:async (body)=>{

          const axios = require('axios').default;
          const json = await axios.get('https://api.github.com/users/'+body.github_handle);  
          let claimed_repos = +body.minimum_repos;
          let public_repos = +json.data.public_repos;
          let success = claimed_repos<public_repos;
          
          return {success , error_message:body.github_handle+' has only '+public_repos +' public repos which is less than '+claimed_repos };
        }
      }
    ];   



    retult ={
      success: false,
      error: [
        {
          name: "repos",
          error: [
            {
              error_message: "bahram-ghahari has only 14 public repos which is less than 100"
            }
          ]
        }
      ]
    };
    `;
 

  return (
    <div className={classes.root}>
        <Typography  className={classes.groupTitle}>
            Dynamic Validator
        </Typography>
        <Divider />
        <Typography className={classes.paragraph}>
         Dynamic validators can be used runtime validations. Make sure that validator function has correct input/output arguments. See below:
        </Typography>
        <CodeBlock
            codeString={func_srt} 
        />
 
        <Typography className={classes.paragraph}>
         Example 1: checks trangle sides to make sure that it can form a triangle.
        </Typography>
        <CodeBlock
            codeString={ex1} 
        />

         
        <Typography className={classes.paragraph}>
         Example 2: Fetch user info from Github to make sure that minimum_repo is larger than public repos.
        </Typography>
        <CodeBlock
            codeString={ex2} 
        />
    </div>
  );
}
