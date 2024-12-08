import FlippablePostcard from '../../components/FlippablePostcard'
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PostcardData {
    frontImage: string
    author: string
    date: string
    text: string
}

export default async function Home() {
    const res = await fetch('http://127.0.0.1:8000/data')
    const data = await res.json()

    const postcards: PostcardData[] = data.map((item: any) => ({
        frontImage: item.file ? `http://127.0.0.1:8000/${item.file}` : '/placeholder.svg',
        author: item.author,
        date: item.time,
        text: item.message,
    }))

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 ">
            <div className="relative z-10 bg-black/40 backdrop-blur-xl p-8 rounded-lg border border-white/10 px-16">
                <FlippablePostcard postcards={postcards} />
            </div>
            <Button asChild className="relative z-10">
                <Link href="/date-range">World's history</Link>
            </Button>
        </div>
    )
}

