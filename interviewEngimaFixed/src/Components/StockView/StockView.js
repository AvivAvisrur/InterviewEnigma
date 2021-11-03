import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios"
import { useEffect } from 'react';
import sol from "../../icons/sol.png"
import BitcoinIcon from "../../icons/BitcoinIcon.png"
import BCicon from "../../icons/BCicon.png"
import store from '../../store/store';
import { useSelector } from 'react-redux';
import { dataActions } from '../../store/data-slice';
import { useState } from 'react';
import "./StockView.css"
import Spinner from '../Spinner';


const coins = ["BTC", "ETH", "SOL"];
const imges = [BCicon,BitcoinIcon,sol];
const currencies = ["AUD", "BTC", "CAD", "ETH", "EUR", "GBP", "JPY", "USD", "USDT"];

const getCoinData = (data, coins, currencies,imges) => {
  //data is data.display
  let CoinDataObject = [];

  for (let i = 0; i < coins.length; i++) {

    CoinDataObject.push({id:i,title:coins[i],img:imges[i],data:[]});
    
    for (let j = 0; j < currencies.length; j++) {
      
      CoinDataObject[i].data.push({
          priceTitle:coins[i]+currencies[j],
          price: data[coins[i]][currencies[j]].PRICE,
          changePerHour: data[coins[i]][currencies[j]].CHANGEPCTHOUR,
          changePerDay: data[coins[i]][currencies[j]].CHANGEPCT24HOUR,
          isFavorite:false
      }) 
      }
    }
    // const {PRICE,CHANGEPCT24HOUR} = data[coins[0]][currencies[0]];
    // console.log(PRICE, CHANGEPCT24HOUR);
  return CoinDataObject;
}



const StockView = function StockView(props) {

  const key = "364199281f6d0fe2721dde1faf9eefc50bf4cf43e8a282989c3c0624268d233d";

  const [isLoading,setIsLoading] = useState(true);
 
    useEffect(() => {
      const fun = async () => {
        const response = await axios.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,SOL&tsyms=AUD,BTC,CAD,ETH,EUR,GBP,JPY,USD,USDT", { headers: { "authorization": `Apikey ${key}` } });
        //  console.log(response.data.DISPLAY["XRP"]);
        ;
         
         store.dispatch(dataActions.addData(getCoinData(response.data.DISPLAY, coins, currencies,imges)));
        //  console.log(getCoinData(response.data.DISPLAY, coins, currencies));
       
       
      }
     const id =  setInterval(()=>{
        fun();
         setIsLoading(false)
      },3000)
      return ()=>{
        clearInterval(id);
      }
    
    },[])
   
    return (
      <>
      {isLoading?<Spinner/>:<TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="spanning table">
          {props.data.map((coin) => (
            <>
              <TableHead key={coin.id}>
                <TableRow  >
                  <TableCell sx={{ fontSize: 'inherit', color: 'white', backgroundColor: 'black' }} align="left" colSpan={5}>
                    <img style={{ backgroundColor: "white", marginRight: "5px" }} src={coin.img} alt="img" />{coin.title}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody >
                {coin.data.map((row) => (
                  <TableRow sx={{ fontSize: '0.7em', backgroundColor: `${row.isFavorite ? '#1b1203' : 'black'}` }} key={row.priceTitle}>
                    <TableCell sx={{ fontSize: 'inherit', color: 'gray', paddingTop: '1px', paddingBottom: '1px', border: 'none' }} align="left">{row.priceTitle}</TableCell>
                    <TableCell sx={{ fontSize: 'inherit', paddingTop: '1px', paddingBottom: '1px', paddingRight: '50px', color: 'white', border: 'none' }} align="right">{row.price}</TableCell>
                    <TableCell sx={{ fontSize: 'inherit', color: `${row.changePerHour > 0 ? 'green' : 'red'}`, paddingTop: '1px', paddingBottom: '1px', border: 'none' }} align="left">
                      {row.changePerHour > 0 ? `+${row.changePerHour}%` : `${row.changePerHour}%`}
                    </TableCell>
                    <TableCell sx={{ fontSize: 'inherit', paddingTop: '1px' ,color: `${row.changePerDay > 0 ? 'green' : 'red'}`, paddingBottom: '1px', border: 'none' }} align="right">{row.changePerDay}%</TableCell>
                    <TableCell onClick={() => props.onFavorite(coin.title, row)} sx={{ fontSize: '0.4em', cursor: 'pointer', color: `${row.isFavorite ? '#e3991e' : 'gray'}`, paddingTop: '1px', paddingBottom: '1px', border: 'none' }} align="center"><StarIcon /></TableCell>
                  </TableRow>))}
              </TableBody>
            </>
          ))}
        </Table>
      </TableContainer>}
      </>
    );
  }

  export default StockView;



