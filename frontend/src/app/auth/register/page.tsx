'use client'

import { useRegisterMutation } from '@/app/_redux/apiSlice'
import { eventHandler } from '@/app/_types/types'
import { Button, Input } from '@heroui/react'
import {  message } from 'antd'
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
    <section className='h-screen w-screen flex justify-center items-center'>
      <form className='p-5 border border-neutral-500 rounded-xl ' onSubmit={handleRegister}>
        <span className=' text-xl text-neutral-800 font-semibold'>SignUp</span>
      <Input
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={(e : eventHandler) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        required

        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        required

        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="password"
        placeholder="Re-enter Password"
        required

        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <Input
        type="file"
        required
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null )}
        className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}
      <Button
         isLoading = {isLoading}
        type='submit'
      >
        Submit
      </Button>
      </form>
    </section>
  )
}

export default SignUpPage
