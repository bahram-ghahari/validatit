

export const pageClasses = (theme)=>{
    return {
    root: {
      flexGrow: 1,
    }, 
    groupTitle: { 
      color:"#252525",
      paddingLeft:theme.spacing(1),
      paddingTop:theme.spacing(10),
      fontSize:"2rem"
    }, 
    paragraph: { 
      color:"#252525",
      paddingLeft:theme.spacing(2),
      paddingTop:theme.spacing(2),
      fontSize:".85rem"
    }
    , 
    code: { 
      color:"#374184",
      background:'#fff', 
      fontSize:"1rem",
      fontWeight:"bold"
    }
  };

}