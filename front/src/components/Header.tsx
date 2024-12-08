import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 z-50 p-4">
            <Link href="/" className="text-4xl font-bold text-primary hover:text-primary/80 transition-colors">
                Nine months
            </Link>
        </header>
    );
}

