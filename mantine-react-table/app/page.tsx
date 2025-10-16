"use client";
import Link from "next/link";
import '../css/home.css'

export default function Home() {

  return (
    <div className="main">
    <h1>My Work from 15th October 2025</h1>
    <div className="work">
      <h3>Here are the things i have Implemented till now</h3>
        <p>Mantine React Tables are here: <Link href={"/tables"}>Link</Link> 
 </p>

 <p>Hooks: <Link href={"/hooks"}>Link</Link> 
 </p>
  <p>Axios: <Link href={"/axios"}>Link</Link> </p>
    </div>
   </div>
  );
}
