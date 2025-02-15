'use client'

import { useLoginMutation } from '@/app/_redux/apiSlice'
import React, { useState } from 'react'

function LoginPage() {

  let [email , setEmail] = useState<string>('')
  let [password , setPassword] = useState<string>('')


  const [login] = useLoginMutation()

  async function handleLogin (e : any){
    e.preventDefault()
   const accessToken = await login({
    email ,
    password
   })
    

    console.log(accessToken)
  }


  return (
    <form onSubmit={handleLogin}>
      <input onChange={(e) => {
        setEmail(e.target.value)
        console.log(typeof e.target.value)
        }} value={email}  type='email' placeholder='enter ur email' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='enter ur password' />
      <button type='submit'>submit</button>
    </form>
  )
}

export default LoginPage
