'use client'
import { Button } from "@/components/ui/button";

export default function HeroSectionImageWithReviews() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="py-12 lg:py-24">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
            <div className="bg-black/40 backdrop-blur-xl p-8 rounded-lg border border-white/10">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                Nine months
              </h1>
              <p className="mt-3 text-xl text-muted-foreground">
                Time capsule for people who are isolated from society
              </p>
              <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                <Button
                  size={"lg"}
                  className="hover:bg-white/20 backdrop-blur-sm"
                  onClick={() => { window.location.href = "/recipient" }}
                >
                  I am the recipient
                </Button>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="border-white/20 hover:bg-white/10"
                  onClick={() => { window.location.href = "/sender" }}
                >
                  I am family
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

