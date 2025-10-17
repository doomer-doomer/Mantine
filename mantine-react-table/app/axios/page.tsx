'use client';
import Link from "next/link";
import '../../css/home.css'

export default function AxiosPage(){
  return (
    <div className="main">
      <h1>Axios Examples</h1>
      <div className="work">
        <Link href={"/axios/memes"}>Memes Gallery</Link>
        <Link href={"/axios/wikipedia"}>Wikipedia</Link>
      </div>
    </div>
  )
}