'use client'

import { useLoginMutation } from '@/app/_redux/apiSlice'
import { updateUserInfo } from '@/app/_redux/userSlice'
import { userCookieData } from '@/app/_types/types'
import { Button, Input } from '@heroui/react'
import { message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function LoginPage() {
  let [email , setEmail] = useState<string>('')
  let [password , setPassword] = useState<string>('')
  const router = useRouter()
  const dispatch = useDispatch()
  const userState = useSelector((state : {user : {user : userCookieData | null}}) => state.user)
  const [login , {isLoading}] = useLoginMutation()


  async function handleLogin (e : FormEvent<HTMLFormElement>){
    e.preventDefault()
    const response : any = await login({
      email,
      password
    });
    
    if(response?.error) {
      message.error(response?.error?.data?.message , 5)
    }else{
      message.success("success login - you will be redirected to dashboard")
      dispatch(updateUserInfo(response?.data))
      router.push("/dashboard")
    }
   
  }

  useEffect(() => {
    if(userState?.user?.accessToken && userState?.user?.user) router.push("/dashboard")
  },[userState])

  if(!userState?.user?.accessToken && !userState?.user?.user)
  return (
<section className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-50">
  <form
    className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6"
    onSubmit={handleLogin}
  >
    {/* Login Heading */}
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
      <p className="text-sm text-gray-500 mt-2">Sign in to manage your tasks</p>
    </div>

    {/* Email Input */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <Input
        id="email"
        type="email"
        value={email}
        size='sm'
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    {/* Password Input */}
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <Input
        id="password"
        type="password"
        size='sm'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    {/* Submit Button */}
    <div>
      <Button
        type="submit"
        color='primary'
        isLoading = {isLoading}
        disabled={isLoading}
        className="w-full  text-white "
      >
        Login
      </Button>
    </div>


    {/* Sign Up Suggestion */}
    <div className="text-center text-sm text-gray-500">
      Don't have an account?{" "}
      <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
        Sign up
      </Link>
    </div>
  </form>
</section>

  )
}

export default LoginPage
