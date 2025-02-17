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

  tagTypes: ['CreatedTasks' , "SharedTasks" , "AssignedTasks"], 
  endpoints: (builder) => ({
   
   
    getSharedTasks: builder.query({
      query: (query) => ({
        url :'/shared-tasks',
        params : query
      }),
      providesTags: ['SharedTasks'], 
    }),

    getAssignedTasks: builder.query({
      query: (query : any) => ({url :'/shared-tasks/assigned' , params : query}),
      providesTags: ['AssignedTasks'], 
    }),

    getCreatedTasks: builder.query({
      query: (searchParams : {category : string , title : string} | undefined) => ({
        url: '/tasks',
        params: searchParams, 
      }),
      providesTags: ['CreatedTasks'],
    }),

    searchUser : builder.query({
      query: (searchTerm) => `/users/search?userName=${searchTerm}`,
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: '/task-management',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CreatedTasks'], 
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: '/task-management/' + taskId,
        method: 'DELETE',
      }),
      invalidatesTags: ['CreatedTasks' , 'AssignedTasks'], 
    }),

    addTask: builder.mutation({
      query: (newData) => ({
        url: '/task-management',
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['CreatedTasks'], 
    }),

    assignTask: builder.mutation({
      query: (newData) => ({
        url: '/task-management/assign',
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['AssignedTasks'], 
    }),

    unAssignTask: builder.mutation({
      query: (newData) => ({
        url: '/task-management/unAssign',
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: ['AssignedTasks'], 
    }),

    register: builder.mutation({
      query: (newData) => ({
        url: '/users',
        method: 'POST',
        body: newData,
      }),
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

export const {
  useGetSharedTasksQuery ,  
  useLoginMutation , 
  useGetCreatedTasksQuery, 
  useAddTaskMutation ,
  useGetAssignedTasksQuery ,
  useSearchUserQuery ,
  useAssignTaskMutation ,
  useRegisterMutation ,
  useUpdateTaskMutation ,
  useDeleteTaskMutation ,
  useUnAssignTaskMutation
} = apiSlice;