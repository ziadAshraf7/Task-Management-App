'use client'

import { useRegisterMutation } from '@/app/_redux/apiSlice'
import { eventHandler } from '@/app/_types/types'
import { Button, Input } from '@heroui/react'
import {  message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function SignUpPage() {
  const router = useRouter()
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [rePassword , setRePassword] = useState('')
  const [image , setImage] = useState<File | null>()
  const [register , {isLoading}] = useRegisterMutation()
 
  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(password !== rePassword) message.error("passwords are not matched")
     
      const response : any = await register({
          name:name,
          email:email,
          password:password,
          image : "image"
    })

    if(response.error){
      message.error(response.error?.data?.message)
    }else{
      message.success("created successfully")
      router.replace("/auth/login")
    }

  }

  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-50">
    <form
      className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6"
      onSubmit={handleRegister}
    >
      {/* SignUp Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
        <p className="text-sm text-gray-500 mt-2">Join us to start managing your tasks</p>
      </div>
  
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          type="text"
          size='sm'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
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
        />
      </div>
  
      {/* Re-enter Password Input */}
      <div>
        <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">
          Re-enter Password
        </label>
        <Input
          id="rePassword"
          type="password"
          size='sm'

          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Re-enter your password"
          required
        />
      </div>
  
      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          color='primary'
          className='w-full'
          disabled={isLoading}
          isLoading = {isLoading}
        >
          Register
        </Button>
      </div>
  
      {/* Login Suggestion */}
      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
          Login
        </Link>
      </div>
    </form>
  </section>
  )
}

export default SignUpPage
