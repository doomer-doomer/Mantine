'use client'
import Link from 'next/link'
import '../../css/home.css'

export default function Hooks(){
    return (
        <div className="main">
            <h1>Custom Hooks</h1>
            <div className="work">
                <Link href={"/hooks/use-form"}>use-form</Link>
            </div>
        </div>
    )
}