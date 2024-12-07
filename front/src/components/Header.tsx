// components/Header.tsx
import Link from "next/link";

export default function Header() {
    return (
        <div className="max-w-5xl w-full items-center justify-between flex">
            <Link href="/" className="text-4xl font-bold text-muted-foreground mb-10">
                Last nine months
            </Link>
        </div>
    );
}
