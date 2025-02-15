
'use client'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { apiSlice } from '../_redux/apiSlice';
import { AppDispatch, endPointsMethods } from '../_types/types';

function ComponentWrapper({
    children , 
    serverSideData , 
    endPointKey
} : {
    children : React.ReactNode ,
    serverSideData : any ,
    endPointKey: endPointsMethods
}) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(
        apiSlice.util.updateQueryData(endPointKey, undefined, (draft) => {
          return serverSideData;
        })
      );
    }, [dispatch , serverSideData]);
  return (
    <>
      {children}
    </>
  )
}

export default ComponentWrapper
