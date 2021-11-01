import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';



const StockView = function StockView(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="spanning table">
        {props.data.map((coin) => (
            <>
                <TableHead  key = {coin.id}>
                    <TableRow  >
                        <TableCell sx={{fontSize: 'inherit',  color: 'white', backgroundColor: 'black'}} align="left" colSpan={5}>
                            <img style = {{backgroundColor:"white",marginRight:"5px"}} src={coin.img} alt="img"/>{coin.title}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody >
                    {coin.data.map((row) => (
                        <TableRow sx={{fontSize: '0.7em', backgroundColor: `${row.isFavorite ? '#1b1203' : 'black'}`}} key = {row.title}>
                            <TableCell sx={{fontSize: 'inherit', color: 'gray', paddingTop: '1px', paddingBottom: '1px', border: 'none'}} align="left">{row.title}</TableCell>
                            <TableCell sx={{fontSize: 'inherit',  paddingTop: '1px', paddingBottom: '1px',  paddingRight: '50px', color: 'white', border: 'none' }} align="right">{row.currency}</TableCell>
                            <TableCell sx={{fontSize: 'inherit',  color: `${row.precentage > 0 ? 'green' : 'red'}`,  paddingTop: '1px', paddingBottom: '1px', border: 'none'}} align="left">
                                {row.precentage > 0 ? `+${row.precentage}%` : `${row.precentage}%`}
                            </TableCell>
                            <TableCell sx={{fontSize: 'inherit',  color: 'white', paddingTop: '1px', paddingBottom: '1px', border: 'none'}} align="right">{row.markUps}</TableCell>
                            <TableCell onClick={() => props.onFavorite(coin.title, row)} sx={{fontSize: '0.4em', cursor: 'pointer',  color: `${row.isFavorite ? '#e3991e' : 'gray'}`, paddingTop: '1px', paddingBottom: '1px', border: 'none'}} align="center"><StarIcon /></TableCell>
                        </TableRow>))}
                </TableBody>
            </>
        ))}
      </Table>
    </TableContainer>
  );
}

export default StockView;



