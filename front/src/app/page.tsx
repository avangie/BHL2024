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
              CloudMaster: Elevate Your Projects
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Simplify team collaboration with CloudMaster, the ultimate tool
              for efficient project management.
            </p>
            {/* Buttons */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Button size={"lg"}>Watch the

              </Button>
              <Button variant={"outline"} size={"lg"}>
                I'm 
              </Button>
            </div>
            {/* End Buttons */}
            <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
              {/* Review */}
              <div className="py-5">
                button 1
              </div>
              {/* End Review */}
              {/* Review */}
              <div className="py-5">
                button 2
              </div>
              {/* End Review */}
            </div>
          </div>
          {/* Col */}
          <div className="relative ms-4">
            <img
              className="w-full rounded-md"
              src="https://placehold.co/800x700"
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

