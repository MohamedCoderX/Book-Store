import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartitems:[],
    message:""
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
addToCart:(state,action)=>{
    const exisitingItem = state.cartitems.find(item=>item._id === action.payload._id);
    if (!exisitingItem) {
        state.cartitems.push({ ...action.payload, quantity: 1 }); // initialize quantity
        state.message = "Item added to cart";
      } else {
        exisitingItem.quantity += 1; // increase quantity if already in cart
        state.message = "Item quantity increased"; // optional message
      }
},
clearMessage:(state)=>{
    state.message="";
    },
    increaseQuantity:(state,action)=>{
        const item = state.cartitems.find(item=>item._id === action.payload._id);
        if(item){
            item.quantity++;
        }
    },
    decreaseQuantity:(state,action)=>{
        const item = state.cartitems.find(item=>item._id === action.payload._id);
        if(item && item.quantity > 1){
            item.quantity -=1;
        }
    },
    removeItem:(state,action)=>{
        const items = state.cartitems.filter(item => item._id !== action.payload._id);
        state.cartitems = items;
    },
    clearCart:(state,action)=>{
        state.cartitems = [];
    }
    }
})

export const {addToCart,clearMessage,increaseQuantity,decreaseQuantity,removeItem,clearCart} = cartSlice.actions
export default cartSlice.reducer;