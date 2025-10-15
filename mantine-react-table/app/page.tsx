"use client";
import Link from "next/link";
import '../css/home.css'

export default function Home() {

  function render(some:String): number{
    console.log(some);
    let numbers: number[] = [1,2,34,5]
    return 0;
  }
  return (
    <div className="main">
    <h1>My Work</h1>
    <div className="work">
        <p>Tables are here: <Link href={"/tables"}>Link</Link></p>
    </div>
   </div>
  );
}
