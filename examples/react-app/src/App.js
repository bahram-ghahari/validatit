import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {run} from 'validatit'
// import the react-json-view component
import ReactJson from 'react-json-view'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2), 
    color: theme.palette.text.secondary,
    background:"#000000d9"
  },
}));

export default function App() {
  const classes = useStyles(); 
  const [JSON_object, setJsonObject] = React.useState({first_name:"mitch"});
  const handleJSONObjectChange = (obj) => { 
    setJsonObject(obj.updated_src);
  };


  const [Params, setParam] = React.useState([{name:"first_name",required:true}]);
  const handleParamChange = (obj) => {
    setParam(obj.updated_src);
  };



  const [result, setResult] = React.useState({});



  const validate = (event) => { 
    const _result = run(JSON_object,Params); 
    
    setResult(_result);
    
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container  spacing={3}>

          <Grid item xs={6} alignContent="left">
             
            <ReactJson 
              src={JSON_object}
              onDelete={handleJSONObjectChange} 
              onEdit={handleJSONObjectChange} 
              onAdd={handleJSONObjectChange} 
              theme="monokai" 
            />
          </Grid>
          <Grid item xs={6} alignContent="left">
          <ReactJson 
              src={Params}
              onDelete={handleParamChange} 
              onEdit={handleParamChange} 
              onAdd={handleParamChange} 
              theme="monokai" 
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={validate} >Check</Button>
          </Grid> 
          <Grid item xs={12}>
          <ReactJson 
              src={result} 
              theme="monokai" 
            />
          </Grid> 
        </Grid>
      </Paper>
    </div>
  );
}
