// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from "js-cookie";
import { extractUserData } from '../_utills/utills';
import { userCookieData } from '../_types/types';
import { endpoint } from '../api/api';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ 
  baseUrl: endpoint ,  
   prepareHeaders: (headers) => {

    headers.set("Content-Type", "application/json");

    const userData : userCookieData | null = extractUserData()

    if(userData && userData.accessToken) {
      headers.set("Authorization", `Bearer ${userData.accessToken}`);
    }
    
    return headers;
}
}),

  tagTypes: ['Tasks'], // Add a tag for caching
  endpoints: (builder) => ({
   
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['Tasks'], // This query will be invalidated when the 'Data' tag is invalidated
    }),
   
    addTask: builder.mutation({
      query: (newData) => ({
        url: '/task-management',
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['Tasks'], // Invalidate the 'Data' tag to refetch the data
    }),

    login : builder.mutation({
        query : (loginData) => ({
            url : "auth/login" ,
            method : 'POST' , 
            body : loginData
        }),
        transformResponse: (response : any) => {
            const  {accessToken , user}  = response;
    
            Cookies.set("user", JSON.stringify(response));
        
            return { accessToken , user };
          },
    })
    
  }),
});

export const { useLoginMutation , useGetTasksQuery, useAddTaskMutation } = apiSlice;