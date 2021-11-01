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
    const [selected, setSelected] = useState(["XRP","BCH","LTC"]);

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
                <Button onClick={() => updatedSelect('XRP')} sx = {selected.includes("XRP")?{backgroundColor:"blue"}:{backgroundColor:'black'}}>XRP</Button>
                <Button onClick={() => updatedSelect('BCH')} sx = {selected.includes("BCH")?{backgroundColor:"blue"}:{backgroundColor:'black'}}>BCH</Button>
                <Button onClick={() => updatedSelect('LTC')} sx = {selected.includes("LTC")?{backgroundColor:"blue"}:{backgroundColor:'black'}}>LTC</Button>
            </ButtonGroup>
                <hr/>
           
              
    {/* <DataList/> */}
    <StockView data={ data.filter(item => selected.includes(item.title)) }  onFavorite = {onFavorite}/>
    </Box>
    </Container>
        </Fragment>
    )
};
export default Layout;