"use client";
import Link from "next/link";
import '../css/home.css'

export default function Home() {

  return (
    <div className="main">
    <h1>My Work</h1>
    <div className="work">
        <p>Tables are here: <Link href={"/tables"}>Link</Link></p>
    </div>
   </div>
  );
}
