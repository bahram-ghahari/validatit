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
    marginTop: theme.spacing(10)
  },
  title: {
    background:"#000000d9"
  },
  groupTitle: {
    background:"#416141",
    color:"#fff",
    paddingLeft:theme.spacing(1),
    fontSize:"12px"
  }
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
    try{
      const _result = validatit(JSON_object,Params);  
      setResult(_result);
    }catch{
      setResult({
        success:false
      });
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.title}>
        <Toolbar>

          <Typography variant="h4">
            [valdatit]
          </Typography>

        </Toolbar>
      </AppBar>

      <Paper className={classes.paper}>
        <Grid container  spacing={3}>
         
          <Grid item xs={6} alignContent="left">
            <Typography  className={classes.groupTitle}>
              json object
            </Typography>
            <ReactJson 
              src={JSON_object}
              onDelete={handleJSONObjectChange} 
              onEdit={handleJSONObjectChange} 
              onAdd={handleJSONObjectChange} 
              theme="monokai" 
            />
          </Grid>
          <Grid item xs={6} alignContent="left">
            <Typography  className={classes.groupTitle}>
              params
            </Typography>
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
              theme="flat"
            />
          </Grid> 
        </Grid>
      </Paper>
    </div>
  );
}
