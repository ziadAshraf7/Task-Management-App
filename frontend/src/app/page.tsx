'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { extractUserData } from "./_utills/utills";
import { Button } from "@heroui/react";
import { useSelector } from "react-redux";
import { userCookieData } from "./_types/types";

export default function Home() {
  const router = useRouter()
  
  const userData = useSelector((state : {user : {user : userCookieData | null}}) => state.user)
  const isAuthenticated = userData && userData?.user?.accessToken && userData?.user.user.id

  console.log(userData)

  function handleRedirection(){
    if(isAuthenticated){
      console.log("dfdf")
      router.push("/dashboard")
    }else {
      router.push("auth/login")
    }
  }

  return (
    <section id = "home">
      <div className = "flex h-screen  justify-center items-center w-full h-window">
        <Button onPress = {handleRedirection} color="danger">Get Started</Button>
      </div>
      </section>
  );
}
