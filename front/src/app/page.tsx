import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Last nine months
        </h1>
        <h2 className="text-2xl text-center sm:text-left">
          Who are you?
        </h2>
        <ul className="flex flex-col gap-4 items-center sm:items-start">
          <li><Link href='/sender'>I'm a family member</Link></li>
          <li><Link href='/addressee'>I'm the addressee</Link></li>
        </ul>
        <Separator className='my-4'/>
        <h2 className="text-2xl text-center sm:text-left">
          FAQ
        </h2>
        <ul className="flex flex-col gap-4 items-center sm:items-start">
          <li><Link href='/faq'>How does this work?</Link></li>
          <li>
            <ul className="flex flex-col gap-4 items-center sm:items-start">
              <li>- If you are a family member you can leave a postcard for the isolated person</li>
              <li>- If you were the isolated person you can catch up on all you've missed</li>
            </ul>
          </li>
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>
          <a href="https://github.com/avangie/BHL2024">Project Repo</a>
        </p>
      </footer>
    </div>
  );
}
