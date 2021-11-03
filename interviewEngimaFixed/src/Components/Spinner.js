import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = ()=>{
  return (
    <Box sx={{ 
        display: 'flex'
        ,backgroundColor:"black"
        ,color:"white" ,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"}}>
    <p>Loading data...</p>
      <CircularProgress color="warning" />
    </Box>
  );
}
export default Spinner;