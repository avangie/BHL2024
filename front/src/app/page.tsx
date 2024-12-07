import { Button } from "@/components/ui/button";

export default function HeroSectionImageWithReviews() {
  return (
    <>
      {/* Hero */}
      <div className="p-24 lg:py-32">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Last nine months
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Time capsule for people who are isolated from society
            </p>
            {/* Buttons */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Button size={"lg"} onClick={()=>{window.location.href = "/timeline"}}>
                I am the recepient
              </Button>
              <Button variant={"outline"} size={"lg"} onClick={()=>{window.location.href = "/sender"}}>
                I am family
              </Button>
            </div>
          </div>
          {/* Col */}
          <div className="relative ms-4">
            <img
              className="w-full rounded-md"
              src="hero.webp"
              alt="Image Description"
            />
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}
    </>
  );
}

