import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../utils/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl:`${getBaseUrl()}/api/books`,
    credentials:'include',
    prepareHeaders:(Headers)=>{
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization',`Bearer ${token}`);
        }
        return Headers;
    }

});

const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes:['Books'],
    endpoints:(builder)=>({
        fetchAllBooks:builder.query({
            query:()=>'/',
            providedTags:['Books'],
        }),
        fetchBookById:builder.query({
            query:(id)=>`/${id}`,
            providesTags:(result,error,id)=>[{type:'Books',id}],
        }),
        addBook:builder.mutation({
            query:(newbookdata)=>({
                url:'/addbook',
                method:'POST',
                body:newbookdata,
            }),
            invalidatesTags:['Books'],
        }),
        updateBook:builder.mutation({
            query:({id,formData})=>({
                url:`/updatebook/${id}`,
                method:'POST',
                body:formData,
                
            }),
            invalidatesTags:(result,error,{id})=>[{type:'Books',id}],
        }),
        deleteBook:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Books'],
        }),
    })

})
export const { useFetchAllBooksQuery , useFetchBookByIdQuery, useAddBookMutation,useDeleteBookMutation,useUpdateBookMutation } = bookApi;
export default bookApi;