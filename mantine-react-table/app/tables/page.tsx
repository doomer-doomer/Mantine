'use client'
import Link from "next/link";
import '../../css/home.css'

export default function Tables(){
    return(
        <div className="main">
            <h1>Tables Implemented</h1>
            <div className="work">
                <Link href={"/tables/basic"}>Basic Table</Link>
                <Link href={"/tables/minimal"}>Minimal Table</Link>
                <Link href={"/tables/advance"}>Advance Table</Link>
            </div>
        </div>
    )
}