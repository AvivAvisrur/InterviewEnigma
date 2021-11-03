import { createSlice } from "@reduxjs/toolkit";


const dataSlice = createSlice(
    {
        name:"dummyData",
        initialState:{
            data:[]
        },
        reducers:{
            addData(state,action){
                state.data =action.payload
            },
            updateData(state,action){
                const mainIndex = state.data.findIndex(d => d.title === action.payload.coin);
                if(mainIndex >= 0) {
                const index = state.data[mainIndex].data.findIndex(item => item.priceTitle === action.payload.rowItem.priceTitle);
                 if (index >=0 ) {
                    state.data[mainIndex].data[index].isFavorite = !action.payload.rowItem.isFavorite;
                     }
                }
            }

        }
    }
);

export const dataActions = dataSlice.actions; 
export default dataSlice;