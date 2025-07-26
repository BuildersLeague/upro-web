import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TrustedByExpertsSection() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Expert Coaching at Home Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Expert Coaching at Home
            </h1>
            <p className="text-xl text-gray-300">
              No more hunting for good coaches.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg rounded-full">
              Learn More
              <span className="sr-only">about at Home Coaching</span>

            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden">
              <Image
                src="/TrustedByExpertsPhotos/coach-Coaching.jpeg"
                alt="Coach supervises two siblings with agility drills."
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Schedule Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden">
              <Image
                src="/TrustedByExpertsPhotos/child-practicing.jpeg"
                alt="A focused child maneuvers their ball around a pylon."
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
              Flexible Schedule
            </h2>
            <p className="text-xl text-gray-300">Train when you want.</p>
            <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg rounded-full">
              Explore Options
              <span className="sr-only">for flexible scheduling</span>

            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
