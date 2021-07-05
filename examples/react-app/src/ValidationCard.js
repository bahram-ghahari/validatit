import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'; 
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import {validatit} from 'validatit'
// import the react-json-view component
import ReactJson from 'react-json-view'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2), 
    color: theme.palette.text.secondary,
    background:"#000000d9",
    margin: theme.spacing(10)
  }, 
  groupTitle: {
    background:"#416141",
    color:"#fff",
    paddingLeft:theme.spacing(1),
    fontSize:"12px"
  },
  title: { 
    color:"#fff",
    paddingLeft:theme.spacing(1),
    fontSize:".85rem",
    fontWeight:"bold",
    fontStyle:"italic"
  }
}));

export default function ValidationCard(props) {
  const classes = useStyles();  
  const handleJSONObjectChange = (obj) => { 
    props.cb({json_object: obj.updated_src  , params:props.data.params});
  };

 
  const handleParamChange = (obj) => {
    props.cb({json_object: props.data.json_object  , params:obj.updated_src});

  }; 

  const [result, setResult] = React.useState({});

 



  const validate = (event) => {  
    try{
      const _result = validatit(props.data.json_object,props.data.params);  
      setResult(_result);
    }catch{
      setResult({
        success:false
      });
    }
  };
  return (

      <Paper className={classes.paper}>
        <Grid container  spacing={3}>
          <Grid item xs={12} alignContent="left">
            <Typography className={classes.title}>{props.title}</Typography>
          </Grid>
          <Grid item  xs={12} sm={6} alignContent="left">
            <Typography  className={classes.groupTitle}>
              json object
            </Typography>
            <ReactJson 
              src={props.data.json_object}
              onDelete={handleJSONObjectChange} 
              onEdit={handleJSONObjectChange} 
              onAdd={handleJSONObjectChange} 
              theme="monokai" 
            />
          </Grid>
          <Grid item xs={12} sm={6} alignContent="left">
            <Typography  className={classes.groupTitle}>
              params
            </Typography>
            <ReactJson 
                src={props.data.params}
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
              theme="flat"
            />
          </Grid> 
        </Grid>
      </Paper>

  );
}
