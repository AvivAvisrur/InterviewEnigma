import { Fragment, useState } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import StockView from "./StockView/StockView";
import { dataActions } from "../store/data-slice";
import store from "../store/store";
import { useSelector } from "react-redux";

const Layout = ()=>{
    const data = useSelector(state=>state.data.data)
    const [selected, setSelected] = useState(["BTC", "ETH", "SOL"]);

    const onFavorite = (coin, rowItem) => {
        store.dispatch(dataActions.updateData({
            coin:coin,
            rowItem:rowItem
        }));
    }

    const updatedSelect = (coin) => {
        if(selected.includes(coin)){
            setSelected(selected.filter(s => s !== coin))
        } else {
            setSelected([...selected, coin])
        }
    }
    return (
        <Fragment>
        <Container maxWidth="sm">

        <Box sx={{ 
           backgroundColor:"black",
           display:"flex",
           paddingTop: '5px',
           paddingBottom: '50px',
           flexDirection:"column"}}>
       
           <ButtonGroup sx= {{backgroundColor: 'black'}} variant="contained" aria-label=" button group" >
                <Button onClick={() => updatedSelect('BTC')} sx = {selected.includes("BTC")?{backgroundColor:"blue"}:{backgroundColor:'black'}}>BTC</Button>
                <Button onClick={() => updatedSelect('ETH')} sx = {selected.includes("ETH")?{backgroundColor:"blue"}:{backgroundColor:'black'}}>ETH</Button>
                <Button onClick={() => updatedSelect('SOL')} sx = {selected.includes("SOL")?{backgroundColor:"blue"}:{backgroundColor:'black'}}>SOL</Button>
            </ButtonGroup>
              
    {/* <DataList/> */}
    <StockView data={ data.filter(item => selected.includes(item.title)) }  onFavorite = {onFavorite}/>
    </Box>
    </Container>
        </Fragment>
    )
};
export default Layout;