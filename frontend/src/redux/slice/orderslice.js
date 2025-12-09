import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders:[],
    

}

const order = createSlice({
    name:"order",
    initialState,
    reducers:{
        setOrders:(state,action)=>{
            state.orders.push({...action.payload});
           
        }

    }
})

export const {setOrders} = order.actions
export default order.reducer;