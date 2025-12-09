import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from '../../utils/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl:`${getBaseUrl()}/api/order`,
    credentials:'include',
    prepareHeaders:(Headers)=>{
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization',`Bearer ${token}`);
        }
        return Headers;
    }
})

const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery,
    tagTypes:['Orders'],
    endpoints:(builder)=>({
        fetchAllOrders:builder.query({
            query:()=>"/",
            providedTags:['Orders'],
        }),
        fetchOrderById:builder.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:'Orders',id}],
        }),
        addOrder:builder.mutation({
            query:(neworderdata)=>({
                url:'/',
                method:'POST',
                body:neworderdata,
            }),
            invalidatesTags:['Orders'],
        }),
        updateOrder:builder.mutation({
            query:({id,status})=>({
                url:`/${id}`,
                method:'PUT',
                body:{status},
                headers:{
                    'Content-Type':'application/json',
                },
            }),
            invalidatesTags:(result,error,{id})=>[{type:'Orders',id}],
        }),
        deleteOrder:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Orders'],
        }),
        getOrderByEmail:builder.query({
            query:(email)=>`/email/${email}`,
            providesTags:(result,error,email)=>[{type:'Orders',email}],
        })
    })
})

export const { useFetchAllOrdersQuery , useFetchOrderByIdQuery, useAddOrderMutation,useUpdateOrderMutation,useDeleteOrderMutation ,useGetOrderByEmailQuery } = orderApi;
export default orderApi;