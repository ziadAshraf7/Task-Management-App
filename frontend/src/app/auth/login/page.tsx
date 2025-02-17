'use client'

import { useLoginMutation } from '@/app/_redux/apiSlice'
import { updateUserInfo } from '@/app/_redux/userSlice'
import { userCookieData } from '@/app/_types/types'
import { Button, Input } from '@heroui/react'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function LoginPage() {
  let [email , setEmail] = useState<string>('')
  let [password , setPassword] = useState<string>('')
  const router = useRouter()
  const dispatch = useDispatch()
  const userState = useSelector((state : {user : {user : userCookieData | null}}) => state.user)
  const [login , {isLoading}] = useLoginMutation()
  console.log(userState , "userState")

  async function handleLogin (e : any){
    e.preventDefault()
  
   const response : any = await login({
    email ,
    password
   })
   console.log(response)
    if(response?.error) {
      message.error(response.error.data.message , 5)
    }else{
      message.success("success login - you will be redirected to dashboard")
      dispatch(updateUserInfo(response.data))
      router.push("/dashboard")
    }
   
  }

  useEffect(() => {
    if(userState?.user?.accessToken && userState?.user?.user) router.push("/")
  },[userState])

  if(!userState?.user?.accessToken && !userState?.user?.user)
  return (
<section className='w-screen h-screen flex justify-center items-center'>
    <form className='flex border border-slate-400 rounded-xl p-5 flex-col gap-3' onSubmit={handleLogin}>
      <span className='text-neutral-800 text-xl font-semibold'>Login</span>
      
      <Input 
        onChange={(e) => {
          setEmail(e.target.value)
          }} value={email}  
          type='email' 
          placeholder='Enter your email' 
          required
        />
      
      <Input 
        onChange={(e) => setPassword(e.target.value)} value={password} 
        type='password' 
        placeholder='Enter your password' 
        required
      />
      
      <Button isLoading = {isLoading} type='submit'>submit</Button>
    </form>
  </section>

  )
}

export default LoginPage
