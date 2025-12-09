import {configureStore} from '@reduxjs/toolkit';
import cartSlice from "./slice/cartslice";
import bookApi from './features/book';
import orderApi from './features/order';
import orderslice from './slice/orderslice';

export const store = configureStore({   
    reducer: {
          cart: cartSlice,
          [bookApi.reducerPath]: bookApi.reducer,
          [orderApi.reducerPath]: orderApi.reducer,
          order:orderslice,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware, orderApi.middleware),
});