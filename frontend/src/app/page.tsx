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
<section id="home" className="bg-gradient-to-r  from-neutral-950 to-neutral-800">
  <div className="flex flex-1 flex-col h-screen justify-center items-center text-center text-white px-4">
    {/* Main Heading */}
    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
      Organize Your Tasks, Simplify Your Life
    </h1>

    {/* Subheading */}
    <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in-up">
      Stay on top of your tasks and boost your productivity with our intuitive task management app. Plan, track, and achieve your goals effortlessly.
    </p>

    {/* Get Started Button */}
    <Button
      onPress={handleRedirection}
      color="danger"
      className="px-8 py-3 text-lg font-semibold animate-bounce"
    >
      Get Started
    </Button>

    {/* Additional Features Section */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
      <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-2">📅 Easy Scheduling</h3>
        <p className="text-sm">Plan your tasks with due dates and reminders to never miss a deadline.</p>
      </div>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-2">📝 Simple Tracking</h3>
        <p className="text-sm">Track your progress and stay organized with categorized tasks.</p>
      </div>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-2">🚀 Boost Productivity</h3>
        <p className="text-sm">Focus on what matters and achieve your goals faster.</p>
      </div>
    </div>

    <div className="mt-12 animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
</section>
  );
}
