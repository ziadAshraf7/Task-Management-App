'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <section id = "home">
      <div className = "flex justify-center items-center bg-red-200 w-full h-window">
        <Link href = "auth/login" >Get Started</Link>
      </div>
      </section>
  );
}
